import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_ITEM } from './cartActions';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            case ADD_TO_CART:
            const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
            
            if (existingItemIndex >= 0) {
                // Item exists, update the quantity
                const updatedItems = state.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + action.payload.quantity } // Update quantity
                        : item
                );
                localStorage.setItem('cart', JSON.stringify(updatedItems));
                return updatedItems;
            } else {
                // Item doesn't exist, add new item
                const updatedCart = [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return updatedCart;
            }
        case REMOVE_FROM_CART:
            const filteredCart = state.filter((item) => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            return filteredCart;
        case CLEAR_CART:
            localStorage.removeItem('cart');
            return [];
        case UPDATE_ITEM:
            const updatedItems = state.map((item) =>
                item.id === action.payload.id 
                    ? { ...item, ...action.payload } // Merge existing item with the new payload
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
        default:
            return state;
    }
};

export default cartReducer;
