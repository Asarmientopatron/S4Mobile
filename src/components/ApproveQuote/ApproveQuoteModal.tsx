import React, { useContext, useState } from 'react'
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';
import { CotizacionShow } from '../../interfaces/CotizacionInterface';
import { ApproveQuoteForm } from './ApproveQuoteForm';

interface Props {
  selectedRow: CotizacionShow;
  tipo: string;
  handleOnClose: () => void;
}

export const ApproveQuoteModal = ({selectedRow, handleOnClose, tipo}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!selectedRow?.id ? (<ActivityIndicator size={100}/>) : ( <ApproveQuoteForm selectedRow={selectedRow} handleOnClose={handleOnClose} tipo={tipo}/> )}
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