import React, { createContext, useReducer } from 'react';
import { commonReducer } from './commonReducer';

type CommonContextProps = {
  message: string,
  error: string,
  addMessage: (message: string) => void,
  addError: (error: string) => void,
  resetState: () => void,
}

export const commonInitialState = {
  message: '',
  error: ''
}

export const CommonContext = createContext({} as CommonContextProps);

export const CommonProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(commonReducer, commonInitialState);

  const addMessage = (message: string) => {
    dispatch({type: 'addMessage', payload: message})
  }

  const addError = (error: string) => {
    dispatch({type: 'addError', payload: error})
  }

  const resetState = () => {
    dispatch({type: 'resetState'})
  }

  return (
    <CommonContext.Provider value={{
      ...state,
      addMessage,
      addError,
      resetState
    }}>
      {children}
    </CommonContext.Provider>
  );
}