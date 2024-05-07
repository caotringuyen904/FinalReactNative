import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Keyboard , TouchableWithoutFeedback} from 'react-native';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmission = () => {
        Alert.alert('Thank you for your message!');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <TouchableWithoutFeedback  onPress={()=>{Keyboard.dismiss()}}> 

        <View style={styles.container} >
            <View style={styles.header}>
                {/* Add your company logo here */}
                <Image
                    style={{ width: 120, height: 120, position: 'relative', marginLeft: 18 }}
                    source={require('../../assets/pngtree-chef-restaurant-logo-png.png')}
                />
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.description}>
                    Kitchen booking app là Mạng lưới nhà hàng NGON, uy tín và chất lượng. Giúp thực khách đặt bàn dễ dàng, được tặng kèm ưu đãi mà không cần mua Deal, Voucher. Giải pháp đột phá mới cho câu chuyện ăn gì, ở đâu!</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Contact Us</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={[styles.input, styles.messageInput]}
                    placeholder="Message"
                    multiline={true}
                    numberOfLines={4}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmission}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.infoText}>Address: 123 Hai Ba Trung, Ho Chi Minh City, Viet Nam</Text>
                <Text style={styles.infoText}>Phone: +1234567890</Text>
                <Text style={styles.infoText}>Email: bookingrestaurant@info.com</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    formContainer: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
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
    footer: {
        marginTop: 20,
      },
      infoText: {
        fontSize: 16,
        marginBottom: 5,
      },
});

export default Contact;
