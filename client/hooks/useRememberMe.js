import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserEmail = async email => {
  try {
    await AsyncStorage.setItem('email', JSON.stringify(email));
    console.log('store email' + email)
  } catch (error) {
    console.error('Error storing email for remembre me:', error);
  }
};

const getUserEmail = async () => {
  try {
    const emailValue = JSON.parse(await AsyncStorage.getItem('email'));
    console.log('Get email' + emailValue)
    return emailValue !== null ? {emailValue} : {emailValue: ''};
  } catch (error) {
    console.error('Error getting stored email fo rmemerme:', error);
    return null;
  }
};

const clearUserEmail = async () => {
  try {
    await AsyncStorage.removeItem('email');
  } catch (error) {
    console.error('Error clearing email from AsyncStorage:', error);
  }
};

const storeRememberStatus = async value => {
  try {
    await AsyncStorage.setItem('rememberStatus', JSON.stringify(value));
  } catch (error) {
    console.error('Error storing check value for remember me:', error);
  }
};

const getRememberStatus = async () => {
  try {
    const rememberValue = JSON.parse(await AsyncStorage.getItem('rememberStatus'));
    return rememberValue !== null ? {rememberValue} : {rememberValue: false};
  } catch (error) {
    console.error('Error getting check value for remember me:', error);
    return null;
  }
};

export {
  clearUserEmail,
  getRememberStatus,
  getUserEmail,
  storeRememberStatus,
  storeUserEmail,
};