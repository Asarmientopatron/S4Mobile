import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { ThemeContext, ThemeProvider } from './src/contexts/themeContext/ThemeContext';
import { LoginNavigation } from './src/navigation/LoginNavigation';
import { AuthProvider } from './src/contexts/authContext/AuthContext';
import { CotizacionProvider } from './src/contexts/cotizacionContext/CotizacionContext';
import { CommonProvider } from './src/contexts/commonContext/CommonContext';
import { AcceptServiceProvider } from './src/contexts/acceptServiceContext/AcceptServiceContext';
import { RegisterHoursProvider } from './src/contexts/registerHoursContext/RegisterHoursContext';

const App = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <AppState>
      <NavigationContainer
        theme={theme}
      >
        <LoginNavigation/>
      </NavigationContainer>
    </AppState>
  );
};

const AppState = ({children} : any) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CommonProvider>
          <CotizacionProvider>
            <AcceptServiceProvider>
              <RegisterHoursProvider>
                {children}
              </RegisterHoursProvider>
            </AcceptServiceProvider>
          </CotizacionProvider>
        </CommonProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
