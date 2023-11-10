import { useSelector } from "react-redux";
import Product from "../components/Product";

const Cart = () => {
    const cartItems = useSelector((state) => state.productsReducer.cart);

    // Resto del código del componente Cart
    const handleDecreaseQuantity = (productId) => {

    }
    const handleIncreaseQuantity = (productId) => {

    }
    const handleRemove = (productId) => {

    }


    return (
        <div className="w-full p-4 flex justify-center flex-col items-center">
            <h1 className="w-full text-center  font-bold text-5xl py-4">Cart</h1>

            {/* Renderizar los items del carrito */}
            {cartItems.map((product) => (
                <div className="w-9/12 flex border-2 border-gray-200" key={product._id}>
                    <div className='w-fit flex items-center justify-center h-[15vh] '>
                        <img className='h-full object-contain drop-shadow-2xl' src={product.image} alt="" />
                    </div>

                    <div className="flex justify-between w-full px-4 items-center">
                        <div className="w-full flex py-10 flex-col gap-2">
                            <h2 className='text-lg font-bold'>{product.name}</h2>
                            <p className='text-md '>
                                {product.description}
                            </p>
                        </div>



                        <div className="flex items-center">
                            <p className='text-lg font-semibold'>
                                {product.price}€ {product.brand === 'Sony' ? <span className='line-through decoration-2 text-gray-400'>{parseFloat(product.price + (product.price * 0.1)).toFixed(2)}€</span> : ''}
                            </p>
                            <button onClick={() => handleDecreaseQuantity(product._id)} className="text-white bg-[#2973E2] px-2 py-1 mt-2 text-center flex justify-center items-center border-2 border-white outline-none rounded-lg">-</button>
                            <span className="px-2">{product.quantity}</span>
                            <button onClick={() => handleIncreaseQuantity(product._id)} className="text-white bg-[#2973E2] px-2 py-1 mt-2 text-center flex justify-center items-center border-2 border-white outline-none rounded-lg">+</button>
                            <button onClick={() => handleRemove(product._id)} className="text-white bg-[#F87171] px-2 py-1 mt-2 text-center flex justify-center items-center border-2 border-white outline-none rounded-lg">Delete</button>
                        </div>
                    </div>


                </div>
            ))}
        </div>
    );
};

export default Cart;
