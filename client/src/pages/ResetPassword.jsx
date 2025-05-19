import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const ResetPassword = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
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
    //   const firstEmptyIndex = paste.length < 6 ? paste.length : 5;
    //   if (inputRefs.current[firstEmptyIndex]) {
    //     inputRefs.current[firstEmptyIndex].focus();
    //   }
    };

    const onSubmitEmail = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
        data.success ? toast.success(data.message) :
          toast.error(data.message)
        data.success && setIsEmailSent(true)

      } catch (error) {
        toast.error(error.message)
      }
    }

    const onSubmitOTP = async(e)=>{
       e.preventDefault();
       const otpArray = inputRefs.current.map(e => e.value)
       setOtp(otpArray.join(''))
       setIsOtpSubmitted(true)
    }

    const onSubmitNewPassword = async(e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword})
        data.success ? toast.success(data.message): toast.error(data.message)
        data.success && navigate('/login')
      } catch (error) {
        toast.error(error.message)
      }
    }

    return (
      <div className='flex items-center min-h-screen justify-center  bg-gradient-to-br from-blue-200 to-blue-400'>
        {/* <img onClick={() => navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' /> */}
        <div  className="font-['Times_New_Roman',serif] absolute left-5 sm:left-20 top-5 w-28 sm:w-32 font-extrabold text-2xl text-purple-700 cursor-pointer" onClick={() => navigate('/')}>
        <img src={assets.logo_dark} alt="" />
      </div>

        {/* enter-email-id */}
        {!isEmailSent &&
          <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
            <p className='text-center mb-6 text-blue-400'>Enter your registered email address</p>
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.mail_icon} className='w-3 h-3' alt="" />
              <input type="email" className='bg-transparent outline-none text-white' placeholder='Email id' value={email} onChange={(e) => setEmail(e.target.value)} required />

            </div>
            <button className='w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-full mt-3'>Submit</button>
          </form>
        }

        {/* Enter otp input form */}
        {!isOtpSubmitted && isEmailSent &&
          <form onSubmit={onSubmitOTP} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
            <p className='text-center mb-6 text-blue-400'>Enter the 6 digit code sent to your email id</p>
            <div className='flex justify-between mb-8' onPaste={handlePaste}>
              {Array(6).fill(0).map((_, index) => (
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
            <button className='w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full'>Verify Email</button>
          </form>
        }

        {/* new password */}
        {isOtpSubmitted && isEmailSent &&
          <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
            <p className='text-center mb-6 text-blue-500'>Enter your new password below</p>
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.lock_icon} className='w-3 h-3' alt="" />
              <input type="password" className='bg-transparent outline-none text-white' placeholder='Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

            </div>
            <button className='w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-full mt-3'>Submit</button>
          </form>
        }

      </div>
    )
  }


  export default ResetPassword
