import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Modal, Image , TextInput, ActivityIndicator, Pressable, Alert, Text, Keyboard, TouchableWithoutFeedback, ScrollView, SafeAreaView} from 'react-native';
import { useGetInfo } from '../hooks/useGetInfo';
import * as ImagePicker from 'expo-image-picker';
import { useUpdateAvatar } from '../hooks/useUpdateAvatar';
import { useUpdateName } from '../hooks/useUpdateName';
import { useUpdateEmail } from '../hooks/useUpdateEmail';
import { useUpdatePassword } from '../hooks/useUpdatePassword';
import { useDeleteUser } from '../hooks/useDeleteUser';





const AccountManage = ({navigation}) =>{

    const [refUser, setRefUser] = useState(undefined) 
    const [srcAvatar, setSrcAvatar] = useState(undefined)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const {isLoading, error, getInfo} = useGetInfo()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImg, setSelectedImg] = useState(undefined)
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    


    const {updateAvatar, avatarPending, avatarError} = useUpdateAvatar()
    const {updateName, namePending, nameError} = useUpdateName()
    const {updateEmail, emailPending, emailError} = useUpdateEmail({navigation})
    const {updatePassword, passwordPending, passwordError} = useUpdatePassword({navigation})
    const {deleteUser, deletePending, deleteError} = useDeleteUser({navigation})


    const fetchData = async ()=>{
        const {email, name, avatar} = await getInfo()
        console.log(avatar)
        setRefUser({email,name, avatar})
        setName(name)
        setEmail(email)
        setSrcAvatar(avatar)
    }

    const pickImageFromLibary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.canceled) {
            setSelectedImg({uri: result.assets[0].uri, type: result.assets[0].mimeType})
            setSrcAvatar(result.assets[0].uri);
        }
       
    };


    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
        }
        
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
    
        
        if (!result.cancelled) {
            setSelectedImg({uri: result.assets[0].uri, type: result.assets[0].mimeType})
            setSrcAvatar(result.assets[0].uri);
        }
    }

    const handleUpdate = async() =>{
        if(refUser.avatar !== srcAvatar){
            await updateAvatar(selectedImg)
            avatarError?console.log(avatarError):console.log('upload profile Img sucessful')
        }
        if(refUser.name !== name){
            await updateName(name)
            nameError?console.log(nameError):console.log('Update name sucessful')
        }
        if(refUser.email !== email){
            await updateEmail(email)
            emailError?console.log(emailError):console.log('Update email sucessful')
        }
        if(currentPassword !== '' || newPassword !== ''){
            await updatePassword(currentPassword, newPassword)
            setCurrentPassword('')
            setNewPassword('')
            
        }

        
    }


    useEffect(()=>{
        fetchData()
        console.log(error)
    },[])

    return (
        <TouchableWithoutFeedback  onPress={()=>{Keyboard.dismiss()}}>
            <View style={{marginBottom:80}}>
                <ScrollView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}>
                        <View style={stylesModal.centeredView}>
                        <View style={stylesModal.modalView}>
                            <Pressable
                            style={[stylesModal.button, stylesModal.buttonSelect]}
                            onPress={() => {pickImageFromLibary()}}>
                            <Text style={stylesModal.textStyle}>Select Image from Libary</Text>
                            </Pressable>
                            <Pressable
                            style={[stylesModal.button, stylesModal.buttonSelect]}
                            onPress={() => openCamera()}>
                            <Text style={stylesModal.textStyle}>Take a picture using camera</Text>
                            </Pressable>
                            <Pressable
                            style={[stylesModal.button, stylesModal.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={stylesModal.textStyle }>Close Select Options</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                    <SafeAreaView>
                        <View>
                            <View style={styles.avatar}>
                                <Pressable style={{borderWidth: 0.5, borderColor: 'crimson'}} onPress={ ()=>{setModalVisible(true)}}>
                                    {isLoading||avatarPending?<ActivityIndicator/>:<Image style={{width:150, height:150}} source={{uri:srcAvatar}} />}
                                </Pressable>
                                {avatarError&&<Text style={styles.error}>{avatarError}</Text>}
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Name</Text>

                                {namePending?<ActivityIndicator/>:<TextInput style={styles.input} placeholder='NAME' value={name} onChangeText={setName} autoCorrect={false}
                                autoCapitalize='none' />}

                                {nameError&&<Text style={styles.error}>{nameError}</Text>}

                                <Text style={styles.title}>Email</Text>

                                {emailPending?<ActivityIndicator/>:<TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} autoCorrect={false}
                                autoCapitalize='none' />}

                                {emailError&&<Text style={styles.error}>{emailError}</Text>}

                                <Text style={styles.title}>CURRENT PASSWORD</Text>

                                {passwordPending?<ActivityIndicator/>:<TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} autoCorrect={false}
                                autoCapitalize='none'/>}

                                <Text style={styles.title}>NEW PASSWORD</Text>

                                {passwordPending?<ActivityIndicator/>:<TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={newPassword} onChangeText={setNewPassword} autoCorrect={false}
                                autoCapitalize='none'/>}

                                {passwordError&&<Text style={styles.error}>{passwordError}</Text>}

                            </View>
                            <View>
                                
                                <Pressable style={styles.button} onPress={() => {handleUpdate()}}>
                                    <Text disabled={avatarPending||namePending||emailPending||passwordPending} style={styles.buttonText}>UPDATE</Text>
                                </Pressable>
                                <Pressable style={styles.deleteButton} onPress={() => {setModalDeleteVisible(true)}}>
                                    <Text style={styles.buttonText}>DELETE USER</Text>
                                </Pressable>
                            </View>
                        </View>
                    </SafeAreaView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalDeleteVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalDeleteVisible);
                        }}>
                        <View style={stylesModal.centeredView}>
                        <View style={stylesModal.modalView}>

                            <TextInput style={stylesModal.input} placeholder='CURRENT PASSWORD' secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} autoCorrect={false}
                            autoCapitalize='none'/>
                            {deleteError&&<Text style={styles.error}>{deleteError}</Text>}
                            <Pressable disabled={deletePending}
                            style={[stylesModal.button, stylesModal.buttonClose]}
                            onPress={() =>{deleteUser(currentPassword)}}>
                            <Text style={stylesModal.textStyle}>DELETE USER</Text>
                            </Pressable>
                            <Pressable
                            style={[stylesModal.button, stylesModal.buttonSelect]}
                            onPress={() => setModalDeleteVisible(!modalDeleteVisible)}>
                            <Text style={stylesModal.textStyle }>RETURN TO MANAGE SCREEN</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AccountManage


