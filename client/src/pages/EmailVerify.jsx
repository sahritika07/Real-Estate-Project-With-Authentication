import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'
import {Navigate, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

const EmailVerify = () => {
  
  axios.defaults.withCredentials = true;
  const {backendUrl,isLoggedin,userData,getUserData} = useContext(AppContext)

  const navigate = useNavigate()
  const inputRefs = React.useRef([])

  const handleInput = (e, index)=> {
     if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index+1].focus()
     }
  }
  const handleKeyDown = (e, index) =>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index-1].focus()
    }
  }


  const handlePaste = (e) => {
    e.preventDefault(); // prevent default paste behavior
    const paste = e.clipboardData.getData('text').trim().slice(0, 6); // handle extra chars
    paste.split('').forEach((char, index) => {
      const input = inputRefs.current[index];
      if (input) {
        input.value = char;
      }
    });
  
    // Focus next empty input (optional but improves UX)
    // const firstEmptyIndex = paste.length < 6 ? paste.length : 5;
    // if (inputRefs.current[firstEmptyIndex]) {
    //   inputRefs.current[firstEmptyIndex].focus();
    // }
  };

  const onSubmitHandler = async(e) =>{
    try {
      e.preventDefault()
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp})
      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(()=>{
      isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin,userData])


  return (
    <div className='flex items-center min-h-screen justify-center  bg-gradient-to-br from-blue-200 to-blue-400'>
       {/* <img onClick={() => navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/> */}
       <div  className="font-['Times_New_Roman',serif] absolute left-5 sm:left-20 top-5 w-28 sm:w-32 font-extrabold text-2xl text-purple-700 cursor-pointer" onClick={() => navigate('/')}>
        <img src={assets.logo_dark} alt="" />
      </div>
       <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-blue-500'>Enter the 6 digit code sent to your email id</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_,index)=>(
                <input
                className="w-12 h-12 bg-[#333A5C] text-center text-white text-xl rounded-md"
                ref={(el) => inputRefs.current[index] = el}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                type="text"
                maxLength={1} // Corrected attribute name (was 'max-Length')
                key={index}
                required
              />
              
            ))}
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full'>Verify Email</button>
       </form>

         
    </div>
  )
}

export default EmailVerify
