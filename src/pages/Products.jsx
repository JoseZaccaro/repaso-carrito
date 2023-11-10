import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { addToCart, fetchProducts } from '../redux/actions/products.action';

function ProductList() {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch()
  const products = useSelector(state => state.productsReducer.products)
  
  useEffect(() => {

    dispatch(fetchProducts())

  }, []);

  function add(product, quantity) {
    dispatch(addToCart({product:product._id, quantity}))
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
