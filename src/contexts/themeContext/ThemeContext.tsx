import React, { createContext, useReducer } from "react";
import { lighTheme, themeReducer, ThemeState } from "./themeReducer";

interface ThemeContextProps {
   theme: ThemeState;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: any) => {

   const [theme, dispatch] = useReducer(themeReducer, lighTheme);

   return (
      <ThemeContext.Provider value={{
         theme
      }}>
         {children}
      </ThemeContext.Provider>
   );
}