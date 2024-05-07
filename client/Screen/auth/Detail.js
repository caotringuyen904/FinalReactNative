import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getRestaurantById } from '../../serverConnect/index'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


const Detail = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params
  console.log('idofResatDetatail:', id)

  const [restaurant, setRestaurant] = useState(null); // Initialize with null
  const getData = async () => {
    try {
      const result = await getRestaurantById(id)
      setRestaurant(result?.data?.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    // <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {restaurant ? (
        <>
          <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
          <Text style={styles.title}>{restaurant.name}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={24} color="#3f4f4c" />
            <Text style={styles.info}>{restaurant.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call" size={24} color="#3f4f4c" />
            <Text style={styles.info}>{restaurant.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={24} color="#3f4f4c" />
            <Text style={styles.info}>{restaurant.active ? "Openning" : "Openning"}</Text>
          </View>
          <TouchableOpacity style={styles.reservationButton} onPress={() => navigation.navigate('Reservation', { id })}>
            <Text style={styles.buttonText}>Reservation</Text>
          </TouchableOpacity>

          <Text style={styles.lineStyle}>──────</Text>

          <Text style={styles.title}>Description</Text>
          <Text style={styles.descriptionStyle}>{restaurant.description}</Text>

          <Text style={styles.lineStyle}>──────</Text>


          <Text style={styles.title}>Gallery</Text>
          <FlatList
            contentContainerStyle={{ marginBottom: 160 }} // Add this line 
            scrollEnabled={false}
            data={restaurant.images}
            horizontal={false}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.galleryImage} />
            )}
          />



        </>
      ) : (
        <Text>Loading...</Text>
      )}



    </ScrollView>

    // </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',

  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 5,
    right: 5,
    alignSelf: 'flex-start',
  },
  descriptionStyle:{
    fontSize: 16,
    marginBottom: 30,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  reservationButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start', // Align items vertically
    marginBottom: 10, // Add margin if needed
    marginLeft: 20,

  },
  icon: {
    marginRight: 5, // Add some space between the icon and text
  },

  lineStyle: {
    color: 'gray',
    fontSize: 60,
    marginTop: 10,
    alignSelf: 'center',
   
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,

  },

});
