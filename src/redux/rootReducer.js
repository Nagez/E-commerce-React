import { combineReducers } from 'redux';
import productsReducer from './productsSlice';
import authReducer from './authSlice'
import cartReducer from './cartReducer';

// Combine all the reducers into one root reducer
const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer,
});

export default rootReducer;
