import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getReservations, deleteReservation } from '../../../serverConnect/index';

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);

  const getData = async () => {
    try {
      const response = await getReservations();
      setReservations(response.data?.reservations);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('reservationsssss', reservations);

  const handleCancelReservation = async (id) => {
    try {
      // Call the cancelReservation API with the reservation ID
      await deleteReservation(id);
      // Update the reservations list by fetching the data again
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View >
        <FlatList scrollEnabled={true}
        data={reservations}
        renderItem={({ item }) => (
          
            <View  style={{marginTop:20, marginBottom:55}}>
              <Image 
                source={{ uri: item.restaurant.images[0] }}
                style={{ width: 150, height: 150, alignSelf:'center' }}
              />
              <Text style={styles.text}>Restautrant : {item.restaurant.name}</Text>
              <Text style={styles.text}>Address : {item.restaurant.address}</Text>
              <Text style={styles.text}>Booking ID : {item._id}</Text>
              <Text style={styles.text}>Phone number : {item.phone}</Text>
              <Text style={styles.text}>People ammount : {item.quantity}</Text>
              <Text style={styles.text}>Booking status : {item.status}</Text>
              {/* TouchableOpacity for cancelling reservation */}
              <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelReservation(item._id)}>
                <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
              </TouchableOpacity>
              <Text style={{fontSize:20, alignSelf:'center'}}>---------------------------------------------------</Text>
            </View>
    
        )}
        keyExtractor={(item, index) => item._id.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text:{
    fontSize:15,
    marginTop:10,
  }
});

export default ReservationHistory;
