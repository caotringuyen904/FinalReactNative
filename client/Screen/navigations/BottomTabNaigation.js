import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import Home from '../auth/Home'
import Search from '../auth/Search'
import Account from '../auth/profile/Account'
import AccountManage from '../AccountManage'
import ReservationHistory from '../auth/profile/ReservationHistory'
import ReservationHistoryByUser from '../auth/profile/ReservationHistoryByUser'
import Reservation from '../auth/Reservation'
import Detail from '../auth/Detail'
import ReservDetail from '../auth/ReservDetail'
import { Ionicons } from '@expo/vector-icons'
import LogoTitle from '../components/headerLogo'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen name="Reservation" component={Reservation} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen options={{ title: 'Reservation Detail' }} name="ReservDetail" component={ReservDetail} />
        </Stack.Navigator>
    )
}

const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Account" component={Account} />
            <Stack.Screen options={{
                title: 'User Information',
            }} name="UserInfo" component={AccountManage} />
            <Stack.Screen options={{
                title: 'Reservation History'
            }} name="ReservationHistory" component={ReservationHistory} />
            <Stack.Screen options={{
                title: 'Reservation History'
            }} name="ReservationHistoryByUser" component={ReservationHistoryByUser} />


        </Stack.Navigator>
    )
}

const screenOptions = {
    tabBarShơwLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70,
    }
}

const BottomTabNavigation = () => {

    return (

        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => <LogoTitle probs={'Home'} />,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={focused ? 'red' : '#808080'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => <LogoTitle probs={'Search'} />,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'search-sharp'}
                            size={24}
                            color={focused ? 'red' : '#808080'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='About'
                component={Contact}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => <LogoTitle probs={'About'} />,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'document' : 'document-text-outline'}
                            size={24}
                            color={focused ? 'red' : '#808080'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={AccountStack}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => <LogoTitle probs={'Profile'} />,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={24}
                            color={focused ? 'red' : '#808080'}
                        />
                    )
                }}
            />
        </Tab.Navigator>

    )
}

export default BottomTabNavigation

