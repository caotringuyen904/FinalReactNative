import React, { useState } from 'react'
import {Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View,TouchableWithoutFeedback, Keyboard, ActivityIndicator, ScrollView } from 'react-native'
import { useSignup } from '../hooks/useSignup';
//Loading the media resource
const logo = require("../assets/pngtree-chef-restaurant-logo-png.png");
const facebook = require("../assets/facebook.png");
const linkedin = require("../assets/linkedin.png");
const tiktok = require("../assets/instagram.png");


//Building login form
export default function SignupForm({navigation}) {
    const [email,setEmail]=  useState("");
    const [password,setPassword]=  useState("");
    const [name, setName] = useState("");

    const {signup, isLoading, error} = useSignup()

    const handleSignup = async() =>{
      setEmail('')
      setName('')
      setPassword('')
      await signup(name,email,password, navigation)

    }

    if(!isLoading){
      return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
          <ScrollView>
          <SafeAreaView style={styles.container}>
              
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.inputView}>
              <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={email} onChangeText={setEmail} autoCorrect={false}
              autoCapitalize='none' />
              <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
              autoCapitalize='none'/>
              <TextInput style={styles.input} placeholder='NAME' value={name} onChangeText={setName} autoCorrect={false}
              autoCapitalize='none'/>
              <Text>{error}</Text>
            </View>
              
    
            <View style={styles.buttonView}>
              <Pressable style={styles.button} onPress={() => {handleSignup()}}>
                <Text style={styles.buttonText}>Sign up</Text>
              </Pressable>
            </View>

                        
            <Text style={styles.footerText}>You 've already have an account?</Text>
    
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signup}>Login</Text>
            </Pressable>
    
              
          </SafeAreaView>
          </ScrollView>
        </TouchableWithoutFeedback>
      )
    }
    else{
      return (
        <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
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
    marginBottom  : -10
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
    padding:10
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold",
  }, 
  buttonView :{
    marginTop: 10,
    marginBottom : 30,
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 0,
    color : "gray",
    fontSize : 15,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
    fontSize:15
  },
  signup : {
    color : "red",
    fontSize : 15
  }
})