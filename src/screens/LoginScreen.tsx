import React, { useContext, useEffect, useState } from 'react';
import { Text, View, LogBox, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LoginBackground } from '../components/LoginBackground';
import { loginStyles } from '../theme/LoginTheme';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { MainLogo } from '../components/MainLogo';
import { useForm } from '../hooks/useForm';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../contexts/authContext/AuthContext';

LogBox.ignoreLogs(['react-native-gesture-handler']);

interface Props extends StackScreenProps<any, any>{};

export const LoginScreen = ({navigation}: Props) => {
  const [watchPass, setWatchPass] = useState(false);
  const {signIn, messages, removeError} = useContext(AuthContext);
  const {theme: {palette}} = useContext(ThemeContext);
  const {username, password, onChange} = useForm({
    username: '',
    password: ''
  });

  useEffect(() => {
    if(messages){
      Alert.alert('Login Incorrecto', messages[0],[{
        text: 'Ok',
        onPress: () => removeError()
      }]);
    }
  }, [messages])

  const onLogin = () => {
    signIn({username, password});
  }

  const onTooglePass = () => {
    setWatchPass(!watchPass);
  }

  return (
    <View style={{display: 'flex', flex: 1, backgroundColor: '#0c4f7f'}}>
      {/* Background */}
      <View>
        <LoginBackground/>
      </View>
      {/* Keyboard Avoid View */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={(Platform.OS === 'ios')? 'padding' : 'height'}
      >
        <ScrollView>
          <MainLogo/>
          <View style={{alignItems: 'center'}}>
            <View style={{...loginStyles.loginContainer, backgroundColor: palette.background.default}}>
              <Text style={{...loginStyles.title, color: palette.text.primary}}>Smart Security Solutions</Text>
              <TextInput 
                style={{...loginStyles.input, color: palette.text.primary}}
                keyboardType='default'
                placeholder={'Identificación'}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                underlineColorAndroid={'rgba(0,0,0,0.5)'}
                onChangeText={(value) => onChange(value,'username')}
                value={username}
              />
              <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TextInput 
                  style={{...loginStyles.inputPass, color: palette.text.primary}}
                  keyboardType='default'
                  secureTextEntry={!watchPass}
                  placeholder={'Contraseña'}
                  placeholderTextColor={'rgba(0,0,0,0.3)'}
                  underlineColorAndroid={'rgba(0,0,0,0.5)'}
                  onChangeText={(value) => onChange(value,'password')}
                  value={password}
                />
                <Icon
                  style={{
                    position: 'absolute',
                    right: '12%'
                  }}
                  name={!watchPass?'eye':'eye-off'} 
                  size={30} color={'gray'} 
                  onPress={onTooglePass}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{...loginStyles.button, backgroundColor: palette.primary.main}}
                onPress={() => onLogin()}
              >
                <Text style={{...loginStyles.buttonText, color: palette.text.white}}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );  
};
