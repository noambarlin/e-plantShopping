import { createSlice } from '@reduxjs/toolkit';
import { plantsArray } from './Catalog';



const initialAddedToCart = plantsArray.reduce((acc, category) => {
    category.plants.forEach(plant => {
      acc[plant.name] = false;
    });
    return acc;
  }, {});
  

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    addedToCart: initialAddedToCart,
  },
  reducers: {
    addItem: (state, action) => {
        const plant = action.payload;
        state.items.push({...plant, quantity: 1});
        state.addedToCart[plant.name] = true;
    },
    removeItem: (state, action) => {
        const plantName = action.payload.name;
        state.items = state.items.filter(item => item.name !== plantName);
        state.addedToCart[plantName] = false;
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity = quantity;
        }
    
    },
    
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
