import React, { useContext, useState } from 'react'
import { Formik } from 'formik';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';
import * as yup from 'yup';
import { Dato } from '../../interfaces/RegisterHoursInterface';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { RegisterHoursContext } from '../../contexts/registerHoursContext/RegisterHoursContext';

interface Props {
  selectedRow: Dato,
  handleOnClose: () => void,
}

const radioOptions = [
  {label: 'Si', value: 'S'},
  {label: 'No', value: 'N'}
];

export const RegisterHoursForm = ({selectedRow, handleOnClose}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);
  const {unSelectRow, onUpdate} = useContext(RegisterHoursContext);
  const [openPickers, setOpenPickers] = useState({
    picker1: false,
    picker2: false,
    picker3: false
  });

  const validationSchema = yup.object({
    fecha_prestacion_servicio: yup.date().required('Requerido'),
    hora_inicio_servicio: yup.string().required('Requerido'),
    hora_final_servicio: yup.
      string().
      required('Requerido')
      .test('is-greater', 'Debe ser mayor a la hora inicio', function (value) {
        const {hora_inicio_servicio} = this.parent;
        return moment(value, 'HH:mm').isSameOrAfter(
          moment(hora_inicio_servicio, 'HH:mm'),
        );
      }),
    observaciones_ejecucion: yup.string().nullable()
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
          numero_viaje: selectedRow.numero_viaje?selectedRow.numero_viaje:'',
          fecha_prestacion_servicio: selectedRow.fecha_prestacion_servicio?selectedRow.fecha_prestacion_servicio:'',
          hora_inicio_servicio: selectedRow.hora_inicio_servicio?moment(selectedRow.hora_inicio_servicio, 'HH:mm:ss').format('HH:mm'):'',
          hora_final_servicio: selectedRow.hora_final_servicio?moment(selectedRow.hora_final_servicio, 'HH:mm:ss').format('HH:mm'):'',
          observaciones_programacion: selectedRow.observaciones_programacion?selectedRow.observaciones_programacion:'',
          observaciones_ejecucion: selectedRow.observaciones_ejecucion?selectedRow.observaciones_ejecucion:'',
        }}
        onSubmit={(values) => {
          onUpdate({
            id: values.id, 
            accion: 'Reg.Horas.Trab',
            tipo_proceso: values.tipo_servicio,
            fecha_prestacion_servicio: values.fecha_prestacion_servicio,
            hora_final_servicio: values.hora_final_servicio,
            hora_inicio_servicio: values.hora_inicio_servicio,
            observaciones_ejecucion: values.observaciones_ejecucion
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
            Horas Trabajadas Rec. Técnico
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
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint}}>Serial Equipo:</Text>
              <TextInput
                editable={false}
                onChangeText={handleChange('numero_serial')} 
                style={{
                  ...styles.modalInput, 
                  color: palette.text.hint
                }} 
                value={values.numero_serial}/>
            </View>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint}}>Numero Viaje:</Text>
              <TextInput
                editable={false}
                onChangeText={handleChange('numero_viaje')} 
                style={{
                  ...styles.modalInput, 
                  color: palette.text.hint
                }} 
                value={values.numero_viaje.toString()}/>
            </View>
          </View>
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
          <Text style={{...styles.modalLabel, color: palette.text.hint, marginBottom: 2}}>Fecha Prestacion Servicio*:</Text>
          <View style={styles.inputAndPicker}>
            <View style={{width: '50%'}}>
              <TextInput
                editable={false}
                onChangeText={handleChange('fecha_prestacion_servicio')}
                placeholder={'yyyy-mm-dd'}
                placeholderTextColor={palette.text.hint}
                style={{
                  ...styles.modalInput,
                  width: '100%', 
                  color: palette.text.hint,
                  marginBottom: 1
                }} 
                value={values.fecha_prestacion_servicio}/>
              {errors.fecha_prestacion_servicio && 
                <Text style={{color: palette.secondary.main, fontSize: 7}}>
                  {errors.fecha_prestacion_servicio}
                </Text>
              }
            </View>
            <TouchableOpacity onPress={() => setOpenPickers({picker1: true, picker2: false, picker3: false})}>
              <Icon name='calendar' size={25} color={palette.primary.main} style={{paddingBottom: 10}}/>
            </TouchableOpacity>
          </View>
            <DatePicker 
              modal
              mode='date'
              locale='es'
              title={'Fecha Prestación Servicio'}
              textColor={'white'}
              open={openPickers.picker1}
              date={values.fecha_prestacion_servicio ?
                moment(values.fecha_prestacion_servicio, 'YYYY-MM-DD').toDate()
                :
                new Date()
              }
              onConfirm={(date) => {
                setFieldValue('fecha_prestacion_servicio', moment(date).format('YYYY-MM-DD'));
                setOpenPickers({picker1: false, picker2: false, picker3: false});
              }}
              onCancel={() => setOpenPickers({picker1: false, picker2: false, picker3: false})}
            />
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint, marginBottom: 2}}>Hora Inicio Servicio*:</Text>
              <View style={styles.inputAndPicker}>
                <View style={{width: '70%'}}>
                  <TextInput
                    editable={false}
                    onChangeText={handleChange('hora_inicio_servicio')} 
                    placeholder={'--:--'}
                    placeholderTextColor={palette.text.hint}
                    style={{
                      ...styles.modalInput,
                      width: '100%', 
                      color: palette.text.hint,
                      marginBottom: 1
                    }} 
                    value={values.hora_inicio_servicio}/>
                    {errors.hora_inicio_servicio && 
                      <Text style={{color: palette.secondary.main, fontSize: 7}}>
                        {errors.hora_inicio_servicio}
                      </Text>
                    }
                </View>
                <TouchableOpacity onPress={() => setOpenPickers({picker1: false, picker2: true, picker3: false})}>
                  <Icon name='time-outline' size={25} color={palette.primary.main} style={{paddingBottom: 10}}/>
                </TouchableOpacity>
              </View>
                <DatePicker 
                  modal
                  mode='time'
                  locale='es'
                  title={'Hora Inicio Servicio'}
                  textColor={'white'}
                  open={openPickers.picker2}
                  date={values.hora_inicio_servicio ?
                    moment(values.hora_inicio_servicio, 'HH:mm:ss').toDate()
                    :
                    moment('08:00:00', 'HH:mm:ss').toDate()
                  }
                  onConfirm={(date) => {
                    setFieldValue('hora_inicio_servicio', moment(date).format('HH:mm'));
                    setOpenPickers({picker1: false, picker2: false, picker3: false});
                  }}
                  onCancel={() => setOpenPickers({picker1: false, picker2: false, picker3: false})}
                />
            </View>
            <View style={styles.inputView}>
              <Text style={{...styles.modalLabel, color: palette.text.hint, marginBottom: 2}}>Hora Final Servicio*:</Text>
              <View style={styles.inputAndPicker}>
                <View style={{width: '70%'}}>
                  <TextInput
                    editable={false}
                    onChangeText={handleChange('hora_final_servicio')} 
                    placeholder={'--:--'}
                    placeholderTextColor={palette.text.hint}
                    style={{
                      ...styles.modalInput,
                      width: '100%', 
                      color: palette.text.hint,
                      marginBottom: 1
                    }} 
                    value={values.hora_final_servicio}/>
                    {errors.hora_final_servicio && 
                      <Text style={{color: palette.secondary.main, fontSize: 7, marginTop: 0}}>
                        {errors.hora_final_servicio}
                      </Text>
                    }
                </View>
                <TouchableOpacity onPress={() => setOpenPickers({picker1: false, picker2: false, picker3: true})}>
                  <Icon name='time-outline' size={25} color={palette.primary.main} style={{paddingBottom: 10}}/>
                </TouchableOpacity>
              </View>
                <DatePicker 
                  modal
                  mode='time'
                  locale='es'
                  title={'Hora Final Servicio'}
                  textColor={'white'}
                  open={openPickers.picker3}
                  date={values.hora_final_servicio ?
                    moment(values.hora_final_servicio, 'HH:mm:ss').toDate()
                    :
                    moment('08:00:00', 'HH:mm:ss').toDate()
                  }
                  onConfirm={(date) => {
                    setFieldValue('hora_final_servicio', moment(date).format('HH:mm'));
                    setOpenPickers({picker1: false, picker2: false, picker3: false});
                  }}
                  onCancel={() => setOpenPickers({picker1: false, picker2: false, picker3: false})}
                />
            </View>
          </View>
          <Text style={{...styles.modalLabel, color: palette.text.hint, marginTop: 10}}>Observaciones Ejecucion:</Text>
          <TextInput
            onChangeText={handleChange('observaciones_ejecucion')} 
            multiline
            numberOfLines={3}
            style={{
              ...styles.modalInput,
              height: values.observaciones_ejecucion.length>80?90:values.observaciones_ejecucion.length>40?60:30, 
              color: palette.text.hint
            }} 
            value={values.observaciones_ejecucion}/>
          {errors.observaciones_ejecucion&&<Text style={{color: palette.secondary.main, fontSize: 7}}>{errors.observaciones_ejecucion}</Text>}
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
  },
  inputAndPicker : {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
});