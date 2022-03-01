export interface CommonState {
  message: string,
  error: string
}

type CommonAction = 
  | { type: 'addMessage', payload: string }
  | { type: 'addError', payload: string }
  | { type: 'resetState' }

export const commonReducer = (state: CommonState, action: CommonAction): CommonState => {
  switch (action.type) {
    case "addError":
      return {...state,
        error: action.payload
      }
    case "addMessage":
      return {...state,
        message: action.payload
      }
    case "resetState":
      return {...state,
        message: '',
        error: '',
      }
    default:
      return state;
  }
}