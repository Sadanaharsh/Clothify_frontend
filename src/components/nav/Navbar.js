import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import { Badge } from 'antd';

// Icons
import {BsHandbag, BsCartCheckFill} from "react-icons/bs";
import {MdOutlineAccountCircle, MdOutlineLogin} from "react-icons/md";
import {FiHeart} from "react-icons/fi";
import {GiHamburgerMenu} from "react-icons/gi";
import {GoSearch} from "react-icons/go"
import {BiArrowBack} from "react-icons/bi";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {RiAccountCircleFill, RiShutDownLine} from "react-icons/ri";
import {MdDashboardCustomize} from "react-icons/md";

import Search from "../forms/Search";

const logo = require('../../images/logo-no-background.png');

const Navbar = () => {

  const [isClickedOnSearch, setIsClickedOnSearch] = useState(false);
  const [isClickedOnHamberger, setIsClickedOnHamberger] = useState(false);
  const [isMouseOverOnAccount, setIsMouseOverOnAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, cart} = useSelector((state) => ({...state}));

  useEffect (() => {
    if (user && user.token) {
      // console.log(user.email);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const logout = () => {
    firebase.auth().signOut();
    dispatch ({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/Login')
  }

  const handleClickOnSearch = () => {
    setIsClickedOnSearch(true);
  }

  const handleClickOnBack = () => {
    setIsClickedOnSearch(false);
  }

  const handleClickOnHamberger = () => {
    setIsClickedOnHamberger(!isClickedOnHamberger);
  }

  const handleMouseOver = () => {
    setIsMouseOverOnAccount(true);
  }

  const handleMouseOut = () => {
    setIsMouseOverOnAccount(false)
  }

  return (
    <>
    <div className={`flex flex-col fixed -left-72 top-0 h-full w-72 overflow-y-scroll scrollbar-hide bg-blue-50 z-50 transform transition-transform ${isClickedOnHamberger ? 'translate-x-full' : 'translate-x-0'}`}>
      <div className="bg-blue-100 h-20 w-full">
        <div onClick={handleClickOnHamberger} className="hamburger h-9 w-9 m-5 cursor-pointer md:hidden  text-blue-900 hover:text-blue-600"><AiOutlineCloseCircle size={35} /></div>
        <div className="">

        </div>
      </div>
      <div className="flex flex-col m-5 mt-3">
        <div className="account-section text-base font-medium flex flex-col my-3">
          <Link to={"/account"} className="my-3 text-xl font-normal text-[#010C80] hover:text-blue-800"><div>My Account</div> </Link>
          {user && user.role === 'admin' && <Link to={"/admin/dashboard"} className="my-3 text-xl font-normal text-[#010C80] hover:text-blue-800"><div>My Dashboard</div> </Link>}
          <Link to={"/user/history"} className="my-3 text-xl font-normal text-[#010C80] hover:text-blue-800"><div>My Orders</div> </Link>
          <Link to={"/Cart"} className="my-3 text-xl font-normal text-[#010C80] hover:text-blue-800"><div>My Cart</div> </Link>
          <Link to={"/Wishlist"} className="my-3 text-xl font-normal text-[#010C80] hover:text-blue-800"><div>My Wishlist</div> </Link>
          {/* <Link to={"/Coupons"} className="my-3 text-xl font-normal text-blue-700 hover:text-blue-800"><div> My Coupons</div></Link> */}
          {/* <Link to={""} className="my-3 text-xl font-normal text-blue-700 hover:text-blue-800"><div>My Notification</div> </Link> */}
        </div>
        {/* <hr className="bg-black" />
        <div className="policy-section flex flex-col my-2">
          <Link to={"/helpCenter"} className="my-2  hover:text-blue-800 text-blue-700">Help Center</Link>
          <Link to={"/privacyPolicy"} className="my-2  hover:text-blue-800 text-blue-700">Privacy policy</Link>
          <Link to={"/legal"} className="my-2  hover:text-blue-800 text-blue-700">Legal</Link>
        </div> */}
      </div>
      
      
    </div>
    <div className={`${isClickedOnSearch ? 'flex' : 'hidden'} items-center shadow-md sticky top-0 bg-white z-40 py-2`}>
      <div onClick={handleClickOnBack} className="arrow mx-4 cursor-pointer text-blue-900 hover:text-blue-600"><BiArrowBack size={30} /></div>
      <div className="flex justify-center items-center w-8/12">
        {/* <input type="search" className="w-full h-8 outline-none text-xl" />  */}
        <Search className="w-full" />
      </div>
      {/* <div className="search mx-4 cursor-pointer absolute right-0 text-blue-900 hover:text-blue-600"><GoSearch size={30} /></div> */}
    </div>
    <div className={`${isClickedOnSearch ? 'hidden' : 'flex'} items-center shadow-md sticky top-0 bg-white z-40 md:py-2 md:justify-around`}>
      <div onClick={handleClickOnHamberger} className="hamburger mx-5 cursor-pointer md:hidden  text-blue-900 hover:text-blue-600"><GiHamburgerMenu size={30} /></div>
      <div className="logo mx-2 my-4 md:my-2 md:mx-3" onClick={() => navigate('/')} >
          <img src={logo} alt="logo" className="w-32 md:w-40" />
      </div>
      {/* <div className="nav mx-3">
        <ul className="hidden md:flex md:items-center md:space-x-6 md:font-bold md:text-md mb-0">
            <Link to={"/men"} className='text-blue-900 hover:text-blue-600 font-medium text-lg'><li>Men</li></Link>
            <Link to={"/women"} className='text-blue-900 hover:text-blue-600 font-medium text-lg'><li>Women</li></Link>
            <Link to={"/kids"} className='text-blue-900 hover:text-blue-600 font-medium text-lg'><li>Kids</li></Link>
            <Link to={"/shoes"} className='text-blue-900 hover:text-blue-600 font-medium text-lg'><li>Shoes</li></Link>
        </ul>
      </div> */}
      <div className="hidden search-bar md:flex md:items-center md:mx-3 ">
        <div className="xl:w-96">
            <Search />
        </div>
      </div>
      <div className="flex justify-center cursor-pointer items-center mx-5 absolute right-0 md:relative">
        <div onClick={handleClickOnSearch} className="flex md:hidden flex-col justify-center items-center mx-2 text-xs font-semibold">
          <GoSearch size={25} className=" text-blue-900 hover:text-blue-600" />
        </div>
        <div onClick={() => setIsMouseOverOnAccount(!isMouseOverOnAccount)} onMouseLeave={handleMouseOut} className={`${isLoggedIn ? 'hidden' : 'flex'} md:flex flex-col justify-center items-center mx-2 text-xs font-semibold`}>
          {/* <Link to={isLoggedIn ? "" : '/Login'}> {isLoggedIn ? <MdOutlineAccountCircle size={25} className="text-blue-900 hover:text-blue-700" /> : <MdOutlineLogin size={25} className="text-blue-900 hover:text-blue-700" />}</Link>
          <Link to={isLoggedIn ? "" : '/Login'}> {isLoggedIn ? <MdOutlineAccountCircle size={25} className="text-blue-900 hover:text-blue-700" /> : <MdOutlineLogin size={25} className="text-blue-900 hover:text-blue-700" />}</Link> */}
          {
            isLoggedIn ? <MdOutlineAccountCircle size={25} className="text-blue-900 hover:text-blue-700" />
            :
            <Link to={'/Login'}> <MdOutlineLogin size={25} className="text-blue-900 hover:text-blue-700" /> </Link>
          }
          <div className="hidden md:flex text-blue-900 hover:text-blue-700"> {isLoggedIn ? 'Account' : 'Login'} </div>
        </div>
        <div className={`${isLoggedIn ? 'flex' : 'hidden'} flex-col justify-center items-center mx-2 text-xs font-semibold`}>
          <Link to="/user/wishlist"> <FiHeart size={25} className="text-blue-900 hover:text-blue-700" /> </Link>
          <div className="hidden text-blue-900 hover:text-blue-700 md:flex"> Wishlist </div>
        </div>
        <div className="flex flex-col justify-center items-center mx-2 text-xs font-semibold">
          <Link to={"/cart"}><Badge count={cart.length} offset={[9, 0]} ><BsHandbag size={25} className="text-blue-900 hover:text-blue-700" /></Badge></Link>
          <div className="hidden text-blue-900 hover:text-blue-700 md:flex">Bag</div>
        </div>
      </div>
    </div>

      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={`${isMouseOverOnAccount && isLoggedIn ? 'flex' : 'hidden'} flex-col overflow-y-scroll scrollbar-hide rounded-lg p-4 fixed right-10  w-56 text-blue-900 hover:text-blue-700 bg-gray-50 shadow-lg top-[3.5rem] z-50`}>
        <div className="flex cursor-pointer hover:bg-gray-200 rounded">
          <div className="m-2"><RiAccountCircleFill  size={25} className='text-blue-900 hover:text-blue-700' /></div>
          <Link to={'/account'} className="m-2 text-blue-900 hover:text-blue-700">My Profile</Link>
          <hr className="m-2" />
        </div>
        {user && user.role === 'admin' && <div className="flex cursor-pointer hover:bg-gray-200 rounded">
          <div className="m-2"><MdDashboardCustomize  size={25} className='text-blue-900 hover:text-blue-700' /></div>
          <Link to={'/admin/dashboard'} className="m-2 text-blue-900 hover:text-blue-700">Dashboard</Link>
          <hr className="m-2" />
        </div>}
        <div className="flex cursor-pointer hover:bg-gray-200 rounded">
          <div className="m-2"><BsCartCheckFill  size={25} className='text-blue-900 hover:text-blue-700' /></div>
          <Link to={'/user/history'} className="m-2 text-blue-900 hover:text-blue-700">Orders</Link>
          <hr className="m-2" />
        </div>
        {/* <div className="flex cursor-pointer hover:bg-gray-200 rounded">
          <div className="m-2"><RiCoupon2Fill  size={25} className='text-blue-900 hover:text-blue-700' /></div>
          <Link to={''} className="m-2 text-blue-900 hover:text-blue-700">Coupons</Link>
          <hr className="m-2" />
        </div> */}
        
        {/* <div className="flex cursor-pointer hover:bg-gray-200 rounded">
          <div className="m-2"><IoIosNotifications  size={25} className='text-blue-900 hover:text-blue-700' /></div>
          <Link to={''} className="m-2 text-blue-900 hover:text-blue-700">Notifications</Link>
          <hr className="m-2" />
        </div> */}
        <div onClick={logout} className="flex cursor-pointer hover:bg-gray-200 rounded">
          <div className="m-2"><RiShutDownLine  size={25} className='text-blue-900 hover:text-blue-700' /></div>
          <div className="m-2 text-blue-900 hover:text-blue-700">Log Out</div>
          <hr className="m-2" />
        </div>
      </div>

    </>
  );
};

export default Navbar;
