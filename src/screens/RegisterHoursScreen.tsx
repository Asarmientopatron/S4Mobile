import { DrawerScreenProps } from '@react-navigation/drawer';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../contexts/authContext/AuthContext';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { Cell } from '../interfaces/CellInterface';
import * as yup from 'yup';
import { optionStyles } from '../theme/OptionTheme';
import { TitleOption } from '../components/Options/TitleOption';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { MessageModal } from '../components/Common/MessageModal';
import { ShowMore } from '../components/Common/ShowMore';
import { RegisterHoursContext } from '../contexts/registerHoursContext/RegisterHoursContext';
import { LoadingScreen } from './LoadingScreen';
import { Table } from '../components/RegisterHours/Table';

const cells: Cell[] = [
  {
    id: 'numero_orden_servicio',
    label: 'Orden de Servicio',
    value: (value) => value,
    align: 'right',
    width: 3
  },
  {
    id: 'asociado',
    label: 'Nombre',
    value: (value) => value,
    align: 'left',
    width: 0.5
  },
  {
    id: 'tipo_servicio',
    label: 'Tipo de Servicio',
    value: (value) => value,
    align: 'left',
    width: 1
  },
  {
    id: 'fecha_programada',
    label: 'Fecha Prog.',
    value: (value) => moment(value, 'YYYY-MM-DD').format('DD-MM-YYYY'),
    align: 'left',
    width: 0.2
  },
  {
    id: 'hora_programada',
    label: 'Hora Prog.',
    value: (value) => value,
    align: 'left',
    width: 0.5
  },
];

interface Props extends DrawerScreenProps<any, any>{};
const dataPerPage = 10;

