import React, {useEffect, useState, lazy, Suspense} from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebase";
import { currentUser } from './functions/auth';
import LoadingBar from 'react-top-loading-bar'


// const Navbar = lazy(() => import('./components/nav/Navbar'));
// const Footer = lazy(() => import('./components/footer/Footer'));
// const Home = lazy(() => import('./pages/Home'));
// const Login = lazy(() => import('./pages/auth/Login'));
// const Register = lazy(() => import('./pages/auth/Register'));
// const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
// const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
// const Wishlist = lazy(() => import('./pages/user/Wishlist'));
// const History = lazy(() => import('./pages/user/History'));
// const Product = lazy(() => import('./pages/Product'));
// const Shop = lazy(() => import('./pages/Shop'));
// const Cart = lazy(() => import('./pages/Cart'));
// const Checkout = lazy(() => import('./pages/Checkout'));
// const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
// const BrandHome = lazy(() => import('./pages/brand/BrandHome'));
// const Account = lazy(() => import('./pages/Account'));

// const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
// const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));
// const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
// const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
// const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
// const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
// const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
// const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
// const CreateCarusel = lazy(() => import('./pages/admin/carusel/CreateCarusel'));
// const CreateBrand = lazy(() => import('./pages/admin/brand/CreateBrand'));
// const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'));

// const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
// const UserRoute = lazy(() => import('./components/routes/UserRoute'));

import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import Wishlist from './pages/user/Wishlist'
import History from './pages/user/History';
import Product from './pages/Product';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CategoryHome from './pages/category/CategoryHome';
import BrandHome from './pages/brand/BrandHome'
import Account from './pages/Account';

import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import AllProducts from './pages/admin/product/AllProducts';
import CreateCarusel from './pages/admin/carusel/CreateCarusel';
import CreateBrand from './pages/admin/brand/CreateBrand';
import CreateCoupon from './pages/admin/coupon/CreateCoupon';

import AdminRoute from './components/routes/AdminRoute';
import UserRoute from './components/routes/UserRoute';

const App = () => {

  const [progress, setProgress] = useState(0)

  const dispatch = useDispatch();

  useEffect (() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch(err => console.log(err))
      }
    });

    return () => unsubscribe();

  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className='flex flex-row justify-center items-center p-5'>
        <p className='text-blue-600 font-bold text-xl'>Loading ...</p>
      </div>
    } >
        <LoadingBar
          color='#f11946'
          progress={progress}
          waitingTime={400}

          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <ToastContainer />
        <Routes>
          {/* General Routes */}
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/Register/Complete' element={<RegisterComplete />} />
          <Route exact path='/forgot/password' element={<ForgotPassword />} />

          {/* User Routes */}
          <Route exact path='/user/wishlist' element={<UserRoute><Wishlist /></UserRoute>} />
          <Route exact path='/user/history' element={<UserRoute><History /></UserRoute>} />
          <Route exact path='/checkout' element={<UserRoute><Checkout /></UserRoute>} />
          <Route exact path='/account' element={<UserRoute><Account /></UserRoute>} />

          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path='/admin/category' element={<AdminRoute><CategoryCreate /></AdminRoute>} />
          <Route path='/admin/category/:slug' element={<AdminRoute><CategoryUpdate /></AdminRoute>} />
          <Route path='/admin/sub' element={<AdminRoute><SubCreate /></AdminRoute>} />
          <Route path='/admin/sub/:slug' element={<AdminRoute><SubUpdate /></AdminRoute>} />
          <Route path='/admin/product' element={<AdminRoute><ProductCreate /></AdminRoute>} />
          <Route path='/admin/products' element={<AdminRoute><AllProducts /></AdminRoute>} />
          <Route path='/admin/product/:slug' element={<AdminRoute><ProductUpdate /></AdminRoute>} />
          <Route path='/admin/brand' element={<AdminRoute><CreateBrand /></AdminRoute>} />
          <Route path='/admin/carousel' element={<AdminRoute><CreateCarusel /></AdminRoute>} />
          <Route path='/admin/coupon' element={<AdminRoute><CreateCoupon /></AdminRoute>} />

          {/* new */}
          <Route exact path='/product/:slug' element={<Product />} />
          <Route exact path='/category/:_id' element={<CategoryHome />} />
          <Route exact path='/brand/:_id' element={<BrandHome />} />
          <Route exact path='/shop' element={<Shop />} />
          <Route exact path='/cart' element={<Cart />} />


        </Routes>
        <Footer />
    </Suspense>
  )
}

export default App