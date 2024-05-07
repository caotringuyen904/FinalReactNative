import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Keyboard, TouchableOpacity, Text, TouchableWithoutFeedback  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const Search = () => {
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission denied');
      }
  
      let location = await Location.getCurrentPositionAsync({});
      if (!location) {
        throw new Error('Location not available');
      }
  
      setLocation(location);
    } catch (error) {
      let errorMessage = 'Failed to get current location';
      if (error.message === 'Location permission denied') {
        errorMessage = 'Location permission denied. Please enable location services in your device settings and try again.';
      } else if (error.message === 'Location not available') {
        errorMessage = 'Location not available. Please make sure location services are enabled and try again.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const searchNearbyRestaurants = async () => {
    if (!location) {
        Keyboard.dismiss()
      Alert.alert('Error', 'Current location not available');
      return;
    }

    try {
      const apiKey = 'AIzaSyCNYbR6v9MKlvqNmOQdzA80msHTnhU-bi4';
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=1500&type=restaurant&keyword=${searchQuery}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('====================================')
      console.log(data);
      console.log('====================================')

      if (data.status === 'OK') {
        setRestaurants(data.results);
      } else {
        throw new Error('Error fetching nearby restaurants')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch nearby restaurants')
    }

  };

  return (
    <TouchableWithoutFeedback  onPress={()=>{Keyboard.dismiss()}}>    
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity  style={styles.buttonContainer}  onPress={getCurrentLocation}>
          <Text style={styles.textStyle}>Get Current Location</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for nearby restaurants"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          
        />
        <TouchableOpacity  style={styles.buttonSearch}  onPress={searchNearbyRestaurants}>
          <Text style={styles.textStyle}>Search</Text>
        </TouchableOpacity>
        
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : 10.754792,
          longitude: location ? location.coords.longitude : 106.6952277,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {/* Marker for the user's current location */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            pinColor="red" // Optionally, change the color of the marker
          />
        )}

        {/* Markers for nearby restaurants */}
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
          />
        ))}
      </MapView>
    </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonSearch: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
  map: {
    flex: 1,
  }
});

export default Search
