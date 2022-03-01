import React from 'react'
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Dato } from '../../interfaces/AcceptServiceInterface';
import { AcceptServiceForm } from './AcceptServiceForm';

interface Props {
  selectedRow: Dato;
  handleOnClose: () => void;
}

export const AcceptServiceModal = ({selectedRow, handleOnClose}: Props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!selectedRow?.id ? (<ActivityIndicator size={100}/>) : ( <AcceptServiceForm selectedRow={selectedRow} handleOnClose={handleOnClose}/> )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  }
});