import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient';
import truckeeLogo from "../assets/Truckee_Logo_White.png"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const Tab = createMaterialTopTabNavigator();
function AuthScreen() {
  return (

      <Tab.Navigator
      initialRouteName="SplashScreen"
      tabBarOptions={{
        showIcon: true,
        activeTintColor: "#fff",
        inactiveTintColor: "#fff",
        style: styles.container,
        labelStyle: {
          textAlign: 'center',
          paddingTop: 250,
          fontWeight: "bold",
          fontSize: 18
        },
        indicatorStyle: {
          width: 100,
          alignItems: "center",
          borderBottomColor: '#fff',
          borderBottomWidth: 4,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginLeft: 50
        },
      }}
      >
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          tabBarLabel: 'Sign Up',
          tabBarIcon: ({}) => (
            <Image source={truckeeLogo} style={styles.truckeeLogo}/>
          ),
        }}  />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarLabel: 'Log In',
          tabBarIcon: ({}) => (
            <></>
          ),
        }} />
    </Tab.Navigator>
    
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#2B6684",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  truckeeLogo: {
    height: 50,
    width: 180,
    justifyContent:  "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 120,
    marginLeft: Dimensions.get("window").width * 0.05
  },
  image: {
    alignItems: "center",
    justifyContent: 'center',
  },
  headerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  }
});
