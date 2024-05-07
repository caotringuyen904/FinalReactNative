import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { getRestaurants } from '../../serverConnect/index'
import { Ionicons } from '@expo/vector-icons';

const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([])
    const navigation = useNavigation()

    const getData = async () => {
        try {
            const response = await getRestaurants()
            setRestaurants(response.data?.restaurants)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(restaurants)
    return (
        <View style={{ marginTop: 10, marginBottom: 30 }}>
            <FlatList scrollEnabled={false}
                data={restaurants}
                renderItem={({ item }) => (
                    <View style={styles.restaurantContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item?._id })}>
                        {item.images.length > 0 && (
                            <Image
                                source={{ uri: item.images[0] }} // Use the first image URL
                                style={styles.imageStyle}
                            />
                        )}
                        <Text style={styles.nameStyle}>{item.name}</Text>
                        <Text style={styles.addressStyle}>{item.address}</Text>
                
                        {/* Row for star, reservation button, and location */}
                        <View style={styles.rowContainer}>
                            <View style={styles.iconLocation}>
                                <Ionicons name="location" size={24} color="#28bab6" />
                                <Text style={styles.iconText}>8.8 km</Text>
                            </View>
                
                            <TouchableOpacity style={styles.reservationButton} onPress={() => navigation.navigate('Detail', { id: item?._id })}>
                                <Text style={styles.buttonText}>Reservation</Text>
                            </TouchableOpacity>
                
                            <View style={styles.iconStar}>
                                <Ionicons name="star" size={24} color="#fbd808" />
                                <Text style={styles.iconText}>4.5 | $$</Text>
                            </View>
                        </View>
                        <Text
                            style={[styles.descriptionStyle, { lineHeight: 21 }]}
                            numberOfLines={2}
                        >
                            {item.description}
                        </Text>
                        <Text style={styles.lineStyle}> ─────────────────────────────────────</Text>
                    </TouchableOpacity>
                </View>
                
                )}
                vertical
                contentContainerStyle={{ paddingHorizontal: 10 }}
                keyExtractor={(item, index) => item._id.toString() || index.toString()}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    restaurantContainer: {
        margin: 10,
        marginBottom: 40,
        alignItems: 'center',
    },
    imageStyle: {
        width: 380,
        height: 180,
        borderRadius: 10,
        marginBottom: 10
    },
    nameStyle: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 1
    },
    addressStyle: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: 'gray',
        marginBottom: 10
    },
    descriptionStyle: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: 'gray',
        marginTop: 15,
        textAlign: 'justify',
        overflow: 'hidden'
    },
    lineStyle: {
        color: 'gray',
        fontSize: 10,
        marginTop: 10,
    },
    reservationButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    // New styles for the row container and icons
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    iconStar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reservationButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginRight: 50,
    },
    iconLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50
    },
})

export default Restaurant
