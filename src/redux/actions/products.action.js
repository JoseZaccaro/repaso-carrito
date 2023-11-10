import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

// Action to add a product to the cart
export const addToCart = createAction("cart/addToCart", ({ product, quantity }) => {

    return {
        payload: {
            product,
            quantity
        }
    }
});

// Action to remove a product from the cart
export const removeFromCart = createAction("cart/removeFromCart", (productId) => {

});

// Action to clear the cart
export const clearCart = createAction("cart/clearCart");

// Async action to fetch the products from the server
export const fetchProducts = createAsyncThunk("cart/fetchProducts", async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    return data.results;
});
