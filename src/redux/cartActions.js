export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const updateItem = (product) => ({
    type: UPDATE_ITEM,
    payload: product,
  });

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
