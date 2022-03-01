import React, { useContext } from 'react'
import { Formik } from 'formik';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';
import * as yup from 'yup';
import { Dato } from '../../interfaces/AcceptServiceInterface';
import { AcceptServiceContext } from '../../contexts/acceptServiceContext/AcceptServiceContext';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

interface Props {
  selectedRow: Dato,
  handleOnClose: () => void,
}

const radioOptions = [
  {label: 'Si', value: 'S'},
  {label: 'No', value: 'N'}
];

export const AcceptServiceForm = ({selectedRow, handleOnClose}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);
  const {unSelectRow, onUpdate} = useContext(AcceptServiceContext);

  const validationSchema = yup.object({
    acepta_servicio: yup.string().required('Requerido'),
    observaciones_rechazo: yup
      .string()
      .when('acepta_servicio', {
        is: (acepta_servicio: string) => acepta_servicio==='N',
        then: yup.string().required('Debe especificar motivo de rechazo'),
        otherwise: yup.string().nullable()
      })
  });

  return (
    <View>  
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          id: selectedRow.id,
          numero_orden_servicio: selectedRow.numero_orden_servicio?selectedRow.numero_orden_servicio:'',
          asociado: selectedRow.asociado?selectedRow.asociado:'',
          tipo_servicio: selectedRow.tipo_servicio?selectedRow.tipo_servicio:'',
          fecha_programada: selectedRow.fecha_programada?selectedRow.fecha_programada:'',
          hora_programada: selectedRow.hora_programada?selectedRow.hora_programada:'',
          ciudad: selectedRow.ciudad?selectedRow.ciudad:'',
          lugar: selectedRow.lugar?selectedRow.lugar:'',
          direccion: selectedRow.direccion?selectedRow.direccion:'',
          numero_serial: selectedRow.numero_serial?selectedRow.numero_serial:'',
          observaciones_programacion: selectedRow.observaciones_programacion?selectedRow.observaciones_programacion:'',
          acepta_servicio: selectedRow.indicativo_aceptacion?
            (selectedRow.indicativo_aceptacion==='A'?
              'S'
              :
              (selectedRow.indicativo_aceptacion==='R'?
                'N'
                :
                ''
              )
            )
            :
            '',
          observaciones_rechazo: selectedRow.observaciones_rechazo?selectedRow.observaciones_rechazo:'',
        }}
        onSubmit={(values) => {
          onUpdate({
            id: values.id, 
            accion: values.acepta_servicio==='S'?'Aceptar':'Rechazar',
            indicativo_aceptacion: values.acepta_servicio==='S'?'A':'R',
            observaciones_rechazo: values.observaciones_rechazo,
            tipo_proceso: values.tipo_servicio
          })
          handleOnClose();
        }}
      > 
      {({handleChange, values, handleSubmit, setFieldValue, errors}) => (
        <ScrollView>
          <Text
            style={{...styles.modalTittle, color: palette.text.primary}} 
            numberOfLines={1} 
            adjustsFontSizeToFit
          >
            Aceptacion Orden Servicio Rec. Técnico
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint}}>Nro. Orden de Servicio:</Text>
              <TextInput
                editable={false}
                onChangeText={handleChange('numero_orden_servicio')}
                style={{
                  ...styles.modalInput, 
                  color: palette.text.hint
                }}
                value={values.numero_orden_servicio.toString()}/>
            </View>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint}}>Tipo Servicio:</Text>
              <TextInput
                editable={false}
                onChangeText={handleChange('tipo_servicio')}
                style={{
                  ...styles.modalInput, 
                  color: palette.text.hint
                }} 
                value={values.tipo_servicio}/>
            </View>
          </View>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Asociado Negocios:</Text>
          <TextInput
            editable={false}
            onChangeText={handleChange('asociado')}
            multiline
            numberOfLines={2}
            style={{
              ...styles.modalInput, 
              height: values.asociado.length>40?60:30,
              color: palette.text.hint
            }} 
            value={values.asociado}/>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint}}>Fecha Programada:</Text>
              <TextInput
                editable={false}
                onChangeText={handleChange('fecha_programada')} 
                style={{
                  ...styles.modalInput, 
                  color: palette.text.hint
                }} 
                value={values.fecha_programada}/>
            </View>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint}}>Hora Programada:</Text>
              <TextInput
                editable={false}
                onChangeText={handleChange('hora_programada')} 
                style={{
                  ...styles.modalInput, 
                  color: palette.text.hint
                }} 
                value={values.hora_programada}/>
            </View>
          </View>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Ciudad:</Text>
          <TextInput
            editable={false}
            onChangeText={handleChange('ciudad')} 
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.ciudad}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Nombre Lugar:</Text>
          <TextInput
            editable={false}
            onChangeText={handleChange('lugar')} 
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.lugar}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Direccion Lugar:</Text>
          <TextInput
            editable={false}
            onChangeText={handleChange('direccion')} 
            multiline
            numberOfLines={2}
            style={{
              ...styles.modalInput, 
              height: values.direccion.length>40?60:30,
              color: palette.text.hint
            }} 
            value={values.direccion}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Serial Equipo:</Text>
          <TextInput
            editable={false}
            onChangeText={handleChange('numero_serial')} 
            style={{
              ...styles.modalInput, 
              color: palette.text.hint
            }} 
            value={values.numero_serial}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint}}>Observaciones Programacion:</Text>
          <TextInput
            editable={false}
            multiline
            numberOfLines={3}
            onChangeText={handleChange('observaciones_programacion')} 
            style={{
              ...styles.modalInput, 
              height: values.observaciones_programacion.length>80?90:values.observaciones_programacion.length>40?60:30,
              color: palette.text.hint
            }} 
            value={values.observaciones_programacion}/>
          <Text style={{...styles.modalLabel, color: palette.text.hint, marginBottom: 10}}>Acepta Servicio*:</Text>
          <RadioForm
            formHorizontal
            animation
          > 
            {radioOptions.map((radio, index) => {
              return (
                <RadioButton
                  labelHorizontal key={index}
                >
                  <RadioButtonInput
                    index={index}
                    obj={radio}
                    onPress={() => setFieldValue('acepta_servicio', radio.value)}
                    buttonSize={20}
                    isSelected={values.acepta_servicio===radio.value}
                    buttonInnerColor={palette.primary.main}
                    buttonOuterColor={'gray'}
                    buttonOuterSize={30}
                  />
                  <RadioButtonLabel
                    obj={radio}
                    index={index}
                    labelHorizontal
                    labelStyle={{fontSize: 15, color: palette.text.primary}}
                    labelWrapStyle={{marginRight: 5}} 
                  />
                </RadioButton>
              );
            })}
          </RadioForm>
          {errors.acepta_servicio&&<Text style={{color: palette.secondary.main, fontSize: 7}}>{errors.acepta_servicio}</Text>}
          <Text style={{...styles.modalLabel, color: palette.text.hint, marginTop: 10}}>Causa Rechazo:</Text>
          <TextInput
            onChangeText={handleChange('observaciones_rechazo')} 
            multiline
            numberOfLines={3}
            style={{
              ...styles.modalInput,
              height: values.observaciones_rechazo.length>80?90:values.observaciones_rechazo.length>40?60:30, 
              color: palette.text.hint
            }} 
            value={values.observaciones_rechazo}/>
          {errors.observaciones_rechazo&&<Text style={{color: palette.secondary.main, fontSize: 7}}>{errors.observaciones_rechazo}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{...styles.button, backgroundColor: palette.primary.main}}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.textStyle}>GUARDAR</Text>
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
    marginTop: 10,
    marginBottom: 5,
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputView: {
    width: '50%'
  }
});