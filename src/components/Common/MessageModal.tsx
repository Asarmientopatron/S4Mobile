import React, { useContext, useEffect, useState } from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';
import { CommonContext } from '../../contexts/commonContext/CommonContext';

export const MessageModal = () => {
  const {theme: {palette}} = useContext(ThemeContext);
  const {message, error, resetState} = useContext(CommonContext);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if(message||error){
      setVisible(true)
    }
    setTimeout(() => {
      setVisible(false)
      resetState();
    }, 3000)
  }, [message, error])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={{...styles.modalView, backgroundColor: message?palette.boxes.success:palette.boxes.error}}>
            <Text style={{...styles.modalText, color: palette.text.white}}>{message?message:error}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setVisible(false)}
            >
              <Icon 
                name='close'
                color={'white'}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});
