import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import { motion } from "framer-motion";

const Header = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/header_img.png';
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  return (
    <div 
      className={`min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{backgroundImage: isImageLoaded ? "url('/header_img.png')" : 'none'}}
      id='Header'
    >
      <Navbar/>
      {isImageLoaded && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 1.5 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white'
        >
          <h2 className='text-5xl sm:text-6xl md:text-[72px] inline-block max-w-3xl font-semibold pt-20'>
            Explore homes that fit your dreams
          </h2>
          <div className='space-x-6 mt-16'>
            <a href="#Projects" className='border border-white px-8 py-3 rounded'>Projects</a>
            <a href="#Contact" className='bg-blue-600 px-8 py-3 rounded'>Contact Us</a>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Header;
