import React, { createContext, useContext, useReducer } from "react";
import secSellApi from '../../api/secSellApi';
import { CotizacionShow, Dato, getCollectionParams, AsociadoNegocio } from '../../interfaces/CotizacionInterface';
import { cotizacionReducer, CotizacionState } from "./cotizacionReducer";
import { CommonContext } from '../commonContext/CommonContext';

type CotizacionContextProps = {
  datos:         Dato[];
  selectedRow: CotizacionShow|null;
  asociados: AsociadoNegocio[]|null;
  desde:         number;
  hasta:         number;
  por_pagina:    number;
  pagina_actual: number;
  ultima_pagina: number;
  total:         number;
  status: 'loading'|'loaded'|'refreshing';
  onGetCollection: (params: getCollectionParams) => void;
  onApprove: (id: number, asociado_id: number, tipo: string) => void;
  onShow: (id: number, tipo: string) => void;
  onRefresh: (rowsPerPage: number) => void;
  unSelectRow: () => void;
  getAsociados: () => void;
}

const cotizacionInitialState: CotizacionState = {
  status: "loading",
  selectedRow: null,
  asociados: null,
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
  datos: []
}

export const CotizacionContext = createContext({} as CotizacionContextProps);

export const CotizacionProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(cotizacionReducer, cotizacionInitialState);
  const {addError, addMessage} = useContext(CommonContext);

  const onGetCollection = async ({currentPage, rowsPerPage, reload}: getCollectionParams) => {
    try {
      if(reload) {dispatch({type: "resetStatus"})}
      const resp = await secSellApi.get('/cotizaciones-servicios', {
        params: {
          todos: true,
          page: currentPage,
          limite: rowsPerPage,
          estados: 'ENV',
        }
      });
      if(resp.status===200){
        dispatch({type: "getColecction", payload: resp.data})
      } 
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  const onShow = async (id: number, tipo: string) => {
    try {
      if(tipo==='Servicios'){
        const resp = await secSellApi.get('cotizaciones-servicios/'+id);
        if(resp.status===200){
          dispatch({type: "show", payload: {
            asociado: resp.data.id,
            solicitud_cotizacion: resp.data.solicitud_cotizacion,
            solicitud_cotizacion_id: resp.data.solicitud_cotizacion_id,
            nombre_empresa: resp.data.nombre_empresa,
            numero_cotizacion_servicio: resp.data.numero_cotizacion_servicio,
            numero_servicios_mes: resp.data.numero_servicios_mes,
            numero_solicitud_cotizacion: resp.data.numero_solicitud_cotizacion,
            numero_viajes_mes: resp.data.numero_viajes_mes,
            empresa_cotizacion: resp.data.empresa_cotizacion,
            asociado_id: resp.data.asociado_id,
            estado: resp.data.estado,
            estado_cotizacion: resp.data.estado_cotizacion,
            fecha_cotizacion: resp.data.fecha_cotizacion,
            fecha_creacion: resp.data.fecha_creacion,
            fecha_modificacion: resp.data.fecha_modificacion,
            fecha_vigencia_cotizacion: resp.data.fecha_vigencia_cotizacion,
            id: resp.data.id,
            observaciones: resp.data.observaciones,
            plazo_pago_cotizacion: resp.data.plazo_pago_cotizacion,
            usuario_creacion_id: resp.data.usuario_creacion_id,
            usuario_creacion_nombre: resp.data.usuario_creacion_nombre,
            usuario_modificacion_id: resp.data.usuario_modificacion_id,
            usuario_modificacion_nombre: resp.data.usuario_modificacion_nombre
          }})
        }
      } else {
        const resp = await secSellApi.get('cotizaciones-productos/'+id);
        if(resp.status===200){
          dispatch({type: "show", payload: {
            asociado: resp.data.id,
            solicitud_cotizacion: resp.data.solicitud_cotizacion,
            solicitud_cotizacion_id: resp.data.solicitud_cotizacion_id,
            nombre_empresa: resp.data.nombre_empresa,
            numero_cotizacion_servicio: resp.data.numero_cotizacion_servicio,
            numero_servicios_mes: resp.data.numero_servicios_mes,
            numero_solicitud_cotizacion: resp.data.numero_solicitud_cotizacion,
            numero_viajes_mes: resp.data.numero_viajes_mes,
            empresa_cotizacion: resp.data.empresa_cotizacion,
            asociado_id: resp.data.asociado_id,
            estado: resp.data.estado,
            estado_cotizacion: resp.data.estado_cotizacion,
            fecha_cotizacion: resp.data.fecha_cotizacion,
            fecha_creacion: resp.data.fecha_creacion,
            fecha_modificacion: resp.data.fecha_modificacion,
            fecha_vigencia_cotizacion: resp.data.fecha_vigencia_cotizacion,
            id: resp.data.id,
            observaciones: resp.data.observaciones,
            plazo_pago_cotizacion: resp.data.plazo_pago_cotizacion,
            usuario_creacion_id: resp.data.usuario_creacion_id,
            usuario_creacion_nombre: resp.data.usuario_creacion_nombre,
            usuario_modificacion_id: resp.data.usuario_modificacion_id,
            usuario_modificacion_nombre: resp.data.usuario_modificacion_nombre
          }})
        }
      }
    } catch(e: any) {
      console.log(e.response.data);
    }
  }

  const unSelectRow = () => {
    dispatch({type: "unSelectRow"});
  }

  const getAsociados = async () => {
    try {
      const resp = await secSellApi.get('/asociados-negocio',{
        params: {
          ligera: true
        }
      });
      if(resp.status===200){
        resp.data.forEach((data: AsociadoNegocio) => {
          dispatch({type: "getAsociados", payload: resp.data})
        })
      }
    } catch(e: any) {
      console.log(e.response.data);
    }
  }

  const onApprove = async (id: number, asociado_id: number, tipo: string) => {
    try {
      if(tipo==='Servicios'){
        const resp = await secSellApi.post('/cotizaciones-servicios/aprobar/'+id, {
          params: {
            id,
            asociado_id
          },
        });
        if(resp.status===200){
          dispatch({type: "approve"});
          addMessage(resp.data.mensajes[0]);
          onGetCollection({currentPage: 1, rowsPerPage: 10});
        }
      } else {
        const resp = await secSellApi.post('/cotizaciones-productos/aprobar/'+id, {
          params: {
            id,
            asociado_id
          }
        });
        if(resp.status===200){
          dispatch({type: "approve"});
          addMessage(resp.data.mensajes[0]);
          onGetCollection({currentPage: 1, rowsPerPage: 10});
        }
      }
    } catch (e: any) {
      console.log(e.response.data);
      addError(e.response.data.mensajes);
    }
  }

  const onRefresh = (rowsPerPage: number) => {
    dispatch({type: "refresh"});
    onGetCollection({currentPage: 1, rowsPerPage});
  }

  return (
    <CotizacionContext.Provider value={{
      ...state,
      onGetCollection,
      onShow,
      getAsociados,
      onApprove,
      onRefresh,
      unSelectRow
    }}>
      {children}
    </CotizacionContext.Provider>
  );
}