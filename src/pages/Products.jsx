import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { addToCart, fetchProducts } from '../redux/actions/products.action';
import useLocalStorage from '../utils/useLocalStorage';
import useCart from '../utils/useCart';

function ProductList() {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.productsReducer)
  const [storage, LS] = useLocalStorage()
  const [cart, cartFn] = useCart()
  useEffect(() => {

    dispatch(fetchProducts())

  }, []);

  async function add(product, quantity) {
    try {
      cartFn.add({ product: product._id, quantity })
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div>
      <h1 className="w-full text-center font-bold text-5xl py-4">Product List</h1>
      <div className='flex flex-wrap gap-4 w-[80vw] mx-auto justify-center py-16'>
        {products.map(product => (
          <Product product={product} key={product._id} add={add} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
