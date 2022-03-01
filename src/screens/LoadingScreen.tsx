import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';

export const LoadingScreen = () => {
  const {theme: {palette}} = useContext(ThemeContext);
  return (
    <View 
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.background.paper
      }}
    >
      <ActivityIndicator 
        size={100}
      />
    </View>
  )
}
