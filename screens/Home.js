import React, { useEffect, useState } from "react";
import {
  Pressable,
  Platform,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import FlipToggle from "react-native-flip-toggle-button";
import { Rating } from "react-native-ratings";
import deliveryVan from "../assets/deliveryVan.png";
import bgImage from "../assets/bgImage.png";
import {
  getConfirmedDeliveries,
  getSingleDelivery,
} from "../actions/deliveryAction";

function Home({ navigation, getConfirmedDeliveries, auth, deliveries }) {
  const [delivery, showDelivery] = useState(false);
  const [status, setStatus] = useState(false);
  const [myDeliveries, setDeliveries] = useState([]);

  useEffect(() => {
    getConfirmedDeliveries().then((deliveries) => {
      setDeliveries(deliveries);
    });
  }, [getConfirmedDeliveries]);

  const toggleStatus = async () => {
    if (status) {
      await getConfirmedDeliveries();
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  const checkNullBulkreaker = (value) => {
    if(value.bulkbreakerId !== null) {
      return value.bulkbreakerId.address
    }
    return "No address Found"
  }

  const checkNullPoc = (value) => {
    if(value.pocId !== null) {
      return value.pocId.address
    }
    return "No address Found"
  }

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.welcomeText}>{`Hi ${auth.firstName}`}</Text>
          <Text style={styles.instruction}>
            Slide to go online and start making deliveries
          </Text>
          <View style={styles.slider}>
            <FlipToggle
              value={status}
              style={styles.toggle}
              buttonWidth={300}
              buttonHeight={55}
              buttonRadius={55}
              sliderWidth={50}
              sliderHeight={50}
              sliderRadius={60}
              sliderOffColor="#2B6684"
              sliderOnColor="#fff"
              buttonOffColor="#fff"
              buttonOnColor="#2B6684"
              onLabel={`YOU'RE ONLINE`}
              offLabel={"SLIDE HERE"}
              labelStyle={{
                color: `${status ? "#fff" : "#000"}`,
                fontSize: 14,
                fontWeight: "bold",
              }}
              onToggle={toggleStatus}
              onToggleLongPress={() => console.log("toggle long pressed!")}
            />
          </View>
          {/* {
          status ?
            <View
              style={styles.loading}>
              <Text style={styles.loadingText}>Looking for a delivery...</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Root', { screen: 'ClosestDelivery' })}>
              <View style={styles.arrowLoading}>
                <Ionicons style={styles.icon} name="caret-forward" color="orange" size={20} />
                <Ionicons style={styles.icon} name="caret-forward" color="orange" size={20} />
                <Ionicons style={styles.icon} name="caret-forward" color="orange" size={20} />
                <Ionicons style={styles.icon} name="caret-forward" color="orange" size={20} />
                <Ionicons style={styles.icon} name="caret-forward" color="orange" size={20} />
                <Ionicons style={styles.icon} name="caret-forward" color="orange" size={20} />
              </View>
            </TouchableOpacity>
            </View>
         : 
          <View></View>
        } */}
          {status ? (
            <View>
              {deliveries && deliveries.confirmedDeliveries.length > 0 ? (
                <View>
                  {deliveries && deliveries.confirmedDeliveries.map((value) => {
                    console.log(checkNullBulkreaker(value), '-----')
                    return (
                      <TouchableOpacity
                        key={value.orderId}
                        onPress={() =>
                          navigation.navigate("Root", {
                            screen: "ClosestDelivery",
                            params: { orderId: value._id },
                            merge: true,
                          })
                        }
                      >
                        <View style={styles.modalBody}>
                          <View style={styles.modalHeader}>
                            <Text style={styles.headerText}>{value.buyer}</Text>
                            <Image
                              style={styles.deliveryVan}
                              source={deliveryVan}
                            />
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
                              {checkNullBulkreaker(value)
                                  ? checkNullBulkreaker(value)
                                  : checkNullPoc(value)
                                  }
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.noDelivery}>
                  <FontAwesome name="ban" color="#2B6684" size={24} />
                  <Text style={styles.noDeliveryText}>You currently do not have any deliveries!</Text>
                </View>
              )}
            </View>
          ) : (
            <View></View>
          )}
          {/* <View style={styles.earningsBox}>
					<View style={styles.textDetails}>
						<Text style={styles.earningsText}>TODAY’S EARNINGS</Text>
						<Text style={styles.earningsAmount}>₦5,000</Text>
					</View>
					<TouchableOpacity onPress={()=> navigation.navigate('Root', { screen: 'Earnings' })}>
            <View style={styles.earningDetails2}>
              <Text style={styles.earningsText2}>Earnings</Text>
              <Ionicons style={styles.icon} name="caret-forward" color="#fff" />
            </View>
					</TouchableOpacity>
				</View> */}
          {/* <View style={styles.ratingsBox}>
					<View style={styles.ratingsDetails}>
						<Text style={styles.ratingsText}>CURRENT RATING</Text>
						<View style={styles.ratings}>
							<Text style={styles.ratingsFigure}>4.9</Text>
							<View style={styles.starIcon}>
								<Rating
									type='star'
									ratingCount={5}
									imageSize={15}
									// showRating
									// onFinishRating={this.ratingCompleted}
								/>
							</View>
						</View>
					</View>
						<TouchableOpacity onPress={()=> navigation.navigate('Root', { screen: 'Ratings' })}>
              <View style={styles.ratingsDetails2}>
                <Text style={styles.ratingsText2}>Rating</Text>
                <Ionicons style={styles.icon} name="caret-forward" color="#515155" />
              </View>
						</TouchableOpacity>
				</View> */}
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    deliveries: state.DeliveriesReducer,
    auth: state.AuthReducer.user.user,
  };
};

export default connect(mapStateToProps, { getConfirmedDeliveries })(Home);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  view: {
    marginTop: 85,
    marginLeft: 22,
    marginRight: 22,
  },
  welcomeText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    height: 72,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 30,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  loadingText: {
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 32,
    color: "#7F8284",
  },
  arrowLoading: {
    flexDirection: "row",
  },
  instruction: {
    color: "#68686A",
    fontWeight: "normal",
    marginTop: 20,
    fontSize: 16,
  },
  earningsBox: {
    height: 72,
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#2B6684",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
  },
  modalBody: {
    height: 230,
    width: Dimensions.get("window").width * 0.9,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 30,
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
  noDelivery: {
    height: 150,
    width: Dimensions.get("window").width * 0.9,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 30,
    paddingLeft: 20,
    justifyContent: "center",
    alignItems: "center",
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
  noDeliveryText: {
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10
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
    marginTop: 20,
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
  headerText: {
    color: "#2B6684",
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 12,
  },
  ratingsBox: {
    height: 72,
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 3,
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
    marginTop: 80,
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
    elevation: 10,
  },
  ratings: {
    flexDirection: "row",
  },
  ratingsFigure: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  earningsText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
  },
  ratingsText: {
    fontWeight: "500",
    fontSize: 12,
    color: "#68686A",
  },
  earningsAmount: {
    fontSize: 18,
    paddingTop: 8,
    fontWeight: "bold",
    fontStyle: "normal",
    color: "#fff",
  },
  earningsText2: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#fff",
  },
  ratingsText2: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#68686A",
  },
  starIcon: {
    marginTop: 12,
    marginLeft: 6,
  },
  icon: {
    marginLeft: 5,
    marginTop: 2,
  },
  earningDetails2: {
    flexDirection: "row",
  },
  ratingsDetails2: {
    flexDirection: "row",
  },
});
