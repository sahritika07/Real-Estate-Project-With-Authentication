import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'

const App = () => {
  const location = useLocation();

  // Define routes where you DO NOT want the extra sections
  const hiddenRoutes = ['/login', '/signup', '/email-verify', '/reset-password'];

  const shouldHideExtras = hiddenRoutes.includes(location.pathname);

  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>

      {!shouldHideExtras && (
        <>
          <About />
          <Projects />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};


export default App
