import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    loadProducts(state, action) {
      state.products = action.payload; // Immer takes care of immutability
    },
    addProduct(state, newId, action) {
      state.products.push({ id: newId, ...action.payload });
    },
    deleteProduct(state, action) {
      const index = state.products.findIndex(product => product.id === action.payload);
      if (index !== -1) {
        if (state.products[index].status === 'UNCHANGED') {
          state.products[index].status = 'DELETED';
        } else {
          state.products.splice(index, 1);
        }
      }
    },
  },
});

export const { loadProducts, addProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
