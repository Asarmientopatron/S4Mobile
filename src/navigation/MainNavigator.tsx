import React, { useContext, useState } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerScreenProps } from '@react-navigation/drawer';
import { ActivityIndicator, Image, Modal, Text, TouchableOpacity, View, StyleSheet, LogBox } from 'react-native';
import { mainStyles } from '../theme/AppTheme';
import { MainMenuOption } from '../components/MainMenuOption';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { ApproveQuoteScreen } from '../screens/ApproveQuoteScreen';
import { AcceptServiceScreen } from '../screens/AcceptServiceScreen';
import { RegisterHoursScreen } from '../screens/RegisterHoursScreen';
import { AuthContext } from '../contexts/authContext/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UsuarioPermiso } from '../interfaces/AuthInterface';
import { ROUTES } from '../data/routes';
import { usePermissions } from '../hooks/usePermissions';
import { UnauthorizedScreen } from '../screens/UnauthorizedScreen';

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();

export const MainNavigator = () => {
  const {user} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();

  const getPermisos = (permissions: UsuarioPermiso[], ruta: string) => {
    let permisos: string[] = [];
    permissions.forEach((permiso) => {
      if(permiso.nombre === 'Aplicación Móvil'){
        permiso.opciones.forEach((opcion) => {
          if(opcion.url===ruta){
            opcion.permisos.forEach((opcPermiso, index) => {
              if(opcPermiso.permitido){
                permisos[index] = opcPermiso.titulo;
              }
            })
          }
        })
      }
    })
    return {permisos, cantidad: permisos.length};
  }

  if(!user) { 
    return (
      <View style={{flex: 1, top, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size={100}
        />
      </View>
    )
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <Menu {...props} permissions={user.permisos}/>}
      screenOptions={{
        header: (props) => <Header {...props}/>
      }}
      initialRouteName={
        getPermisos(user.permisos,ROUTES.ApproveQuoteScreen).cantidad > 0 ? 
          ROUTES.ApproveQuoteScreen:
          getPermisos(user.permisos,ROUTES.AcceptServiceScreen).cantidad > 0 ? 
            ROUTES.AcceptServiceScreen:
            '/unauthorized'}
    >
      <Drawer.Screen name={ROUTES.ApproveQuoteScreen} component={ApproveQuoteScreen} options={{unmountOnBlur: true}}/>
      <Drawer.Screen name={ROUTES.AcceptServiceScreen} component={AcceptServiceScreen} options={{unmountOnBlur: true}} />
      <Drawer.Screen name={ROUTES.RegisterHoursScreen} component={RegisterHoursScreen} options={{unmountOnBlur: true}} />
      <Drawer.Screen name={'/unauthorized'} component={UnauthorizedScreen} options={{unmountOnBlur: true}} />
    </Drawer.Navigator>
  );
}

interface MenuProps extends DrawerContentComponentProps{
  permissions: UsuarioPermiso[]
};

const Menu = ({navigation, permissions}: MenuProps) => {
  const {theme: {palette}} = useContext(ThemeContext);
  const {opciones} = usePermissions(permissions);

  return (
    <DrawerContentScrollView
      style={{
        backgroundColor: palette.background.paper
      }}
    >
      {/* Logo */}
      <View style={mainStyles.logoContainer}>
        <Image
          source={require('./../assets/LogoSmart3.png')}
          style={mainStyles.logo}
        />
      </View>
      {/* Menu Options */}
      <View style={mainStyles.menuContainer}>
        {opciones.map((opcion) => {
          if(opcion.permissions.length>0){
            return (
              <MainMenuOption
                key={opcion.id} 
                iconName={opcion.icon}
                itemTitle={opcion.name} 
                onPress={() => navigation.navigate(opcion.url)}
              />
            );
          }
        })}
      </View>
    </DrawerContentScrollView>
  );
}

interface Props extends DrawerScreenProps<any, any>{};

const Header = ({navigation}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const {theme: {palette}} = useContext(ThemeContext);
  const {user, logout} = useContext(AuthContext);

  const onLogout = () => {
    logout();
  }

  return (
    <>
      <View style={{...mainStyles.topHeader, backgroundColor: palette.background.paper}}>
        <TouchableOpacity
          style={{width: 50, height: 50, justifyContent: 'center'}}
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name='menu-outline' size={30} color={palette.sidebar.textColor}/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setShowModal(!showModal)}
        >
          <Icon name='person' color={palette.sidebar.textColor} size={25}/>
          <View style={{marginLeft: 10}}>
            <Text style={{color: palette.sidebar.textColor, fontWeight: 'bold'}}>{user?.nombre}</Text>
            <Text style={{color: palette.sidebar.textColor, fontWeight: 'bold'}}>{user?.identificacion_usuario}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View 
        style={{
          width: 170, 
          height: 60, 
          position: 'absolute'
        }}
      >
        <Modal
          animationType='fade'
          transparent
          visible={showModal}
          onDismiss={() => setShowModal(false)}
        >
          <View style={Modalstyles.modalContainer}>
            <View style={Modalstyles.infoUser}>
              <Text 
                style={{
                  color: palette.text.primary,
                  fontWeight: 'bold'
                }}
              >
                {user?.rol.nombre}
              </Text>
              <Text 
                numberOfLines={1} 
                style={{
                  color: palette.text.primary
                }}
              >
                {user?.email}
              </Text>
            </View>
            <View style={Modalstyles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  ...Modalstyles.button,
                  backgroundColor: palette.primary.main
                }}
                onPress={onLogout}
              >
                <Text style={{color: palette.text.white}}>Cerrar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  width: 30, 
                  height: 30
                }}
                onPress={() => setShowModal(false)}
              >
                <Icon name='close-circle' size={30} color='gray'/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const Modalstyles = StyleSheet.create({
  modalContainer: {
    width: 180, 
    height: 120, 
    backgroundColor: 'white', 
    borderRadius: 10,
    position: 'absolute',
    top: 40,
    right: 10,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    width: 100,
    height: 40,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  infoUser : {
    width: 150,
    height: 50,
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});