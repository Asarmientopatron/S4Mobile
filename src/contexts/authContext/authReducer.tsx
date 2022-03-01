import { Usuario } from "../../interfaces/AuthInterface";

export interface AuthState {
  status: 'checking'|'authenticated'|'not-authenticated';
  token_type: string|null | undefined;
  expires_in: number|null | undefined;
  access_token: string|null | undefined;
  refresh_token: string|null | undefined;
  data: string|null | undefined;
  messages: string|string[]|null|undefined;
  user: Usuario|null;
}

type AuthAction = 
  | { type: 'signIn', payload: {
    token_type: string|null|undefined;
    expires_in: number|null|undefined;
    access_token: string|null|undefined;
    refresh_token: string|null|undefined;
    data: string|null|undefined;
    messages: string|string[]|null|undefined}}
  | { type: 'getSession', payload: {
    user: Usuario
  }}
  | { type: 'addError', payload: string}
  | { type: 'removeError'}
  | { type: 'notAuthenticated'}
  | { type: 'logout'}
  | { type: 'setToken', payload: {
    access_token: string
  }}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "addError":
      return {...state,
        status: 'not-authenticated',
        messages: action.payload,
        access_token: null
      }
    case "removeError":
      return {
        ...state,
        messages: ''
      }
    case "signIn": 
      return {
        ...state,
        messages: '',
        status: 'authenticated',
        access_token: action.payload.access_token,
        token_type: action.payload.token_type,
        expires_in: action.payload.expires_in,
        refresh_token: action.payload.refresh_token,
      }
    case "getSession": 
      return {
        ...state,
        user: action.payload.user,
      }
    case "logout":
    case "notAuthenticated":
      return {
        ...state,
        status: "not-authenticated",
        access_token: null,
        token_type: null,
        expires_in:    null,
        refresh_token: null,
        user: null
      }
    case "setToken": 
      return {
        ...state,
        messages: '',
        status: 'authenticated',
        access_token: action.payload.access_token,
      }
    default:
      return state;
  }
}