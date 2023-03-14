import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductsPage from './Pages/ProductsPage';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import SearchedProducts from './components/SearchedProducts';
import Success from './Pages/Success';



function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={user ? <HomePage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path='/products/:category' element={<ProductsPage />} />
          <Route exact path='/product/:id' element={<Product />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/search/:name' element={<SearchedProducts />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
