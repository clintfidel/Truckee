import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient';
import truckeeLogo from "../assets/Truckee_Logo_White.png"

function SplashScreen({navigation}) {
  clearAsyncStorage = async() => {
    AsyncStorage.clear();
}
  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={bgImage}
        style={[styles.backgroundImg], {
        flex: 2
      }}> */}
        <View style={styles.header}>
          {/* <Text style={styles.headerText}>TRUCKEE!!!</Text> */}
          <Image source={truckeeLogo} style={styles.truckee_logo}/>
        </View>
      {/* </ImageBackground> */}
      <Animatable.View
        animation="slideInDown"
        iterationCount={1}
        direction="alternate"
        style={styles.footer}>
        <Text style={styles.title}>Trukee!, Transport your drinks to any location</Text>
        <Text style={styles.text}>Sign up to get started</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={()=> navigation.navigate('Auth', { screen: "AuthScreen"})}>
            <LinearGradient
              colors={["#2B6684", "#2B6684"]}
              style={styles.signIn}
            >
              <Text style={styles.textGetStarted}>Get Started</Text>
              <Ionicons style={styles.icon} name="caret-forward" color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

export default SplashScreen

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B6684",
  },
  backgroundImg: {
    resizeMode: "contain",
    height: 0,
    width: 0
  },
  truckee_logo: {
    marginTop: 10
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold"
  },
  text: {
    color: "grey",
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold"
  },
  logo: {
    height: height_logo,
    width: height
  },
  textGetStarted: {
    fontWeight: "bold",
    color: "#fff" 
  },
  signIn: {
    width: 150,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  icon: {
    marginLeft: 5
  },
  button: {
    alignItems: "flex-end",
    marginTop: 100
  }
});
