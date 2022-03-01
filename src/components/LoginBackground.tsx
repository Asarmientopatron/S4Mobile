import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';

export const LoginBackground = () => {
  const {theme: {palette}} = useContext(ThemeContext);
  return (
    <View
      style={{
        position: 'absolute',
        width: 1000,
        height: 1000,
        top: -250,
        backgroundColor: palette.sidebar.bgColor,
        transform: [
          {rotate: '-70deg'}
        ]
      }}
    />
  );
};
