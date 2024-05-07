import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const LogoTitle = ({probs}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{probs}</Text>
            <View style={styles.containerImg}>
            <Image
                style={styles.image}
                source={require('../../assets/pngtree-chef-restaurant-logo-png.png')}
            />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 25,
        color: '#fff',
        marginRight: 300,
        marginTop: 10,
        position: 'relative',

    },
    image: {
        width: 48,
        height: 48,
    },
    containerImg: {
        position: 'absolute',
        marginHorizontal: 172,
        bottom: -2
    }
});

export default LogoTitle;
