import { useState } from "react";
import {useAuthContext} from '../context/AuthContext'




export const useGetInfo = () =>{

    const [isLoading, setIsLoading] = useState('');
    const [error, setError] = useState('');

    const URL = process.env.EXPO_PUBLIC_API_URL


    const {user} = useAuthContext()

    const getInfo = async () =>{

        setIsLoading(true);
        setError(null);

        const response = await fetch(`${URL}auth/dashboard`,{
            headers:{
                'authorization': `Bearer ${user.token}`
            }
            })



            //convert the response into js object
        const jsonRes = await response.json()

        //checking if response got any error
        if(!response.ok){
            setIsLoading(false)
            setError(jsonRes.error)
        }

        if(response.ok){
            //save the token to local storage
            const {email, name, avatar} = jsonRes
            setIsLoading(false);
            setError(null);
            return {email, name, avatar}
       
        }
    }

    return {isLoading, error, getInfo}
}