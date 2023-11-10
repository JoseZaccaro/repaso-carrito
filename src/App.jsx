import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import { Provider } from 'react-redux';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';

import store from './redux/store';
import Layout from './layouts/mainLayout';
import Cart from './pages/Cart';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;