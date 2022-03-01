import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';
import { CotizacionShow } from '../../interfaces/CotizacionInterface';
import { CotizacionContext } from '../../contexts/cotizacionContext/CotizacionContext';
import { Picker } from '@react-native-picker/picker';
import * as yup from 'yup';

interface Props {
  selectedRow: CotizacionShow,
  handleOnClose: () => void,
  tipo: string
}

export const ApproveQuoteForm = ({selectedRow, handleOnClose, tipo}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);
  const {unSelectRow, getAsociados, asociados, onApprove} = useContext(CotizacionContext);

  useEffect(() => {
    getAsociados();
  },[]);

  const validationSchema = yup.object({
    id: yup.string().required('Requerido'),
    asociado_id: yup.string().required('Requerido')
  });

  return (
    <View>  
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          id: selectedRow.id,
          numero_solicitud: selectedRow.numero_solicitud_cotizacion?selectedRow.numero_solicitud_cotizacion.toString():'',
          fecha_solicitud_cotizacion: selectedRow.solicitud_cotizacion.fecha_solicitud_cotizacion?selectedRow.solicitud_cotizacion.fecha_solicitud_cotizacion:'',
          asociado_id: selectedRow.asociado_id?selectedRow.asociado_id.toString():'',
          fecha_cotizacion: selectedRow.fecha_cotizacion?selectedRow.fecha_cotizacion:'',
          fecha_vigencia_cotizacion: selectedRow.fecha_vigencia_cotizacion?selectedRow.fecha_vigencia_cotizacion:'',
          plazo_pago_cotizacion: selectedRow.plazo_pago_cotizacion?selectedRow.plazo_pago_cotizacion.toString():'',
          observaciones: selectedRow.observaciones?selectedRow.observaciones:''
        }}
        onSubmit={(values) => {
          onApprove(values.id, parseInt(values.asociado_id), tipo);
          handleOnClose();
        }}
      > 
      {({handleChange, values, handleSubmit}) => (
        <ScrollView>
          <Text style={{...styles.modalTittle, color: palette.text.primary}}>Cotizaciones Solicitudes Servicio</Text>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Solicitud de Cotización:</Text>
          <TextInput
            editable={values.numero_solicitud?false:true}
            onChangeText={handleChange('numero_solicitud')}
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }}
            value={values.numero_solicitud}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Fecha Solicitud:</Text>
          <TextInput
            editable={values.fecha_solicitud_cotizacion?false:true}
            onChangeText={handleChange('fecha_solicitud_cotizacion')}
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.fecha_solicitud_cotizacion}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Asociado Negocios:</Text>
          <Picker
            selectedValue={values.asociado_id}
            numberOfLines={2}
            enabled={values.asociado_id?false:true}
            dropdownIconColor={'black'}
            style={{
              color: values.asociado_id?palette.text.hint:palette.text.primary
            }}
            // mode='dialog'
            onValueChange={handleChange('asociado_id')}
          >
            {asociados&&asociados.map((asociado) => {
              return (
                <Picker.Item
                  label={asociado.nombre}
                  value={asociado.id.toString()}
                  key={asociado.id}
                  style={{color: palette.text.primary, backgroundColor: 'white', height: 10}}
                />
              );
            })}
          </Picker>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Fecha Cotizacion:</Text>
          <TextInput
            editable={values.fecha_cotizacion?false:true}
            onChangeText={handleChange('fecha_cotizacion')} 
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.fecha_cotizacion}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Fecha Vigencia:</Text>
          <TextInput
            editable={values.fecha_vigencia_cotizacion?false:true}
            onChangeText={handleChange('fecha_vigencia_cotizacion')} 
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.fecha_vigencia_cotizacion}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Plazo de Pago(días:)</Text>
          <TextInput
            editable={values.plazo_pago_cotizacion?false:true}
            onChangeText={handleChange('plazo_pago_cotizacion')} 
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.plazo_pago_cotizacion}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Observaciones:</Text>
          <TextInput
            editable={false}
            onChangeText={handleChange('observaciones')} 
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.observaciones}/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{...styles.button, backgroundColor: palette.primary.main}}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.textStyle}>APROBAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.button, backgroundColor: palette.grayBottoms}}
              onPress={() => {
                handleOnClose();
                unSelectRow();
              }}
            >
              <Text style={styles.textStyle}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 15
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginLeft: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalLabel: {
    marginBottom: 1,
    fontSize: 10
  },
  modalTittle: {
    marginBottom: 25,
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalInput : {
    borderRadius: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
    height: 30,
    paddingBottom: 5,
    paddingLeft: 10
  }
});