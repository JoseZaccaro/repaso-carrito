import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <header className='flex w-full justify-between p-4 bg-blue-500 items-center rounded-br-lg rounded-bl-lg'>
                <img className='w-16 h-16' src="https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png" alt="logo" />
                <nav>
                    <ul className='flex gap-4'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    );
};

export default Layout;
