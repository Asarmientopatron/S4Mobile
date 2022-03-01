import React, { useContext } from 'react'
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';

interface Props {
  align: 'left'|'right'|'center',
  value: string|number,
  columns: number,
  numberOfLines?: number
  numberOfLinesChild?: number
  adjustFont?: boolean,
  title?: boolean
}

export const Cell = ({align, value, columns, adjustFont, numberOfLines, title, numberOfLinesChild}: Props) => {
  const {width} = useWindowDimensions();
  const {theme: {palette}} = useContext(ThemeContext)
  return (
    <View style={{...styles.textContainer, width: (width*0.9-10)/columns}}>
      <Text 
        numberOfLines={title?numberOfLines??1:numberOfLinesChild??1} 
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
       fontSize: 13
    },
    textContainer: {
      paddingHorizontal: 5
    }
});
