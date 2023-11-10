import { createReducer } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, clearCart, fetchProducts } from "../actions/products.action";

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

            const index = newState.cart.findIndex(item => action.payload.product === item.product)

            if (index !== -1) {
                newState.cart[index] = {
                    product: action.payload.product,
                    quantity: action.payload.quantity + newState.cart[index].quantity
                }
                // const producto = state.cart.find(item => action.payload.product === item.product)
                // producto.quantity += action.payload.quantity

            } else {
                newState.cart = [...state.cart, action.payload]
                // state.cart.push(action.payload)
            }
            // console.log(newState);
            return newState

        })
});

export default productsReducer;
