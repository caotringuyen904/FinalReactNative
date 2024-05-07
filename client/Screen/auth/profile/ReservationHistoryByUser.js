import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { getReservationByUser, deleteReservation } from '../../../serverConnect/index';

const ReservationHistoryByUser = () => {
    const [reservations, setReservations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);

    const getData = async () => {
        try {
            const response = await getReservationByUser();
            setReservations(response.data?.reservations);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelReservation = async (id) => {
        try {
            setSelectedReservationId(id); // Set the id of the reservation to be cancelled
            setModalVisible(true); // Show the confirmation modal
        } catch (error) {
            console.log(error);
        }
    };

    const confirmCancelReservation = async () => {
        try {
            await deleteReservation(selectedReservationId);
            getData();
            setModalVisible(false); // Hide the modal after cancellation
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={reservations}
                renderItem={({ item }) => {
                  const arrivalTimeOptions = {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      timeZone: 'Asia/Ho_Chi_Minh'
                  };
                  const formattedArrivalTime = new Date(item.arrivalTime).toLocaleString('en-US', arrivalTimeOptions);
              
                  return (
                      <View style={styles.itemContainer}>
                          <Image
                              source={{ uri: item.restaurant.images[0] }}
                              style={styles.image}
                          />
                          <View style={styles.detailsContainer}>
                              <Text style={styles.idText}>Booking ID: {item._id}</Text>
                              <Text style={styles.nameText}>{item.restaurant.name}</Text>
                              <Text style={styles.detailText}>Arrival Time: {formattedArrivalTime}</Text>
                              <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelReservation(item._id)}>
                                  <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  );
              }}
                keyExtractor={(item) => item._id.toString()}
                showsVerticalScrollIndicator={false}
            />
            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to cancel this reservation?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.confirmButton} onPress={confirmCancelReservation}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButtonModal} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 80,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    detailsContainer: {
        flex: 1,
    },
    idText: {
        fontSize: 12,
        marginBottom: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        marginBottom: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    confirmButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelButtonModal: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ReservationHistoryByUser;
