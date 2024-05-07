
export const useVerifyToken = () =>{
 
    const verifyToken = async (token)=> {
        const URL = process.env.EXPO_PUBLIC_API_URL

        console.log(token)
        //making the http request that return a response from server
        const response = await fetch(`${URL}auth/verifyToken`,{
        headers:{
            'authorization': `Bearer ${token}`
        }
        })

        if(!response.ok){
            return false
        }
        if(response.ok){
            return true;
        }

        
    }
    return {verifyToken}
}