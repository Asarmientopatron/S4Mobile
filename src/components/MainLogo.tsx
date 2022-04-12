import React from 'react';
import { Image, View } from 'react-native';

export const MainLogo = () => {
  return (
    <View style={{alignItems: 'center', marginVertical: 30}}>
      <Image 
        source={require('./../assets/LogoSmart3.png')}
        style={{
          width: 250,
          height: 150
        }}
      />
    </View>
  );
};
