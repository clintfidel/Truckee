import React, { useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Platform,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import box from "../assets/box.png";
import person from "../assets/person.png";
import { getSingleDelivery, finishDelivery } from "../actions/deliveryAction";
import { connect } from "react-redux";

function Delivered({ navigation, route, finishedDelivery, finishDelivery }) {
  useEffect(() => {
    // getSingleDelivery(route.params?.orderId);
    finishDelivery(route.params?.orderId)
    // finishDelivery(route.params?.orderId)
  }, []);

  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${1234567890}";
    } else {
      phoneNumber = "telprompt:${1234567890}";
    }

    Linking.openURL(phoneNumber);
  };
  const copyToClipboard = () => {
    Clipboard.setString("hello world");
  };

  const checkNullBulkreaker = (value) => {
    if (value && value.bulkbreakerId !== null) {
      return value.bulkbreakerId.address;
    }
    return "No address Found";
  };

  const checkNullPoc = (value) => {
    if (value && value.pocId !== null) {
      return value.pocId.address;
    }
    return "No address Found";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DrawerNavigationRoutes", {
                screen: "All Delivery",
              })
            }
          >
            <Ionicons
              style={styles.iconBack}
              size={20}
              name="arrow-back-circle-outline"
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.delivery}>Delivery12455</Text>
        </View>
      </View>
      <ScrollView style={styles.background}>
        <View style={styles.footer}>
          <View style={styles.activeDeliveryCont}>
            <View style={styles.activeDelivery}>
              <Text style={styles.activeDeliveryText}>Delivered</Text>
            </View>
            <Text style={styles.activeDeliveryDate}>
              Feb. 21, 2021 at 2:03 pm
            </Text>
          </View>
          <View style={styles.earningsView}>
            <Text style={styles.earningsText}>Delivery Charge</Text>
            <Text style={styles.earningsAmount}>#20,300</Text>
            <View style={styles.delivered}>
              <Text style={styles.DeliveredText}>Delivered</Text>
            </View>
          </View>
          <View style={styles.location}>
            <View style={styles.locationToFro1}>
              <View style={styles.from}>
                <Text style={styles.locationText1}>From</Text>
                <View style={styles.locationDot} />
              </View>
              <View style={styles.middle}>
                <Text style={styles.line} />
              </View>
              <View style={styles.to}>
                <Text style={styles.locationText1}>To</Text>
                <Text style={styles.locationDot2} />
              </View>
            </View>
            <View style={styles.locationToFro}>
              <View style={styles.itemCont}>
                <View style={styles.deliveryItem}>
                  <Text style={styles.locationText2}>
                    256 Market Street, Lagos, Nigeria
                  </Text>
                  <TouchableOpacity
                    onPress={copyToClipboard(
                      checkNullBulkreaker(finishedDelivery && finishedDelivery)
                        ? checkNullBulkreaker(finishedDelivery && finishedDelivery)
                        : checkNullPoc(finishedDelivery && finishedDelivery)
                    )}
                  >
                    <Ionicons
                      style={styles.icon}
                      size={20}
                      name="copy"
                      color="#CBCECF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.itemCont}>
                <View style={styles.deliveryItem}>
                  <Text style={styles.locationText2}>
                    {checkNullBulkreaker(finishedDelivery && finishedDelivery)
                      ? checkNullBulkreaker(finishedDelivery && finishedDelivery)
                      : checkNullPoc(finishedDelivery && finishedDelivery)}
                  </Text>
                  <TouchableOpacity
                    onPress={copyToClipboard(
                      checkNullBulkreaker(finishedDelivery && finishedDelivery)
                        ? checkNullBulkreaker(finishedDelivery && finishedDelivery)
                        : checkNullPoc(finishedDelivery && finishedDelivery)
                    )}
                  >
                    <Ionicons
                      style={styles.icon}
                      size={20}
                      name="copy"
                      color="#CBCECF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.deliveryDetails}>
            <View style={styles.itemTextCont}>
              <Image source={box} style={styles.image} />
              <Text style={styles.itemText1}>15</Text>
              <Text style={styles.itemText2}>Crates</Text>
            </View>
            {/* <View style={styles.itemTextCont}>
            <Image source={person} style={styles.image}/>
            <Text style={styles.itemText1}>2</Text>
            <Text style={styles.itemText2}>Helpers</Text>
          </View> */}
          </View>
          <View style={styles.customerContactCont}>
            <Text style={styles.customerTitle}>Customer</Text>
            <View style={styles.customerNameCont}>
              <Ionicons
                style={styles.icon}
                size={20}
                name="person"
                color="#9CACBF"
              />
              <Text style={styles.customerName}>{finishedDelivery && finishedDelivery.buyer}</Text>
            </View>
            <View style={styles.customerNameCont}>
              <Ionicons
                style={styles.icon}
                size={20}
                name="call"
                color="#9CACBF"
              />
              <Text style={styles.customerName}>08012345678</Text>
              <View style={styles.call}>
                <TouchableOpacity onPress={dialCall} activeOpacity={0.7}>
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHeader: {
    paddingTop: 70,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#2B6684",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
  },
  footer: {
    flex: 4,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: "scroll",
  },
  activeDeliveryCont: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  activeDelivery: {
    borderRadius: 15,
    padding: 7,
    backgroundColor: "#E9ECEE",
  },
  earningsView: {
    justifyContent: "center",
    alignItems: "center",
    height: 170,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  earningsText: {
    color: "#424648",
    fontSize: 14,
    fontWeight: "normal",
    paddingBottom: 10,
  },
  earningsAmount: {
    color: "#424648",
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  delivered: {
    borderRadius: 16,
    padding: 7,
    backgroundColor: "#2B6684",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 17,
    paddingRight: 17,
  },
  DeliveredText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  activeDeliveryDate: {
    paddingTop: 6,
    paddingLeft: 15,
    fontSize: 14,
    color: "#424648",
    fontWeight: "normal",
  },
  activeDeliveryText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#424648",
  },
  location: {
    display: "flex",
    flexDirection: "row",
  },
  from: {
    flexDirection: "row",
    paddingBottom: 5,
  },
  locationToFro1: {
    paddingTop: 25,
  },
  locationToFro: {
    paddingTop: 20,
  },
  to: {
    flexDirection: "row",
    paddingTop: 5,
    paddingLeft: 17,
  },
  delivery: {
    marginTop: 30,
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal",
  },
  deliveryDetails: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  itemTextCont: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 65,
    alignItems: "center",
  },
  itemText1: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
    paddingLeft: 10,
  },
  itemText2: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#424648",
  },
  deliveryVan: {
    height: 56,
    width: 56,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  itemCont: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryItem: {
    padding: 20,
    height: 72,
    width: Dimensions.get("window").width * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "#2B6684",
    borderWidth: 1,
    marginBottom: 20,
  },
  middle: {
    height: 90,
    marginLeft: Platform.OS === "ios" ? 44 : 39,
    borderLeftWidth: 1,
    borderLeftColor: "#CBCECF",
  },
  locationDot: {
    backgroundColor: "#2B6684",
    height: 10,
    width: 10,
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 5,
  },
  locationDot2: {
    backgroundColor: "#fff",
    height: 10,
    borderColor: "#000",
    width: 10,
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4,
    borderWidth: 1,
  },
  locationText1: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "normal",
    opacity: 0.5,
    paddingRight: 4,
  },
  locationText2: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "normal",
    paddingLeft: 4,
  },
  icon: {
    paddingLeft: 20,
  },
  customerContactCont: {
    borderRadius: 10,
    height: 160,
    backgroundColor: "#fff",
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.9,
    padding: 10,
    marginTop: 30,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  customerNameCont: {
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: "row",
  },
  customerTitle: {
    fontWeight: "500",
    fontSize: 16,
    color: "#424648",
    paddingTop: 8,
    paddingLeft: 9,
  },
  customerName: {
    fontSize: 16,
    color: "#424648",
    paddingLeft: 10,
  },
  call: {
    borderRadius: 17,
    padding: 7,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: "#2B6684",
    marginLeft: Dimensions.get("window").width * 0.3,
  },
  callText: {
    color: "#FFFFFF",
  },
});

const mapStateToProps = (state) => {
  console.log(state.finishedDelivery)
  return {
    finishedDelivery: state.DeliveriesReducer.finishDelivery,
    auth: state.AuthReducer.user.user,
  };
};
export default connect(mapStateToProps, { getSingleDelivery, finishDelivery })(Delivered);