const styles = StyleSheet.create({
    error:{
        fontSize:15,
        color: 'red',
    },
    avatar: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent:'center',
    },
    info: {
        marginTop: 0,
    },
    input:{
        
        height : 50,
        paddingHorizontal : 20,
        borderColor : "red",
        borderWidth : 1,
        borderRadius: 7
    },
    title:{
        fontSize : 15,
        fontWeight : "bold",
        textTransform : "uppercase",
        textAlign: "left",
        paddingVertical : 15,
        color : "red",
        marginLeft: 15,
    },
    button : {
        marginTop: 20,
        backgroundColor : "red",
        height : 45,
        borderColor : "gray",
        borderWidth  : 1,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        padding:10
    },
    deleteButton : {
        marginTop: 20,
        backgroundColor : "#710c04",
        height : 45,
        borderColor : "gray",
        borderWidth  : 1,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        padding:10,
    },
    buttonText : {
        color : "white"  ,
        fontSize: 18,
        fontWeight : "bold"
    },
  });

  const stylesModal = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    input:{
        
        height : 50,
        paddingHorizontal : 20,
        borderColor : "#1e90ff",
        borderWidth : 1,
        borderRadius: 7,
        width: 250
    },
    modalView: {
      margin: 20,
      gap:20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonSelect: {
      backgroundColor: '#f4511e',
    },
    buttonClose: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      width:200
    },
  
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });