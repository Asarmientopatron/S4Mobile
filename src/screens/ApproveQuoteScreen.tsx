import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { CotizacionContext } from '../contexts/cotizacionContext/CotizacionContext';
import { TitleOption } from '../components/Options/TitleOption';
import { optionStyles } from '../theme/OptionTheme';
import { Cell } from '../interfaces/CellInterface';
import { Table } from '../components/Options/Table';
import { AuthContext } from '../contexts/authContext/AuthContext';
import { MessageModal } from '../components/Common/MessageModal';
import { ShowMore } from '../components/Common/ShowMore';
import moment from 'moment';
import env from '../env';

const cells: Cell[] = [
  {
    id: 'numero_solicitud',
    label: 'Numero Solicitud',
    value: (value) => value,
    align: 'right',
    numberOfLines: 2
  },
  {
    id: 'fecha_solicitud_cotizacion',
    label: 'Fecha de Solicitud',
    value: (value) => moment(value, 'YYYY-MM-DD').format('DD-MM-YYYY'),
    align: 'left',
    numberOfLines: 2
  },
  {
    id: 'tipo_cotizacion',
    label: 'Tipo',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'numero_cotizacion_servicio',
    label: 'Numero Cotizacion',
    value: (value) => value,
    align: 'right',
    numberOfLines: 2
  },
  {
    id: 'fecha_cotizacion',
    label: 'Fecha de Cotizacion',
    value: (value) => moment(value, 'YYYY-MM-DD').format('DD-MM-YYYY'),
    align: 'left',
    numberOfLines: 2
  },
];

interface Props extends DrawerScreenProps<any, any>{};

export const ApproveQuoteScreen = ({route}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);
  const [totalRows, setTotalRows] = useState(10);
  const {user} = useContext(AuthContext);
  const {status, datos, onGetCollection, total, onRefresh} = useContext(CotizacionContext);

  useEffect(() => {
    onGetCollection({currentPage: 1, rowsPerPage: totalRows, reload: true});
    getPermisos();
  }, [totalRows]);

  const onShowMore = () => {
    const newTotal = totalRows + 10;
    setTotalRows(newTotal);
  }

  const onRefreshing = () => {
    setTotalRows(10);
    onRefresh(10);
  }

  const getPermisos = () => {
    let permisos: string[] = [];
    user?.permisos.forEach((permiso) => {
      if(permiso.id === env.idAppMovil){
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
  }

  if(status==='loading'){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size={100}
        />
      </View>
    );
  }
  
  return (
    <ScrollView 
      style={optionStyles.globalMargin}
      refreshControl={
        <RefreshControl
          refreshing={status==='refreshing'?true:false}
          onRefresh={onRefreshing}
        />
      }
    >
      <View style={{...optionStyles.mainContainer, backgroundColor: palette.background.paper}}>
        <TitleOption title={'Aprobacion Cotizaciones'}/>
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          { datos.length > 0 ? (
            <>
              <Table cells={cells} rows={datos} permisos={getPermisos()}/>
              {total > totalRows &&
                <ShowMore status={status} onShowMore={onShowMore}/>
              }
            </>
          ) :
            <Text style={{color: palette.text.primary}}>Sin Resultados</Text>
          }
        </View>
      </View>
      <MessageModal />
    </ScrollView>
  );  
};
