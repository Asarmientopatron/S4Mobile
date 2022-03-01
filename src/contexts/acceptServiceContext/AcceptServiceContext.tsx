import React, { createContext, useContext, useReducer } from 'react';
import { Dato, getCollectionParams, updateParams } from '../../interfaces/AcceptServiceInterface';
import { acceptServiceReducer, AcceptServiceState } from './acceptServiceReducer';
import secSellApi from '../../api/secSellApi';
import { CommonContext } from '../commonContext/CommonContext';

type AcceptServiceProps = {
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

const acceptServiceInitialState: AcceptServiceState = {
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

export const AcceptServiceContext = createContext({} as AcceptServiceProps);

export const AcceptServiceProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(acceptServiceReducer, acceptServiceInitialState);
  const {addError, addMessage} = useContext(CommonContext);

  const onGetCollection = async ({rowsPerPage, fechaProgFinal, fechaProgInicial, reload}: getCollectionParams) => {
    if(reload){
      dispatch({ type: 'resetStatus' })
    }
    try {
      const resp = await secSellApi.get('/ordenes-servicios/aceptacion', {
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

  const onShow = (selectedRow: Dato) => {
    dispatch({type: 'onShow', payload: selectedRow});
  }

  const unSelectRow = () => {
    dispatch({type: 'unSelectRow'});
  }

  const onUpdate = async ({
    id, 
    accion, 
    tipo_proceso, 
    indicativo_aceptacion, 
    observaciones_rechazo
  }: updateParams) => {
    let params = {};
    if(tipo_proceso==='Instalación'){
      params = {
        id,
        accion,
        tipo_proceso,
        indicativo_aceptacion_instalacion: indicativo_aceptacion,
        observaciones_rechazo_instalacion: observaciones_rechazo
      }
    } else {
      params = {
        id,
        accion,
        tipo_proceso,
        indicativo_aceptacion_desinstalacion: indicativo_aceptacion,
        observaciones_rechazo_desinstalacion: observaciones_rechazo
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

  const onRefresh = (rowsPerPage: number) => {
    dispatch({type: "refresh"});
    onGetCollection({rowsPerPage, reload: true});
  }

  const onShowMore = (rowsPerPage: number, fechaI?: string, fechaF?: string) => {
    dispatch({type: 'onShowMore'});
    onGetCollection({rowsPerPage, fechaProgFinal: fechaF, fechaProgInicial: fechaI});
  }

  return (
    <AcceptServiceContext.Provider value={{
      ...state,
      onGetCollection,
      unSelectRow,
      onUpdate,
      onRefresh,
      onShowMore,
      onShow
    }}>
      {children}
    </AcceptServiceContext.Provider>
  );
}