import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: 'idle'
}

// Method using redux toolkit.
// Add items to basket.
export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
  'basket/addBasketItemAsync',
  async ({ productId, quantity = 1 }) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
)

// Remove items from basket.
export const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity?: number }>(
  'basket/removeBasketItemAsync',
  async ({ productId, quantity = 1 }) => {
    try {
      await agent.Basket.removeItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
)

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
  },
  // Use redux toolkit, method above.
  extraReducers: (builder => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = 'pendingAddItem' + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = 'idle';
    });
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = 'idle';
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = 'pendingRemoveItem' + action.meta.arg.productId;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      
      // Get item id.
      const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

      // Make sure basket items are available.
      if (itemIndex === -1 || itemIndex === undefined) return;

      // Remove item.
      state.basket!.items[itemIndex].quantity -= quantity!;

      // Make sure item is not 0 before removing items.
      if (state.basket?.items[itemIndex].quantity === 0) 
        state.basket.items.splice(itemIndex, 1);
      
      // Return state.
      state.status = 'idle';
    });
    builder.addCase(removeBasketItemAsync.rejected, (state) => {
      state.status = 'idle';
    });
  })
})

export const { setBasket } = basketSlice.actions;