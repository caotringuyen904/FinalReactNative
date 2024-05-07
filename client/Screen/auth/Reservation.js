import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createReservation, getRestaurantById } from '../../serverConnect/index';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useGetInfo } from '../../hooks/useGetInfo';


const Reservation = () => {

  const [restaurant, setRestaurant] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoading, error, getInfo } = useGetInfo();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reservData, setReservData] = useState({
    phone: '',
    quantity: '',
  });

  const [arrivalTime, setArrivalTime] = useState(null)

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  console.log('restaurantId:', id);

  const handleChange = (name, value) => {
    setReservData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check if any of the input fields are empty
    if (!reservData.phone || !arrivalTime || !reservData.quantity) {
      alert('Please fill in all fields');
      return; // Exit the function if any field is empty
    }
    // Show confirmation modal
    setModalVisible(true);
  };

  // Handle reservation confirmation
  const handleConfirm = async () => {

    try {
      const response = await createReservation({
        ...reservData,
        arrivalTime,
        id,
      }
    )
      // Clear input
      setReservData({
        phone: '',
        quantity: '',
      });

      // console.log('response:', response)
      setArrivalTime(null); // Reset arrival time

      // Hide modal
      setModalVisible(false);

      // Show success alert
      alert('Reservation created successfully')
      navigation.navigate('ReservDetail', { id: response.data.reservation._id })
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch user info
  const fetchData = async () => {
    const { email, name } = await getInfo()
    console.log('email:', email)
    console.log('name:', name)
    setName(name)
    setEmail(email)
  }

  // Fetch restaurant info
  const fetchRestaurantInfo = async () => {
    try {
      const restaurantInfoResponse = await getRestaurantById(id);
      setRestaurant(restaurantInfoResponse.data?.restaurant); // Assuming your server returns data in a specific format
    } catch (error) {
      console.log(error);
    }
  }



  // Date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDatePickerConfirm = (date) => {
    setArrivalTime(date); // Update arrivalTime state
    hideDatePicker();
  };

  useEffect(() => {
    fetchData();
    fetchRestaurantInfo(); // Fetch restaurant info

    console.log(error);
  }, []);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Ho_Chi_Minh' // Set the time zone to Vietnam
  };

  console.log('reservData:', reservData);
  console.log(typeof reservData);
  console.log("arrivalTime", typeof arrivalTime);
  console.log('arrivalTime:', arrivalTime);



  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reservation Info</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Person Quantity:</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={reservData.quantity}
            onChangeText={(value) => handleChange('quantity', value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={reservData.phone}
            onChangeText={(value) => handleChange('phone', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Arrival Time:</Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={styles.selectBtn}>{arrivalTime ? new Date(arrivalTime).toLocaleString('en-US', options) : 'select'}</Text>

          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDatePickerConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <Text style={styles.title}>User Info</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <Text style={styles.title}>Restaurant Info</Text>
        {restaurant && (
          <View style={styles.container}>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.input}>{restaurant.name}</Text>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.input}>{restaurant.address}</Text>
            </View>

          </View>
        )}

        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Reservation</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Confirm Reservation</Text>
              <Text>Quantity: {reservData.quantity}</Text>
              <Text>Arrival Time: {arrivalTime ? new Date(arrivalTime).toLocaleString() : ''}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={{ ...styles.buttonStyle, backgroundColor: 'red' }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.buttonStyle, backgroundColor: 'blue' }}
                  onPress={handleConfirm}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // adjust as needed

  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    width: 120, // Adjust width as needed
    textAlign: 'left',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    width: '45%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 70,
  },
  buttonText: {
    color: 'white',
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  selectBtn: {
    color: 'black',
    width: '100%',
    textAlign: 'center',
    padding: 10,
  },



});

export default Reservation;
