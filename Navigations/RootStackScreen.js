import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Ratings from "../screens/Ratings";
import Earnings from "../screens/Earnings";
import ClosestDelivery from "../screens/ClosestDelivery";
import ActiveDeliveries from "../screens/ActiveDeliveries";
import AcceptDelivery from "../screens/AcceptDelivery";
import Delivered from "../screens/Delivered";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator headerMode = "none">
      <RootStack.Screen name="Ratings" component={Ratings}/>
      <RootStack.Screen name="Earnings" component={Earnings}/>
      <RootStack.Screen name="ClosestDelivery" component={ClosestDelivery}/>
      <RootStack.Screen name="AcceptDelivery" component={AcceptDelivery}/>
      <RootStack.Screen name="ActiveDeliveries" component={ActiveDeliveries}/>
      {/* <RootStack.Screen name="SplashScreen" component={SplashScreen}/> */}
      <RootStack.Screen name="Delivered" component={Delivered}/>
    </RootStack.Navigator>
  )
}

export default RootStackScreen;
