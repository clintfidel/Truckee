import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import moment from 'moment';
import { Ionicons } from "@expo/vector-icons";
import dot from "../assets/dot.svg";
import { getAllDeliveries } from "../actions/deliveryAction";

function AllDeliveries({ navigation, getAllDeliveries, deliveries }) {
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    getAllDeliveries()
    .then(() => {
      setLoader(false)
    })
  }, []);

  const completedDeliveries = deliveries.filter((el)=> {
    return el.status === 'completed'
  })
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
              style={styles.icon}
              size={20}
              name="arrow-back-circle-outline"
              color="#fff"
            />
          </TouchableOpacity>
          <View style={styles.titleCal}>
            <Text style={styles.earning}>Completed Deliveries</Text>
            <TouchableOpacity onPress={() => console.log("1")}>
              <View style={styles.iconsRight}>
                <Ionicons
                  style={styles.iconArrow}
                  size={20}
                  name="filter-sharp"
                  color="#fff"
                />
                <Text style={styles.filterText}>Filter</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.background}>
      <View style={styles.footer}>
        { loader ? 
        (<View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>) :
        (<View style={styles.earningsBreakdownList}>
          <Text style={styles.earningsDate}>{moment().format(('MMMM YYYY'))}</Text>
          <View style={styles.horizontal} />
          {completedDeliveries.map((value, index) => {
            return (
              <>
                <TouchableOpacity
                  // key={index}
                  // onPress={() =>
                  // navigation.navigate("Root", { screen: "ActiveDeliveries", params: { orderId: value._id },
                  // merge: true, })
                  // }
                >
                  <View key={index} style={styles.dateText}>
                    <View style={styles.dottedDate}>
                      <Image style={styles.dotImage} source={dot} />
                      <View style={styles.deliveryItem}>
                        <Text style={styles.detailsCode}>{value.orderId}</Text>
                        <Text style={styles.detailsDate}>
                          {/* Sep 22, 2020 | 02:48 PM */}
                          {`${moment().format(('MMMM Do YYYY'))} | ${moment().format(('h:mm a'))}`}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.deliveryEarnings}>
                      <Text
                        style={
                          ([styles.detailsStatus],
                          {
                            color: "#2B6684",
                            fontSize: 14,
                            fontWeight: "500",
                          })
                        }
                      >
                        {value.status}
                      </Text>
                      {/* <Text style={styles.detailsAmount}>₦23,000</Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.horizontal} />
              </>
            );
          })}
        </View>)
        }
      </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    deliveries: state.DeliveriesReducer.allDeliveries,
    auth: state.AuthReducer.user.currentUser,
  };
};

export default connect(mapStateToProps, { getAllDeliveries })(AllDeliveries);

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
    overflow: "scroll",
  },
  titleCal: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
  },
  iconCal: {
    marginRight: 8,
  },
  iconArrow: {
    marginLeft: 4,
  },
  iconsRight: {
    flexDirection: "row",
  },
  earning: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal",
  },
  date: {
    fontWeight: "normal",
    fontSize: 14,
    marginTop: 4,
    color: "#fff",
  },
  deliveryEarnings: {
    alignItems: "flex-start",
  },
  detailsStatus: {
    paddingBottom: 8,
  },
  earningsText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
  },
  filterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 5,
    paddingTop: 2,
  },
  textDetails: {
    alignItems: "center",
  },
  detailsCode: {
    color: "#424648",
    fontSize: 14,
    fontWeight: "500",
    paddingBottom: 8,
  },
  loading: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  earningsAmount: {
    fontSize: 24,
    paddingTop: 8,
    fontWeight: "bold",
    fontStyle: "normal",
    color: "#fff",
  },
  deliveryItem: {
    marginLeft: 10,
  },
  earningsBreakdown: {
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
  },
  breakdownText: {
    fontWeight: "normal",
    fontSize: 12,
    marginBottom: 10,
    color: "#68686A",
  },
  earningsBoxCont: {
    justifyContent: "center",
    alignItems: "center",
  },
  breakdownAmount: {
    fontSize: 15,
    fontWeight: "bold",
  },
  horizontal: {
    borderBottomColor: "#CBCECF",
    borderWidth: 0.4,
    marginBottom: 20,
  },
  earningsBreakdownList: {
    marginTop: 30,
  },
  earningsDate: {
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 20,
    color: "#68686A",
  },
  dateText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingLeft: 25,
    paddingRight: 5,
  },
  dottedDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotImage: {
    marginTop: 5,
    marginRight: 10,
    backgroundColor: "#8691B1",
    borderRadius: 2,
  },
  detailsDate: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#7F8284",
  },
  detailsAmount: {
    fontWeight: "600",
    color: "#424648",
    fontSize: 16,
    paddingRight: 30,
  },
});
