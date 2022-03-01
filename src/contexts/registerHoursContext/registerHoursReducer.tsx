import { Dato } from "../../interfaces/RegisterHoursInterface"

export interface RegisterHoursState {
  datos:         Dato[];
  desde:         number;
  hasta:         number;
  por_pagina:    number;
  pagina_actual: number;
  ultima_pagina: number;
  total:         number;
  selectedRow:   Dato|null;
  status: 'loading'|'loaded'|'refreshing'|'loadingMore';
}

type RegisterHoursAction = 
  | { type: 'getColecction', payload: {
  datos:         Dato[];
  desde:         number;
  hasta:         number;
  por_pagina:    number;
  pagina_actual: number;
  ultima_pagina: number;
  total:         number;
  }}
  | { type: 'accept'}
  | { type: 'resetStatus'}
  | { type: 'refresh'}
  | { type: 'unSelectRow'}
  | { type: 'onShowMore'}
  | { type: 'onShow', payload: Dato}

export const registerHoursReducer = (state: RegisterHoursState, action: RegisterHoursAction): RegisterHoursState => {
  switch (action.type) {
    case "getColecction":
      return {...state,
        status:        'loaded',
        datos:         action.payload.datos,
        desde:         action.payload.desde,
        hasta:         action.payload.hasta,
        por_pagina:    action.payload.por_pagina,
        pagina_actual: action.payload.pagina_actual,
        ultima_pagina: action.payload.ultima_pagina,
        total:         action.payload.total
      }
    case "resetStatus":
      return {
        ...state,
        status: 'loading'
      }
    case "onShow":
      return {
        ...state,
        selectedRow: action.payload
      }
    case "refresh":
      return {
        ...state,
        status: 'refreshing'
      }
    case "onShowMore":
      return {
        ...state,
        status: 'loadingMore'
      }
    case "accept":
    case "unSelectRow":
      return {
        ...state,
        selectedRow: null
      }
    default:
      return state;
  }
}