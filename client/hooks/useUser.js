import AsyncStorage from '@react-native-async-storage/async-storage'

const storeUser = async user => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('store user sucessfully' + user)
    } catch (error) {
      console.error('Error storing user :', error);
    }
  };

const getUser = async () => {
    try {
      const userValue = JSON.parse(await AsyncStorage.getItem('user'));
      console.log('getting user sucessfully' + userValue)
      return userValue !== null ? {userValue} : {userValue: ''};
    } catch (error) {
      console.error('Error getting user: ', error);
      return null;
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
      console.log('clear user sucessfully')
    } catch (error) {
      console.error('Error clearing user from AsyncStorage:', error);
    }
  };


  export {
    storeUser,
    getUser,
    clearUser
  };