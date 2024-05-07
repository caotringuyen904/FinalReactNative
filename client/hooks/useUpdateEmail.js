import { useState } from "react";
import {useAuthContext} from '../context/AuthContext'
import { useLogout } from "./useLogout";



export const useUpdateEmail= ({navigation}) =>{

        const [emailPending, setEmailPending] = useState(false)
        const [emailError, setEmailError] = useState('')  

        const {user, setUser} = useAuthContext()
        const logout = useLogout()

        const URL = process.env.EXPO_PUBLIC_API_URL
    
        const updateEmail = async (email) =>{
            if(!user){
                return
            }
            setEmailError('')
            setEmailPending(true)

            
            const response = await fetch(`${URL}auth/dashboard/updateuser/changeemail`, {
                method:'PUT',
                headers:{
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body:JSON.stringify({email})
                })
    
            const jsonRes = await response.json()
            if(!response.ok){
                setEmailPending(false)
                setEmailError(jsonRes.error)
                
            }
            if(response.ok){
                setEmailPending(false)
                setEmailError(jsonRes.message)
                logout({navigation})
            }
        }

        return {updateEmail, emailPending, emailError}
}