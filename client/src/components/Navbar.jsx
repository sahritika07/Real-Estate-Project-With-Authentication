import React, { useContext } from 'react';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import home from '../../src/pages/Home.jsx'

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

  const sentVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-50'>
      {/* Logo or Title */}
      <div className="font-['Times_New_Roman',serif] font-light text-2xl text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
         <img src={assets.logo} alt="" />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-white font-semibold text-base sm:text-base mt-2">
        <ul className='hidden md:flex gap-7 text-white' >
            <a href="#Header" className="cursor-pointer text-lg hover:text-gray-400">Home</a>
            <a href="#About" className="cursor-pointer text-lg hover:text-gray-400">About</a>
            <a href="#Projects" className="cursor-pointer text-lg hover:text-gray-400">Projects</a>
            <a href="#Testimonials" className="cursor-pointer text-lg hover:text-gray-400">Testimonials</a>           
        </ul>
      </div>


      {/* Right Side - Login or Profile */}
      {userData ? (
        <div className='w-8 h-8 flex justify-center items-center rounded-full relative text-white bg-black group cursor-pointer'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && (
                <li onClick={sentVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>
              )}
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-blue-600 rounded-full px-6 py-2 text-white transition-all bg-blue-600 hover:bg-blue-700'
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
