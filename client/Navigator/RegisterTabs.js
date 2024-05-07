import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import SignupScreen from './../Screen/Signup';
import LoginScreen from './../Screen/Login';


const RegisterTab = createBottomTabNavigator();



function RegisterTabs() {


  return (
    <RegisterTab.Navigator screenOptions={
    {
      headerShown:false,
      
    }} initialRouteName='Login'>
      <RegisterTab.Screen  name="Login" component={LoginScreen} options={{
        tabBarLabel: 'Log in',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused?'log-in':'log-in-outline'} color={'red'} size={size} />
        ),
      }}/>
      <RegisterTab.Screen name="Signup" component={SignupScreen} options={{
        tabBarLabel: 'Sign up',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused?'person-add':'person-add-outline'} color={'red'} size={size} />
        ),
      }}/>
    </RegisterTab.Navigator>
  );
}

export default RegisterTabs