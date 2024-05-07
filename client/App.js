import { Button, StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AuthContext, useAuthContext } from './context/AuthContext';






const MainStack = createStackNavigator()
import RegisterTabs from './Navigator/RegisterTabs';
import Promotion from './Navigator/PromotionStack';


export default function App() {

  const [user, setUser] = useState('');
    
  return (
    <AuthContext.Provider value ={{user, setUser}}>
      <NavigationContainer>
        <MainStack.Navigator  screenOptions={{
          headerLeft:()=>null,
          headerShown:false
        }}>
          <MainStack.Screen name='Register' component={RegisterTabs}/>
          <MainStack.Screen name='Promotion' component={Promotion}/>
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


