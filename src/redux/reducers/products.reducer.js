import { createReducer } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, clearCart, fetchProducts } from "../actions/products.action";
import { add } from "../../utils/functions";

const initialState = {
    products: [],
    cart: [],
};

const productsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
            return {
                ...state,
                products: action.payload
            }
        })
        .addCase(addToCart, (state, action) => {
            const newState = {
                ...state,
                cart: [...state.cart]
            }

            const newCart = add(newState.cart, action.payload, 'product')

            newState.cart = newCart

            return newState

        })
});

export default productsReducer;
