import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../Screen/navigations/BottomTabNaigation'


const PromotionStack = createStackNavigator()
import AccountManage from '../Screen/AccountManage';


const Promotion = () =>{

    return (
        <PromotionStack.Navigator screenOptions={{
        }} initialRouteName='Main'>
            <PromotionStack.Screen options={{headerShown:false, headerLeft:()=>null}} name='Main' component={MainPage}/>
            <PromotionStack.Screen name='AccountManage' component={AccountManage}/>
        </PromotionStack.Navigator>
    )
}

export default Promotion