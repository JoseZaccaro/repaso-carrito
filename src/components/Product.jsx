import React from 'react'

const Product = ({ product, add }) => {

    const [quantity, setQuantity] = React.useState(1)

    return (
        <div className='flex flex-col w-[16.5%] min-h-[40vh] border-2 border-black rounded-lg p-4'>
            <div className="w-full flex justify-between pb-2">
                <img className='w-6 h-6' src="https://img.icons8.com/ios-filled/50/1A1A1A/long-arrow-left.png" alt="icon left" />
                <img className='w-6 h-6' src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/1A1A1A/external-bookmark-social-media-ui-tanah-basah-basic-outline-tanah-basah.png" alt="icon right" />
            </div>

            <div className='w-full flex items-center justify-center h-[15vh] '>
                <img className='h-full object-contain drop-shadow-2xl' src={product.image} alt="" />
            </div>

            <div className='flex flex-col w-full gap-2 flex-1 text-center'>
                <h2 className='text-lg font-bold'>
                    {product.name}
                </h2>
                <p className='text-md '>
                    {product.description}
                </p>
            </div>
            <div className='w-full flex flex-col items-center'>
                <p className='text-lg font-semibold'>
                    {product.price}€ {product.brand === 'Sony' ? <span className='line-through decoration-2 text-gray-400'>{parseFloat(product.price + (product.price * 0.1)).toFixed(2)}€</span> : ''}
                </p>

                <div className='w-full flex justify-evenly items-center'>
                    <div className="bg-white p-4 rounded-lg max-w-[350px]">
                        <div className="relative mt-2 max-w-xs text-gray-500">
                            <input type="number" value={quantity} min={1} max={product.stock} onChange={(e) => setQuantity(Number(e.target.value))} className="w-20 pl-[2rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                        </div>
                    </div>
                    <button onClick={() => add(product, quantity)} className="text-white bg-[#2973E2] px-8 py-1 mt-2 text-center flex justify-center items-center border-2 border-white outline-none rounded-lg">Add <img width={35} className='filter invert' src="https://img.icons8.com/carbon-copy/100/000000/shopping-basket-2.png" alt="shopping-basket-2" /></button>
                </div>

            </div>

        </div>

    )
}

export default Product