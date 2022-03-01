import React, { createContext, useContext, useReducer } from 'react';
import { Dato, getCollectionParams, updateParams } from '../../interfaces/RegisterHoursInterface';
import { registerHoursReducer, RegisterHoursState } from './registerHoursReducer';
import secSellApi from '../../api/secSellApi';
import { CommonContext } from '../commonContext/CommonContext';

type RegisterHoursProps = {
  datos:         Dato[];
  selectedRow:   Dato|null;
  desde:         number;
  hasta:         number;
  por_pagina:    number;
  pagina_actual: number;
  ultima_pagina: number;
  total:         number;
  status: 'loading'|'loaded'|'refreshing'|'loadingMore';
  onGetCollection: ({}: getCollectionParams) => void;
  onShow: (selectedRow: Dato) => void;
  unSelectRow: () => void;
  onUpdate: ({}: updateParams) => void;
  onRefresh: (rowsPerPage: number) => void;
  onShowMore: (rowsPerPage: number, fechaI?: string, fechaF?: string) => void;
}

const registerHoursInitialState: RegisterHoursState = {
  status: "loading",
  selectedRow: null,
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
  datos: []
}

export const RegisterHoursContext = createContext({} as RegisterHoursProps);

export const RegisterHoursProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(registerHoursReducer, registerHoursInitialState);
  const {addError, addMessage} = useContext(CommonContext);

  const onGetCollection = async ({rowsPerPage, fechaProgFinal, fechaProgInicial, reload}: getCollectionParams) => {
    if(reload){
      dispatch({ type: 'resetStatus' })
    }
    try {
      const resp = await secSellApi.get('/ordenes-servicios/horas-trabajadas', {
        params: {
          page: 1,
          limite: rowsPerPage,
          fechaProgInicial,
          fechaProgFinal
        }
      });
      if(resp.status===200){
        dispatch({ 
          type: 'getColecction', 
          payload: resp.data
        })
      }
    } catch (e: any) {
      console.log(e.response.data);
      addError(e.response.data);
    }
  }

  const onUpdate = async ({
    id, 
    accion, 
    tipo_proceso,
    fecha_prestacion_servicio,
    hora_final_servicio,
    hora_inicio_servicio,
    observaciones_ejecucion
  }: updateParams) => {
    let params = {};
    if(tipo_proceso==='Instalación'){
      params = {
        id,
        accion,
        tipo_proceso,
        fecha_instalacion: fecha_prestacion_servicio,
        hora_inicio_instalacion: hora_inicio_servicio,
        hora_final_instalacion: hora_final_servicio,
        observaciones_ejecucion_instalacion: observaciones_ejecucion
      }
    } else {
      params = {
        id,
        accion,
        tipo_proceso,
        fecha_desinstalacion: fecha_prestacion_servicio,
        hora_inicio_desinstalacion: hora_inicio_servicio,
        hora_final_desinstalacion: hora_final_servicio,
        observaciones_ejecucion_desinstalacion: observaciones_ejecucion,
      }
    }
    try {
      const resp = await secSellApi.put('/ordenes-servicios/'+id, params);
      if(resp.status===200){
        dispatch({type: 'accept'});
        addMessage(resp.data.mensajes[0]);
        onGetCollection({rowsPerPage: 10})
      }
    } catch (e: any) {
      console.log(e.response.data);
      addError(e.response.data.mensajes[0]);
    }
  }

  const onShow = (selectedRow: Dato) => {
    dispatch({type: 'onShow', payload: selectedRow});
  }

  const unSelectRow = () => {
    dispatch({type: 'unSelectRow'});
  }

  const onRefresh = (rowsPerPage: number) => {
    dispatch({type: "refresh"});
    onGetCollection({rowsPerPage, reload: true});
  }

  const onShowMore = (rowsPerPage: number, fechaI?: string, fechaF?: string) => {
    dispatch({type: 'onShowMore'});
    onGetCollection({rowsPerPage, fechaProgFinal: fechaF, fechaProgInicial: fechaI});
  }

  return (
    <RegisterHoursContext.Provider value={{
      ...state,
      onGetCollection,
      unSelectRow,
      onUpdate,
      onRefresh,
      onShowMore,
      onShow
    }}>
      {children}
    </RegisterHoursContext.Provider>
  );
}