export const RegisterHoursScreen = ({route}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);
  const {user} = useContext(AuthContext);
  const {status, onGetCollection, datos, total, onRefresh, onShowMore} = useContext(RegisterHoursContext);
  const [openPicker, setOpenPicker] = useState(false);
  const [openPicker2, setOpenPicker2] = useState(false);
  const [totalRows, setTotalRows] = useState(10);

  useEffect(() => {
    onGetCollection({rowsPerPage: totalRows, reload: true});
    getPermisos();
  },[]);

  useEffect(() => {
    if (datos.length>10) {
      setTotalRows(totalRows + dataPerPage);
    }
  }, [datos.length]);

  const onShowingMore = (fechaI?: string, fechaF?: string) => {
    const newTotal = totalRows + dataPerPage;
    onShowMore(newTotal, fechaI, fechaF);
  }

  const onRefreshing = () => {
    onRefresh(dataPerPage);
    setTotalRows(10);
  }

  const getPermisos = () => {
    let permisos: string[] = [];
    user?.permisos.forEach((permiso) => {
      if(permiso.nombre === 'Aplicación Móvil'){
        permiso.opciones.forEach((opcion) => {
          if(opcion.url===route.name){
            opcion.permisos.forEach((opcPermiso, index) => {
              if(opcPermiso.permitido){
                permisos[index] = opcPermiso.titulo;
              }
            })
          }
        })
      }
    })
    return permisos;
  };

  const validationSchema = yup.object().shape({
    fechaInicial: yup
      .date()
      .nullable()
      .when('fechaFinal', {
        is: (fechaFinal: any) => !fechaFinal,
        then: yup.date().nullable(),
        otherwise: yup
          .date()
          .required(
            'Requerida',
          ),
      }),
    fechaFinal: yup
      .date()
      .nullable()
      .when('fechaInicial', {
        is: (fechaInicial: any) => !fechaInicial,
        then: yup.date().nullable(),
        otherwise: yup
          .date()
          .required(
            'Requerida',
          )
          .min(
            yup.ref('fechaInicial'),
            'Debe ser mayor que inicial',
          ),
      }),
  },
    [
      ['fechaFinal', 'fechaInicial']
    ],
  );

  return (
    status === 'loading' ?
    <LoadingScreen/>
    :
    <ScrollView
      style={optionStyles.globalMargin}
      refreshControl={
        <RefreshControl
          refreshing={status==='refreshing'?true:false}
          onRefresh={onRefreshing}
        />
      }
    >
      <View style={{...optionStyles.mainContainer, backgroundColor: palette.background.default}}>
        <TitleOption title='Registro Horas Trabajadas'/>
        <Formik
          validationSchema={validationSchema}
          validateOnBlur={false}
          initialValues={{
            fechaInicial: '',
            fechaFinal: '',
          }}
          onSubmit={(values)=> {
            if(values.fechaFinal&&values.fechaInicial){
              onGetCollection({
                rowsPerPage: totalRows, 
                fechaProgInicial: moment(values.fechaInicial, 'DD-MM-YYYY').format('YYYY-MM-DD'), 
                fechaProgFinal: moment(values.fechaFinal, 'DD-MM-YYYY').format('YYYY-MM-DD')
              });
            }
          }}
        >
          {({handleChange, values, handleSubmit, setFieldValue, errors, isSubmitting}) => (
            <>
              <View style={styles.headerContainer}>
                <View style={styles.filterContainer}>
                  <View style={styles.filterRow}>
                    <Text style={{color: palette.text.primary}}>Fecha Prog. Inicial:</Text>
                    <View style={styles.inputAndPicker}>
                      <View>
                        <TextInput 
                          value={values.fechaInicial}
                          editable={false}
                          placeholder={'dd-mm-aaaa'}
                          placeholderTextColor={palette.text.hint}
                          onChangeText={handleChange('fechaInicial')}
                          style={{color: palette.text.hint, height: 35, padding: 2}}
                        />
                        {errors.fechaInicial&&<Text style={{color: palette.secondary.main, fontSize: 7}}>{errors.fechaInicial}</Text>}
                      </View>
                      <TouchableOpacity onPress={() => setOpenPicker(true)}>
                        <Icon name='calendar' size={25} color={palette.primary.main}/>
                      </TouchableOpacity>
                      <DatePicker 
                        modal
                        mode='date'
                        locale='es'
                        title={'Fecha Prog Inicial'}
                        textColor={'white'}
                        open={openPicker}
                        date={new Date()}
                        onConfirm={(date) => {
                          setFieldValue('fechaInicial', date.toLocaleDateString('es-CL'));
                          setOpenPicker(false);
                        }}
                        onCancel={() => setOpenPicker(false)}
                      />
                    </View>
                  </View>
                  <View style={styles.filterRow}>
                    <Text style={{color: palette.text.primary}}>Fecha Prog. Final:  </Text>
                    <View style={styles.inputAndPicker}>
                      <View>
                        <TextInput 
                          value={values.fechaFinal}
                          editable={false}
                          placeholder={'dd-mm-aaaa'}
                          placeholderTextColor={palette.text.hint}
                          onChangeText={handleChange('fechaFinal')}
                          style={{color: palette.text.hint, height: 35, padding: 2}}
                        />
                        {errors.fechaFinal&&<Text style={{color: palette.secondary.main, fontSize: 7}}>{errors.fechaFinal}</Text>}
                      </View>
                      <TouchableOpacity onPress={() => setOpenPicker2(true)}>
                        <Icon name='calendar' size={25} color={palette.primary.main}/>
                      </TouchableOpacity>
                      <DatePicker 
                        modal
                        mode='date'
                        locale='es'
                        title={'Fecha Prog Final'}
                        textColor={'white'}
                        open={openPicker2}
                        date={new Date()}
                        onConfirm={(date) => {
                          setFieldValue('fechaFinal', date.toLocaleDateString('es-CL'))
                          setOpenPicker2(false)
                        }}
                        onCancel={() => setOpenPicker2(false)}
                      />
                    </View>
                  </View> 
                </View>
                <TouchableOpacity 
                  style={styles.searchContainer}
                  onPress={handleSubmit}
                >
                  <Icon name='search-circle' size={45} color={palette.primary.main}/>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 20, alignItems: 'center'}}>
                { datos.length > 0 ? (
                  <>
                  <Table cells={cells} rows={datos} permisos={getPermisos()}/>
                    {total > totalRows &&
                      <ShowMore status={status} onShowMore={() => {
                        if(values.fechaFinal&&values.fechaInicial&&isSubmitting){
                          onShowingMore(values.fechaInicial, values.fechaFinal);
                        } else {
                          onShowingMore();
                        }
                      }}/>
                    }
                  </>
                ) : 
                  <Text style={{color: palette.text.primary}}>Sin Resultados</Text>
                }
              </View>
            </>
          )}
        </Formik>
      </View>
      <MessageModal />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  filterContainer: {
    width: '80%',
    paddingHorizontal: 10
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputAndPicker : {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});