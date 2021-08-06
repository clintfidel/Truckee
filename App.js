import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RootStackScreen from "./Navigations/RootStackScreen";
import DrawerNavigationRoutes from "./Navigations/ButtomNavigation";
import AuthScreen from "./screens/AuthScreen";
import jwtDecode from "jwt-decode";
import setAuthorizationToken from "./utils/authorization";
import { SET_CURRENT_USER } from "./actions/types";
import configureStore from "./store/configureStore";
import { Provider, useSelector } from "react-redux";

const store = configureStore();

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const Navigation = () => {
  const initializeToken = async() => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setAuthorizationToken(token);
      store.dispatch({
        type: SET_CURRENT_USER,
        user: jwtDecode(token),
        token: token,
        authenticated: true,
      });
    }
  }
  useEffect(() => {
    initializeToken()
  }, [])
  const token = useSelector((state) => {
    return state.AuthReducer.token;
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { token ? (
          <>
          <Stack.Screen
              name="DrawerNavigationRoutes"
              component={DrawerNavigationRoutes}
              // Hiding header for Navigation Drawer
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Root"
              component={RootStackScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
          <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            // Hiding header for Navigation Drawer
            options={{ headerShown: false }}
          />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}