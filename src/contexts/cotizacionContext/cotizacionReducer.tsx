import { Asociado, CotizacionShow, Dato, SolicitudCotizacion, AsociadoNegocio } from '../../interfaces/CotizacionInterface';

export interface CotizacionState {
  datos:         Dato[];
  desde:         number;
  hasta:         number;
  por_pagina:    number;
  pagina_actual: number;
  ultima_pagina: number;
  total:         number;
  selectedRow: CotizacionShow|null;
  asociados: AsociadoNegocio[]|null;
  status: 'loading'|'loaded'|'refreshing';
}

type CotizacionAction = 
  | { type: 'getColecction', payload: {
    datos:         Dato[];
    desde:         number;
    hasta:         number;
    por_pagina:    number;
    pagina_actual: number;
    ultima_pagina: number;
    total:         number;
  }}
  | { type: 'approve'}
  | { type: 'resetStatus'}
  | { type: 'refresh'}
  | { type: 'unSelectRow'}
  | { type: 'getAsociados', payload: AsociadoNegocio[] }
  | { type: 'show', payload: {
    id:                          number;
    numero_cotizacion_servicio:  number;
    solicitud_cotizacion_id:     number;
    numero_solicitud_cotizacion: number;
    empresa_cotizacion:          string;
    asociado_id:                 number;
    numero_servicios_mes:        number|null;
    fecha_cotizacion:            string;
    fecha_vigencia_cotizacion:   string;
    plazo_pago_cotizacion:       number;
    numero_viajes_mes:           number;
    observaciones:               string|null;
    estado_cotizacion:           string;
    estado:                      number;
    usuario_creacion_id:         number;
    usuario_creacion_nombre:     string;
    usuario_modificacion_id:     number;
    usuario_modificacion_nombre: string;
    fecha_creacion:              string;
    fecha_modificacion:          string;
    solicitud_cotizacion:        SolicitudCotizacion;
    nombre_empresa:              string;
    asociado:                    Asociado;
  }}

export const cotizacionReducer = (state: CotizacionState, action: CotizacionAction): CotizacionState => {
  switch (action.type) {
    case "getColecction":
      return {...state,
        status: 'loaded',
        datos:         action.payload.datos,
        desde:         action.payload.desde,
        hasta:         action.payload.hasta,
        por_pagina:    action.payload.por_pagina,
        pagina_actual: action.payload.pagina_actual,
        ultima_pagina: action.payload.ultima_pagina,
        total:         action.payload.total
      }
    case "approve":
      return {
        ...state,
        selectedRow: null
      }
    case "unSelectRow":
      return {
        ...state,
        selectedRow: null
      }
    case "resetStatus":
      return {
        ...state,
        status: 'loading'
      }
    case "refresh":
      return {
        ...state,
        status: 'refreshing'
      }
    case "getAsociados":
      return {
        ...state,
        asociados: action.payload
      }
    case "show": 
      return {
        ...state,
        selectedRow: {
          id:                          action.payload.id,
          numero_cotizacion_servicio:  action.payload.numero_cotizacion_servicio,
          solicitud_cotizacion_id:     action.payload.solicitud_cotizacion_id,
          numero_solicitud_cotizacion: action.payload.numero_solicitud_cotizacion,
          empresa_cotizacion:          action.payload.empresa_cotizacion,
          asociado_id:                 action.payload.asociado_id,
          numero_servicios_mes:        action.payload.numero_servicios_mes,
          fecha_cotizacion:            action.payload.fecha_cotizacion,
          fecha_vigencia_cotizacion:   action.payload.fecha_vigencia_cotizacion,
          plazo_pago_cotizacion:       action.payload.plazo_pago_cotizacion,
          numero_viajes_mes:           action.payload.numero_viajes_mes,
          observaciones:               action.payload.observaciones,
          estado_cotizacion:           action.payload.estado_cotizacion,
          estado:                      action.payload.estado,
          usuario_creacion_id:         action.payload.usuario_creacion_id,
          usuario_creacion_nombre:     action.payload.usuario_creacion_nombre,
          usuario_modificacion_id:     action.payload.usuario_modificacion_id,
          usuario_modificacion_nombre: action.payload.usuario_modificacion_nombre,
          fecha_creacion:              action.payload.fecha_creacion,
          fecha_modificacion:          action.payload.fecha_modificacion,
          solicitud_cotizacion:        action.payload.solicitud_cotizacion,
          nombre_empresa:              action.payload.nombre_empresa,
          asociado:                    action.payload.asociado,
        }
      }
    default:
      return state;
  }
}