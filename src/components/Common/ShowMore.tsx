import React, { useContext } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';

interface Props {
  onShowMore: () => void,
  status: string
}

export const ShowMore = ({onShowMore, status}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);

  return (
    status==='loadingMore' ?
    <View style={styles.view}>
      <ActivityIndicator size={30} color={palette.primary.main}/>
    </View>
    :
    <TouchableOpacity 
      style={styles.view}
      onPress={onShowMore}
    >
      <Text style={{...styles.text, color: palette.text.hint}}>Mostrar más</Text>
      <Icon name='chevron-down' color={palette.text.hint} size={20}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    view: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: 200,
      height: 50
    },
    text: {
      fontSize: 15,
      marginRight: 10
    }
});