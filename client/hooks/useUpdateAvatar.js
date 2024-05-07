import { useState } from "react";
import {useAuthContext} from '../context/AuthContext'
import * as FileSystem from 'expo-file-system';


export const useUpdateAvatar= () =>{

        const [avatarPending, setAvatarPending] = useState(false)
        const [avatarError, setAvatarError] = useState('')
    
        const {user} = useAuthContext()

        const URL = process.env.EXPO_PUBLIC_API_URL
    

        const updateAvatar = async (data) =>{
            if(!user){
                return
            }
            
            setAvatarError('')
            setAvatarPending(true)
            
            const {uri, type} = data

            const avatar = new FormData()
            avatar.append('profileImg',{
                name: user.id + type.split('/')[1],
                uri: uri,
                type : type

            })
            
            const response = await fetch(`${URL}auth/dashboard/updateuser/changeavatar`, {
                method:'PUT',
                headers:{
                    Accept: 'application/json',
                    'Content-type': 'multipart/form-data',
                    'authorization': `Bearer ${user.token}`
                },
                body:avatar,
            })
    
            const jsonRes = response.json()
            if(!response.ok){
                setAvatarPending(false)
                setAvatarError(jsonRes.error)
                
                
            }
            if(response.ok){
                setAvatarPending(false)
                setAvatarError(jsonRes.message)
            }
        }

        return {updateAvatar, avatarPending, avatarError}
}