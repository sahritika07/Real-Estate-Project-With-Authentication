import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'



const Home = () => {
  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center overflow-hidden'>
  

      {/* Content */}
      <Navbar />
      <Header />
    </div>
  )
}

export default Home
