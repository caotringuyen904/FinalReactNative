import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableWithoutFeedback, Keyboard, View, ActivityIndicator, ScrollView } from 'react-native'
import { useLogin } from '../hooks/useLogin';
import {setUser, getUser, clearUser} from '../hooks/useUser'
import { AuthContext, useAuthContext } from '../context/AuthContext';
import { useVerifyToken } from '../hooks/useVerify';


import {
  clearUserEmail,
  getRememberStatus,
  getUserEmail,
  storeRememberStatus,
  storeUserEmail,
} from '../hooks/useRememberMe';



//Loading the media resource
const logo = require("../assets/pngtree-chef-restaurant-logo-png.png");
const facebook = require("../assets/facebook.png");
const linkedin = require("../assets/linkedin.png");
const tiktok = require("../assets/instagram.png");



//Building login form
export default function LoginForm({navigation}) {

  const [remember,setRemember] = useState(false);
  const [email,setEmail]=  useState("");
  const [password,setPassword]=  useState("");

  const {login, isLoading, error} = useLogin();
  const {verifyToken} = useVerifyToken()
  const {setUser} = useAuthContext()

  const handleLogin = ()=>{
    storeUserEmail(email);
    if(remember==false)setEmail('')
    setPassword('')
    login(email,password, navigation)
    
  }

  const handleRememberSwitch = async () => {
    setRemember(!remember);
    await storeRememberStatus(!remember);
  };


  useEffect(()=>{


    const fetchRememberValuesFromStorage = async () => {
      try {
        const {emailValue} = await getUserEmail();
        const {rememberValue} = await getRememberStatus();
        setRemember(rememberValue);
        setEmail(emailValue);
        console.log('set email ' + emailValue)
        if (!rememberValue) {
          clearUserEmail();
          setEmail('')
        }
      } catch (error) {
        console.error('Error fetching checkValue or email:', error);
      }
    };
    fetchRememberValuesFromStorage();

    const fetchUserValuesFromStorage = async () => {
      try {
        const userString = await getUser();
        if (userString === null || userString.userValue == ""){
          setUser("")
          clearUser()
          return
        }
        else{
          const user = JSON.parse(userString.userValue)
          const token = user.token
          const isTokenVerify = await verifyToken(token)
          if(!isTokenVerify){
            clearUser();
            setUser('');
            return;
          }
          setUser(user)
          console.log('Setting user to context' + user)
          navigation.navigate('Promotion')
        }  
      } catch (error) {
        console.error('Error fetching user Value from local storage', error);
      }
    };
    fetchUserValuesFromStorage();
  },[])


  if(!isLoading){
    return (
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <ScrollView>
        <SafeAreaView style={styles.container}>
            
          <Image source={logo} style={styles.image} resizeMode='contain' />
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={email} onChangeText={setEmail} autoCorrect={false}
            autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
            autoCapitalize='none'/>
            {error && <Text>{error}</Text>}
          </View>
          <View style={styles.rememberView}>
              <View style={styles.switch}>
                <Switch  value={remember} onValueChange={handleRememberSwitch} trackColor={{true : "green" , false : "gray"}} />
                <Text style={styles.rememberText}>Remember Me</Text>
                
              </View>
              
          </View>
  
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
          </View>
            
          
  
          <Text style={styles.footerText}>Don't Have Account?</Text>
  
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>Sign Up</Text>
          </Pressable>
  

        </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
  else{
    return (
      <View style={{flex:1 , justifyContent:'center', alignItems: 'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 30,
    top : 120

  },
  image : {
    height : 150,
    width : 150
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 20,
    color : "red"
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    fontSize: 15
  },
  forgetText : {
    fontSize : 15,
    color : "red"
  },
  button : {
    backgroundColor : "red",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center",
    padding:10,
    marginBottom: 50,
    marginTop:10
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 15,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 10
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
    fontSize: 15
  },
  signup : {
    color : "red",
    fontSize : 15
  }
})