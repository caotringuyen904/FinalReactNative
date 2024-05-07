import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useLogout } from '../../../hooks/useLogout';

const Account = () => {
  const navigation = useNavigation();

  const logout = useLogout()

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.title === 'User Info') {
            navigation.navigate('UserInfo');
          } else if (item.title === 'Reservation History') {
            navigation.navigate('ReservationHistoryByUser');
          }
          else {
            logout({ navigation })
          }
        }}>
        <View style={styles.itemContainer}>
          {item.title === "User Info" && <FontAwesome5 name="user-cog" size={24} color="crimson" />}
          {item.title === "Reservation History" && <FontAwesome5 name="book" size={24} color="crimson" />}
          {item.title === "Logout" && <FontAwesome5 name="sign-out-alt" size={24} color="crimson" />}
          <Text style={styles.textStyle}>{item.title}</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="crimson" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={[
        { key: '1', title: 'User Info' },
        // { key: '2', title: 'Reservation History' },
        { key: '3', title: 'Reservation History'},
        { key: '4', title: 'Logout' }
      ]}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default Account;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'crimson',
    flex: 1,
    marginLeft: 15
  }
});
