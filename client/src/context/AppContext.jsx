import { createContext, useState , useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    axios.defaults.withCredentials = true; // if we refresh the page , the browser will store the cookies which will display the user name only instead of default values
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://real-estate-project-backend-xz9f.onrender.com"
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)
    const getAuthState = async() =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success) {
                setIsLoggedin(true)
                getUserData()
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    // const getUserData = async()=>{
    //     try {
    //         const {data} = await axios.get(backendUrl + '/api/user/data')
    //         data.success ? setUserData(data.userData): toast.error(data.message)
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    const getUserData = async () => {
    try {
        const token = Cookies.get('token'); // Replace 'token' with your actual cookie name

        const { data } = await axios.get(backendUrl + '/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
        toast.error(error.message);
    }
};

    useEffect(() => {
      getAuthState();
    }, [])
    

    const value = {
      backendUrl,
      isLoggedin,setIsLoggedin,
      userData,setUserData,
      getUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}