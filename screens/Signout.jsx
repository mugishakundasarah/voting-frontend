import * as SecureStore from 'expo-secure-store';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Text } from 'react-native';

const Signout = ({ navigation }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const signout = async () => {
    setIsAuthenticated(false);
    await SecureStore.deleteItemAsync('token');
    navigation.navigate('Login');
  };

  useEffect(() => {
    signout();
  }, []);

  return <Text>Logging out..</Text>;
};

export default Signout;
