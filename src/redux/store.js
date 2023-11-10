import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './reducers/products.reducer';

const store = configureStore({
    reducer: {
        productsReducer
    },
})

export default store