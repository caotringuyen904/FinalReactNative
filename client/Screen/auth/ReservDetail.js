import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getReservationById, deleteReservation } from '../../serverConnect/index';
import { useNavigation } from '@react-navigation/native';
import { useGetInfo } from '../../hooks/useGetInfo';

const ReservDetail = () => {
    const navigation = useNavigation();
    const [reservation, setReservation] = useState(null)
    const [loading, setLoading] = useState(true)
    const { isLoading, error, getInfo } = useGetInfo()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const route = useRoute();
    const { id } = route.params;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getReservationById(id);
            setReservation(response.data?.reservation);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Fetch user info
  const fetchDataUserInfo = async () => {
    const { email, name } = await getInfo()
    
    setName(name)
    setEmail(email)
  }

    useEffect(() => {
        fetchData()
        fetchDataUserInfo()
    }, []);

    const handleCancelReservation = async () => {
        try {
            await deleteReservation(id);
            Alert.alert('Reservation cancelled successfully');
            // Handle success, navigate to another screen, show a message, etc.
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    const renderReservationDetail = useMemo(() => {
        if (!reservation) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            );
        }

        const arrivalTimeOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Ho_Chi_Minh'
        };
        const formattedArrivalTime = new Date(reservation.arrivalTime).toLocaleString('en-US', arrivalTimeOptions);

       
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Reservation Info</Text>
                <Text style={styles.text}>Person Quantity: {reservation.quantity}</Text>
                <Text style={styles.text}>Arrival Time: {formattedArrivalTime}</Text>

                <Text style={styles.lineStyle}>──────</Text>


                <Text style={styles.title}>Customer Info</Text>
                <Text style={styles.text} >Phone: {reservation.phone}</Text>
                <Text style={styles.text}>Email: {email}</Text>
                <Text style={styles.text}>Name: {name}</Text>

                <Text style={styles.lineStyle}>──────</Text>
                <Text style={styles.title}>Restaurant Info</Text>
                <TouchableOpacity
                    style={styles.restaurantContainer}
                    onPress={() => navigation.navigate('Detail', { id: reservation.restaurant._id })}
                >
                    <Image source={{ uri: reservation.restaurant.images[0] }} style={styles.restaurantImage} />
                    <View style={styles.restaurantDetails}>
                        <Text style={styles.restaurantName}>{reservation.restaurant.name}</Text>
                        <Text>{reservation.restaurant.address}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelReservation}>
                    <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
                </TouchableOpacity>
            </View>
        );
    }, [reservation]);

    return renderReservationDetail;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 12,
        left: 17
    },
    lineStyle: {
        color: 'gray',
        fontSize: 60,
        marginTop: 10,
        alignSelf: 'center',
      },
    cancelButton: {
        marginTop: 20,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    restaurantContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    restaurantImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    restaurantDetails: {
        flex: 1,
        marginLeft: 10,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ReservDetail;
