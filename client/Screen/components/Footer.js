import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = () => {
    // Here you can handle the form submission logic
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // Reset form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View style={styles.footerContainer}>
      {/* Basic Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameComStyle}>Booking Restaurant</Text>
        {/* <Ionicons style={styles.iconLogo} name="restaurant" size={100} color="#28bab6" /> */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 120, height: 120, position: 'relative', marginLeft: 18 }}
            source={require('../../assets/pngtree-chef-restaurant-logo-png.png')}
          />
        </View>
        <Text style={styles.infoText}>Address: 123 Hai Ba Trung, Ho Chi Minh City, Viet Nam</Text>
        <Text style={styles.infoText}>Phone: +1234567890</Text>
        <Text style={styles.infoText}>Email: bookingres@ìno.com</Text>
      </View>
      {/* Contact Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f9f9f9',
    marginBottom: 68
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
    // Align content vertically to the top
    alignItems: 'flex-start',
  },
  infoText: {
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Additional style for the company name
  nameComStyle: {
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconLogo: {
    marginBottom: 28,
    marginLeft: 30
  },
});
