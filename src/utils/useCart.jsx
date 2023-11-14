import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/products.action';
import useLocalStorage from './useLocalStorage';
import { add as addFn } from './functions';

const useCart = () => {
    const { cart } = useSelector(store => store.productsReducer)
    const dispatch = useDispatch()
    const [storage, LS] = useLocalStorage()

    useEffect(() => {
        if (LS.get('cart') && cart.length === 0) {
            const productos = LS.get('cart')
            console.log(LS.get('cart'));
            for (const producto of productos) {
                dispatch(addToCart({ product: producto.product, quantity: producto.quantity }))
            }
        }
    }, [])

    // Function to add a product to the cart
    /**
     * @param {object} product - The product to be added to the cart
     * @param {string} product.Id - The ID of the product
     * @param {number} product.quantity - The quantity of the product
     */
    const add = (product) => {
        dispatch(addToCart(product))
        const cartito = LS.get('cart')
        console.log(cartito);
        if (cartito) {
            const newCart = addFn(cartito, product, 'product')
            console.log(newCart);
            LS.set('cart', newCart)
        }else{
            const newCart = addFn([], product, 'product')
            console.log(newCart);
            LS.set('cart', newCart)

        }
    }

    return [cart, {
        add,
    }]
}

export default useCart