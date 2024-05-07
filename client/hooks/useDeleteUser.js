import { useState } from "react";
import { useAuthContext } from '../context/AuthContext'
import{clearUser} from './useUser'



export const useDeleteUser = ({navigation}) => {

  const [deletePending, setDeletePending] = useState(false)
  const [deleteError, setDeleteError] = useState('')


  const { user, setUser } = useAuthContext()

  const URL = process.env.EXPO_PUBLIC_API_URL


  const deleteUser = async (password) => {
    if (!user) {
      return
    }
    setDeleteError('')
    setDeletePending(true)


    const response = await fetch(`${URL}auth/dashboard/updateuser/deleteUser`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ password })
    })

    const jsonRes = await response.json()
    if (!response.ok) {
      setDeletePending(false)
      setDeleteError(jsonRes.error)

    }
    if (response.ok) {
      setDeletePending(false)
      setDeleteError(jsonRes.message)
      await clearUser()
      setUser('')
      navigation.navigate('Register')

    }
  }

  return { deleteUser, deletePending, deleteError }
}
