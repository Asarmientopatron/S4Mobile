import React from 'react';
import { Image, View } from 'react-native';

export const MainLogo = () => {
  return (
    <View style={{alignItems: 'center', marginVertical: 30}}>
      <Image 
        source={require('./../assets/mainLogo.png')}
        style={{
          width: 150,
          height: 150
        }}
      />
    </View>
  );
};
