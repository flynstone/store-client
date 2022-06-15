import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: 'another redux counter with redux toolkit'
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: any, action: any) => {
      state.data += action.payload
    },
    decrement: (state: any, action: any) => {
      state.data -= action.payload
    }
  }
})

export const { increment, decrement } = counterSlice.actions;