import React, { useContext } from 'react'
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';

interface Props {
  align: 'left'|'right'|'center',
  value: string,
  columns: number,
  numberOfLines?: number
  numberOfLinesChild?: number
  adjustFont?: boolean,
  title?: boolean,
}

export const Cell = ({align, value, columns, adjustFont, title}: Props) => {
  const {width} = useWindowDimensions();
  const {theme: {palette}} = useContext(ThemeContext);
  
  const calcNumberOfLines = () => {
    const len = value.length;
    if(len<=12){
      return 1;
    } else if (len<=24){
      return 2;
    } else if (len<=36){
      return 3;
    } else if (len<=48){
      return 4;
    } else if (len<=60){
      return 5;
    } else if (len<=72){
      return 6;
    } else {
      return 7;
    }
  }

  return (
    <View style={{...styles.textContainer, width: (width*0.9-10)/columns}}>
      <Text 
        numberOfLines={calcNumberOfLines()} 
        adjustsFontSizeToFit={adjustFont??true} 
        style={{
          ...styles.text, 
          textAlign: title?'center':align, 
          color: palette.text.primary,
          fontWeight: title?'bold':'normal',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    text: {
       fontSize: 11
    },
    textContainer: {
      paddingHorizontal: 5
    }
});
