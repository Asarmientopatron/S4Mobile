import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, loginData, Login, Session } from '../../interfaces/AuthInterface';
import { authReducer, AuthState } from "./authReducer";
import secSellApi from '../../api/secSellApi';

type AuthContextProps = {
  token_type:    string|null|undefined;
  expires_in:    number|null|undefined;
  access_token:  string|null|undefined;
  refresh_token: string|null|undefined;
  data:     string|null|undefined;
  messages: string|string[]|null|undefined;
  user: Usuario|null;
  status: 'checking'|'authenticated'|'not-authenticated';
  signIn: (loginData: loginData) => void;
  logout: () => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  status: "checking",
  messages: '',
  access_token: null,
  user: null,
  token_type: null,
  expires_in: null,
  refresh_token: null,
  data: null
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    getToken();
  },[])

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@secSellApiToken');
      if(!token) return dispatch({type: "notAuthenticated"});
      dispatch({type: "setToken", payload: {
        access_token: 'Bearer '+token,
      }});
      getSession(token);
    } catch(e) {
      console.log(e);
    }
  }

  const signIn = async ({username, password}: loginData) => {
    try {
      const resp = await secSellApi.post<Login>('/users/token', {
        username,
        password
      });
      dispatch({type: "signIn", payload: {
        access_token: resp.data.access_token,
        refresh_token: resp.data.refresh_token,
        expires_in: resp.data.expires_in,
        data: resp.data.data,
        messages: resp.data.messages,
        token_type: resp.data.token_type
      }});
      await AsyncStorage.setItem('@secSellApiToken', resp.data.access_token!)
      getSession(resp.data.access_token!);
    } catch (error: any) {
      dispatch({type: "addError", payload: error.response.data.messages})
    }
  };

  const logout = () => {
    dispatch({type: "logout"});
    removeToken();
  };

  const removeError = () => {
    dispatch({type: "removeError"})
  };

  const getSession = async (token: string) => {
    try {
      const resp = await secSellApi.get<Session>('/users/current/session', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: 'Bearer '+token
        }
      });
      dispatch({type: "getSession", payload: {
        user: resp.data.usuario
      }})
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@secSellApiToken');
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      logout,
      removeError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}