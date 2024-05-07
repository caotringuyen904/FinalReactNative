import axios from "axios"
import { AsyncStorage } from "react-native"
import { useAuthContext } from "../context/AuthContext"
import { getUser } from "../hooks/useUser"

// 172.20.10.2   phone
// 192.168.1.2   home
// 172.16.4.81
const URL = process.env.EXPO_PUBLIC_API_URL

const instance = axios.create({
    baseURL: URL
})



const authInstance = axios.create({
    baseURL: URL,
})


authInstance.interceptors.request.use(async (config) => {
    try {
        const { userValue } = await getUser()
        const user = JSON.parse(userValue)
        // console.log('user:', user)
        // console.log('token:', user.token)

        config.headers.Authorization = `Bearer ${user.token}`
        return config

    } catch (error) {
        console.log('error:', error)
        return config

    }
    return config
}
)

export const createReservation = (data) => {

    // return instance.post('/reservation', data)
    return authInstance.post('/reservation', data)

}



export const getRestaurants = () => {
    return instance.get(`/restaurant`)
}

export const getRestaurantById = (id) => {
    return instance.get(`/restaurant/${id}`)

}



export const getReservations = () => {
    return instance.get(`/reservation`)
}

export const getReservationByUser = () => {
    return authInstance.get(`/reservation/user`)
}

export const getReservationById = (id) => {
    return instance.get(`/reservation/${id}`)
}

export const deleteReservation = (id) => {
    return instance.delete(`/reservation/${id}`)
}

export const updateReservation = (id, data) => {
    return instance.put(`/reservation/${id}`, data)
}


