import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
  logo: {
    width: 250,
    height: 150,
  },
  logoContainer:{
    alignItems: 'center',
  },
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  menuItem: {
    fontSize: 16
  },
  menuButton: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  LateralMenuIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 160
  },
  topHeader: {
    height: 50,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  }
});