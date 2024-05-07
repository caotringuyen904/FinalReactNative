import { useAuthContext } from "../context/AuthContext";
import { clearUser } from "./useUser";

export const useLogout = () => {
    const {setUser} = useAuthContext()
    
    const logout = ({navigation}) =>{
        clearUser()
        setUser(undefined)
        navigation.navigate('Register')
    }

    return logout
}
