import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { storeUser } from "./useUser";

export const useSignup = () => {

    //setting usestate for loading and error
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const URL = process.env.EXPO_PUBLIC_API_URL

    //destructure dispatch from authcontext
    const {setUser} = useAuthContext()

    //signup user
    const signup = async (name, email, password, navigation) =>{
        setIsLoading(true)
        setError(null)
        
        //making the http request that return a response from server
        const response = await fetch(`${URL}auth/signup`, {
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({name, email, password})
        })
        
        //convert the responst into js object
        const jsonRes = await response.json()
        
        //checking if response got any error
        if(!response.ok){
            setIsLoading(false)
            setError(jsonRes.error)
        }

        if(response.ok){
            //save the token to local storage
            await storeUser(JSON.stringify(jsonRes))
            setIsLoading(false)
            setError(null)

            //update the authContext
            setUser(jsonRes)
            navigation.navigate('Promotion')
        }
    }


    return{signup, isLoading, error}
}