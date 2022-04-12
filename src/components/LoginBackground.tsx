import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';

export const LoginBackground = () => {
  const {theme: {palette}} = useContext(ThemeContext);
  return (
    <View
      style={{
        position: 'absolute',
        width: 900,
        height: 900,
        borderRadius: 1000,
        top: -90,
        left: -50,
        backgroundColor: palette.sidebar.bgColor,
        transform: [
          {rotate: '-70deg'}
        ]
      }}
    />
  );
};
