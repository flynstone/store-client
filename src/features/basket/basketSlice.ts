import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";

interface BasketState {
  basket: Basket | null
}

const initialState: BasketState = {
  basket: null
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload
      
      // Get item id.
      const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

      // Make sure basket items are available.
      if (itemIndex === -1 || itemIndex === undefined) return;

      // Remove item.
      state.basket!.items[itemIndex].quantity -= quantity;

      // Make sure item is not 0 before removing items.
      if (state.basket?.items[itemIndex].quantity === 0) 
        state.basket.items.splice(itemIndex, 1);
    }
  }
})

export const { setBasket, removeItem } = basketSlice.actions;