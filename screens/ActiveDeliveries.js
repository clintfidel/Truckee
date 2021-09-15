import React, { useEffect } from "react";
import FlipToggle from "react-native-flip-toggle-button";
import {
  TouchableOpacity,
  ScrollView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Linking,
} from "react-native";
import moment from "moment";
import { getSingleDelivery, finishDelivery } from "../actions/deliveryAction";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
import box from "../assets/box.png";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

function ActiveDelivery({
  navigation,
  finishDelivery,
  route,
  getSingleDelivery,
  acceptDelivery,
  singleDelivery,
}) {
  const [status, setStatus] = React.useState(false);
  useEffect(() => {
    getSingleDelivery(route.params?.orderId);
    // finishDelivery(route.params?.orderId)
  }, []);

  const checkNullBulkreaker = (value) => {
    if (value.bulkbreakerId !== null) {
      return value.bulkbreakerId.address;
    }
    return "No address Found";
  };

  const checkNullPoc = (value) => {
    if (value.pocId !== null) {
      return value.pocId.address;
    }
    return "No address Found";
  };

  const driverFinishDeivery = () => {
    finishDelivery(acceptDelivery._id)
      .then(() => {
        let toast = Toast.show("Delivery Completed", {
          duration: Toast.durations.LONG,
        });
        setTimeout(() => {
          Toast.hide(toast);
          navigation.navigate("DrawerNavigationRoutes", {
            screen: "All Delivery",
          });
        }, 3000);
      })
      .catch((message) => {
        let toast = Toast.show("Cannot Complete Delivery", {
          duration: Toast.durations.LONG,
        });
        Toast.hide(toast);
        // setLoader(false)
        // toastrOption();
      });
  };
  const toggleStatus = () => {
    if (status) {
      setStatus(false);
    } else {
      driverFinishDeivery();
      setStatus(true);
    }
  };

  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${singleDelivery.buyerMobile}`;
    } else {
      phoneNumber = `tel:${singleDelivery.buyerMobile}`;
    }

    Linking.openURL(phoneNumber);
  };
  const copyToClipboard = (value) => {
    Clipboard.setString(value);
  };

  const checkIntransit = () => {
    if (inTransit) {
      setInTransit(false);
    } else {
      setInTransit(true);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DrawerNavigationRoutes", {
                screen: "Home",
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
          <Text
            style={styles.delivery}
          >{`Delivery-${singleDelivery.orderId}`}</Text>
        </View>
      </View>
      <ScrollView style={styles.background}>
        <View style={styles.footer}>
          <View style={styles.activeDeliveryCont}>
            <View style={styles.activeDelivery}>
              <Text style={styles.activeDeliveryText}>Active delivery</Text>
            </View>
            <Text style={styles.activeDeliveryDate}>
              {moment().format("MMMM Do YYYY, h:mm a")}
            </Text>
          </View>
          <View style={styles.location}>
            <View style={styles.locationToFro1}>
              <View style={styles.from}>
                <Text style={styles.locationText1}>From</Text>
                <View style={styles.locationDot} />
                {/*  */}
              </View>
              <View style={styles.middle}>
                <Text style={styles.line} />
              </View>
              <View style={styles.to}>
                <Text style={styles.locationText1}>To</Text>
                <Text style={styles.locationDot2} />
                {/*  */}
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
                      checkNullBulkreaker(singleDelivery)
                        ? checkNullBulkreaker(singleDelivery)
                        : checkNullPoc(singleDelivery)
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
                    {checkNullBulkreaker(singleDelivery)
                      ? checkNullBulkreaker(singleDelivery)
                      : checkNullPoc(singleDelivery)}
                  </Text>
                  <TouchableOpacity
                    onPress={copyToClipboard(
                      checkNullBulkreaker(singleDelivery)
                        ? checkNullBulkreaker(singleDelivery)
                        : checkNullPoc(singleDelivery)
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
              <Image source={box} />
              <View style={styles.cont1}>
                <Text style={styles.itemText1}>15</Text>
                <Text style={styles.itemText2}>Crates</Text>
              </View>
            </View>
            {/* <View style={styles.itemTextCont}>
              <Image style={styles.image} />
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
              <Text style={styles.customerName}>{singleDelivery.buyer}</Text>
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
          <View style={styles.warning}>
            <Ionicons
              style={styles.icon}
              size={20}
              name="warning-outline"
              color="#fff"
            />
            <Text style={styles.warningText}>
              After delivery, finish the order by using {"\n"} the button below
            </Text>
          </View>

          <View style={styles.slider}>
            <FlipToggle
              value={status}
              style={styles.toggle}
              buttonWidth={300}
              buttonHeight={55}
              buttonRadius={50}
              sliderWidth={50}
              sliderHeight={50}
              sliderRadius={60}
              sliderOffColor="#2B6684"
              sliderOnColor="#fff"
              buttonOffColor="#fff"
              buttonOnColor="#2B6684"
              onLabel={`FINISHED`}
              offLabel={"SLIDE TO FINISH"}
              labelStyle={{
                color: `${status ? "#fff" : "#000"}`,
                fontSize: 14,
                fontWeight: "bold",
              }}
              onToggle={toggleStatus}
              onToggleLongPress={() => console.log("toggle long pressed!")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHeader: {
    paddingTop: 70,
    paddingBottom: 20,
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
  cont1: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 7,
    marginLeft: 20,
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
  activeDeliveryDate: {
    paddingTop: 6,
    paddingLeft: 15,
    fontSize: 14,
    color: "#424648",
    fontWeight: "normal",
  },
  warning: {
    backgroundColor: "#7F8284",
    height: 66,
    width: Dimensions.get("window").width * 0.9,
    padding: 12,
    flexDirection: "row",
    marginTop: 15,
    borderRadius: 5,
  },
  warningText: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 8,
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
    marginLeft: 40,
    marginRight: 65,
    justifyContent: "center",
    alignContent: "center",
  },
  itemText1: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
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
    width: Dimensions.get("window").width * 0.78,
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
  toggle: {
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  slider: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 50,
    backgroundColor: "#fff",
    width: 300,
    height: 50,
    borderRadius: 55,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.5,
    elevation: 12,
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
    marginLeft: Dimensions.get("window").width * 0.28,
  },
  callText: {
    color: "#FFFFFF",
  },
  acceptBtn: {
    height: 56,
    width: Dimensions.get("window").width * 0.9,
    color: "white",
    backgroundColor: "#2B6684",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  acceptText: {
    color: "white",
    fontSize: 16,
    fontWeight: "normal",
  },
});

const mapStateToProps = (state) => {
  return {
    acceptDelivery: state.DeliveriesReducer.acceptDelivery,
    singleDelivery: state.DeliveriesReducer.singleDelivery,
    auth: state.AuthReducer.user.user,
  };
};
export default connect(mapStateToProps, { getSingleDelivery, finishDelivery })(
  ActiveDelivery
);
