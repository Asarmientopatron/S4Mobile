import { Theme } from "@react-navigation/native"

type ThemeAction = 
   | { type: 'set_light_theme' }

export interface ThemeState extends Theme {
   currentTheme: 'light'|'dark',
   dividerColor: string,
   palette: {
    grayBottoms: string, 
    redBottoms: string,
    colorHover: string,
    enviaEmailBottoms: string,
    background: {
      paper: string,
      default: string,
    },
    primary: {
      main: string,
      contrastText: string,
    },
    secondary: {
      main: string,
    },
    sidebar: {
      bgColor: string,
      textColor: string,
      fontSize: string,
      fontWeight: string,
    },
    text: {
      primary: string,
      secondary: string,
      disabled: string,
      hint: string,
      white: string,
    },
    boxes: {
      success: string,
      error: string
    }
   }
}

export const lighTheme: ThemeState = {
   currentTheme: "light",
   dark: false,
   dividerColor: 'rgba(0,0,0,0.7)',
   colors: {
      primary: 'black',
      background: 'black',
      card: 'black',
      text: 'black',
      border: 'black',
      notification: 'black'
   },
   palette: {
    grayBottoms: '#999',
    redBottoms: '#be1e2d',
    colorHover: '#4992de',
    enviaEmailBottoms: '#043927',
    background: {
      paper: '#fff',
      default: '#f4f7fe',
    },
    primary: {
      main: '#26426C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F04F47',
    },
    sidebar: {
      bgColor: '#26426C',
      textColor: '#FFFFFF',
      fontSize: '14px',
      fontWeight: '600',
    },
    text: {
      primary: '#000',
      secondary: '#74788d',
      disabled: '#909098',
      hint: '#777B7C',
      white: '#fff',
    },
    boxes: {
      success: '#00812a',
      error: '#930000'
    }
  },
}

export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
   switch (action.type) {
      case "set_light_theme":
         return {
            ...lighTheme
         }
   }
}