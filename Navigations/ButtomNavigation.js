import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AllDelivery from "../screens/AllDeliveries";
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Support from '../screens/Support';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'All Delivery') {
            iconName = focused ? 'truck' : 'truck';
          } else if (route.name === 'Support') {
            iconName = focused ? "headphones" : "headphones";
          } else if (route.name === 'Settings') {
              iconName = focused ? "cog" : "cog";
            }
          return <FontAwesome name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2B6684',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home}  />
      <Tab.Screen name="All Delivery" component={AllDelivery} />
      <Tab.Screen name="Support" component={Support} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomTab;