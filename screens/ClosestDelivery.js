import React, { useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import deliveryVan from "../assets/deliveryVan.png";
import box from "../assets/box.png";
import Toast from 'react-native-root-toast';
import { getSingleDelivery, acceptDelivery } from "../actions/deliveryAction";
import { connect } from "react-redux";


function Delivery({ navigation, auth, getSingleDelivery, route, acceptDelivery, singleDelivery }) {

  useEffect(() => {
    getSingleDelivery(route.params?.orderId);
    acceptDelivery(route.params?.orderId, auth.email)
  }, []);

  const getTotalCases = () => {
    let total = 0;
    singleDelivery.items.forEach((item) => {
      total+=item.quantity;
    });
    return total
  }

  const getAddress = () => {
    if(singleDelivery.pocId) {
      return singleDelivery.pocId.address
    }
    else if (singleDelivery.bulkbreakerId) {
      return singleDelivery.bulkbreakerId.address
    }
    else {
      return ""
    }
  }
  const driverAcceptDeivery = () => {
    acceptDelivery(route.params?.orderId, auth.email)
    .then(() => {
      let toast = Toast.show('Delivery Accepted', {
        duration: Toast.durations.LONG,
      });
      setTimeout(() => {
        Toast.hide(toast)
        navigation.navigate("Root", { screen: "AcceptDelivery" })
      }, 2000);
    })
    .catch((message) => {
      let toast = Toast.show('Cannot Accept Delivery', {
        duration: Toast.durations.LONG,
      });
      Toast.hide(toast)        
      // setLoader(false)
      // toastrOption();
    })
  }
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.headerText}>New delivery for you</Text>
              <Image style={styles.deliveryVan} source={deliveryVan} />
            </View>
            <View style={styles.location}>
              <View style={styles.from}>
                <Text style={styles.locationText1}>From</Text>
                <View style={styles.locationDot} />
                <Text style={styles.locationText2}>
                  256 Market Street, Lagos, Nigeria
                </Text>
              </View>
              <View style={styles.middle}>
                <Text>|</Text>
              </View>
              <View style={styles.to}>
                <Text style={styles.locationText1}>To</Text>
                <Text style={styles.locationDot2} />
                <Text style={styles.locationText2}>
                  {getAddress()}
                </Text>
              </View>
            </View>
            <View style={styles.itemCont}>
              <View style={styles.deliveryItem}>
                <Image source={box}/>
                <View style={styles.itemTextCont}>
                  <Text style={styles.itemText1}>{getTotalCases()}</Text>
                  <Text style={styles.itemText2}>creates</Text>
                </View>
              </View>
              {/* <View style={styles.deliveryItem}>
                <Image source={person}/>
                <View style={styles.itemTextCont}>
                  <Text style={styles.itemText1}>1</Text>
                  <Text style={styles.itemText2}>Helper</Text>
                </View>
              </View> */}
            </View>
            <Text style={styles.estimate}>ESTIMATED EARNING</Text>
            <Text style={styles.estimateAmount}>{singleDelivery.totalAmount}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonCont}>
            <View style={styles.rejectBtn}>
              <TouchableOpacity onPress={() => navigation.navigate("DrawerNavigationRoutes", { screen: "Home" })}>
                <Text style={styles.rejectText}>Reject Delivery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.acceptBtn}>
              <TouchableOpacity
                onPress={ driverAcceptDeivery }
              >
                <Text style={styles.acceptText}>Accept Delivery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E4E4",
  },
  header: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    height: 410,
    width: Dimensions.get("window").width * 0.8,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
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
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middle: {
    color: "#000000",
    opacity: 0.4,
    marginLeft: Platform.OS === "ios" ? 44 : 39,
  },
  itemCont: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryItem: {
    flexDirection: "row",
    height: 72,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.5,
    paddingLeft: 20,
    borderRadius: 8,
    borderColor: "#2B6684",
    borderWidth: 1,
    marginBottom: 30,
  },
  itemTextCont: {
    flexDirection: "row",
    paddingLeft: 20
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
    marginBottom: 25
  },
  headerText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 18,
    paddingTop: 15
  },
  estimate: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#68686A",
    marginTop: 8,
  },
  estimateAmount: {
    fontWeight: "normal",
    fontSize: 20,
    marginTop: 5,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  rejectBtn: {
    height: 56,
    width: 152,
    backgroundColor: "transparent",
    borderRadius: 4,
    borderColor: "#2B6684",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptBtn: {
    height: 56,
    width: 152,
    color: "white",
    backgroundColor: "#2B6684",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptText: {
    color: "white",
    fontSize: 16,
    fontWeight: "normal",
  },
  rejectText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "normal",
  },
  from: {
    flexDirection: "row",
    paddingBottom: 5,
  },
  to: {
    flexDirection: "row",
    paddingTop: 5,
    paddingLeft: 17,
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
  location: {
    marginBottom: 30,
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
});

const mapStateToProps = (state) => {
  return {
    singleDelivery: state.DeliveriesReducer.singleDelivery,
    auth: state.AuthReducer.user.user,
  };
};

export default connect(mapStateToProps, { getSingleDelivery, acceptDelivery })(Delivery);
