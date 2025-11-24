  import { configureStore } from '@reduxjs/toolkit';
  import studentReducer from './StudentSlice';

  export const store = configureStore({
    reducer: {
      student: studentReducer,
    },
  });