import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { setUsera } from '../redux/authSlice'; // import the actions
import { addDocument, getDocByParam } from './firestoreUtils';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Initialize the dispatch function for Redux

  useEffect(() => {
    dispatch(setUsera(user));

  }, [user])

  /* //signup with email and password
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        ...additionalData,
      });
    } catch (err) {
      setError(err.message);
    }
  };
*/
  const signup = async (formData) => {
    try {
      const existingUser = await getDocByParam('users', 'username', formData.username);

      if (existingUser) {
        throw new Error('Username already exists. Please choose a different one.');
      }
      // Save the user data in Firestore
      const { id } = await addDocument({...formData,joinedAt: getFormatedDate()}, 'users');

      // Optionally store the user ID in local storage
      localStorage.setItem('userId', id);

      // Update state with the new user
      setUser({
        id,
        ...formData
      });
      return id;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const login = async (username, password) => {
    try {
      // Retrieve user data from Firestore by username
      const userDoc = await getDocByParam('users', 'username', username);

      if (userDoc) {
        if (userDoc.password != password) throw new Error('Wrong Password');
        setUser(userDoc); // Set the user data in the state
        localStorage.setItem('userId', userDoc.id); // Save the user's ID in localStorage
        console.log('Login success');
        return userDoc; // Return the user document
      } else {
        console.log('No user found with the provided username.');
        return false; // Return false if no user found
      }
    } catch (err) {
      setError(err.message); // Handle errors and set error message in state
      return false; // Return false if there's an error
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("connected user: ", user)

      // Retrieve or store additional user data in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUser({ uid: user.uid, ...userDoc.data() });
      } else {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName,
          id: userDoc.id,
          joinedAt: getFormatedDate(),
        });
        setUser(user);
        localStorage.setItem('userId', userDoc.id);
        return userDoc;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('userId');
    } catch (err) {
      setError(err.message);
    }
  };

  const getFormatedDate = ()=>{
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    return date
  }

  return {
    user,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
  };
};

export default useAuth;
