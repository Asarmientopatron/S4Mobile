import { Dato } from "../../interfaces/AcceptServiceInterface";

export interface AcceptServiceState {
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

type AcceptServiceAction = 
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

export const acceptServiceReducer = (state: AcceptServiceState, action: AcceptServiceAction): AcceptServiceState => {
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
    case "onShowMore":
      return {
        ...state,
        status: 'loadingMore'
      }
    case "refresh":
      return {
        ...state,
        status: 'refreshing'
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