import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import SplashScreen from 'react-native-splash-screen'
import { MainNavigator } from './MainNavigator';
import { AuthContext } from '../contexts/authContext/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['react-native-gesture-handler']);

const Stack = createStackNavigator();

export const LoginNavigation = () => {
  const {status} = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  },[])

  if(status==='checking') return <LoadingScreen/>
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {status !== 'authenticated' ? (
        <Stack.Screen name="Home" component={LoginScreen} />
      ): (
        <Stack.Screen name="MainNavigation" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
}