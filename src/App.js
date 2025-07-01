import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import {Header,Footer} from "./components/index"
import {Home, Contact, Login, Register, Reset, Admin} from "./pages/index"
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import AdminLogin from "./pages/auth/AdminLogin";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails"
import ReviewProducts from "./components/reviewProducts/ReviewProducts.js"
import NotFound from "./pages/notFound/NotFound.js"
function App() {
  return (
    <>
    
    <BrowserRouter>
        <Header/>
        
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/reset' element={<Reset/>}></Route>
          
          
          <Route path='/admin/*' element={<AdminOnlyRoute> <Admin/> </AdminOnlyRoute>}></Route>
          <Route path='/product-details/:id'element={<ProductDetails />}></Route>
          <Route path='/cart'element={<Cart />}></Route>
          <Route path='/checkout-details'element={<CheckoutDetails />}></Route>
          <Route path='/checkout'element={<Checkout />}></Route>
          <Route path='/checkout-success'element={<CheckoutSuccess />}></Route>
          <Route path='/order-history'element={<OrderHistory />}></Route>
          <Route path='/order-details/:id'element={<OrderDetails />}></Route>
          <Route path='/review-product/:id'element={<ReviewProducts />}></Route>
          <Route path='*'element={<NotFound/>}></Route>


        </Routes>
        <Footer/>
    </BrowserRouter>

    </>
  );
}

export default App;
