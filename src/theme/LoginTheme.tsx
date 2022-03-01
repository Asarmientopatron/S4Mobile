import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  loginContainer: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 16
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  },
  input: {
    width: '100%'
  },
  inputPass: {
    width: '90%'
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 19,
    textAlign: 'center'
  }
});