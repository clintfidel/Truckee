import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';

function Ratings({navigation}) {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={()=> navigation.navigate('DrawerNavigationRoutes', { screen: 'Home' })}>
              <Ionicons style={styles.icon} size={20} name="arrow-back-circle-outline" color="#fff" />
            </TouchableOpacity>
            <Text style={styles.rating}>Rating</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerRatingsText}>Your current rating</Text>
          <Text style={styles.footerRatingsFigure}>5</Text>
          <View style={styles.starIcon}>
            <AirbnbRating
              type='custom'
              ratingCount={5}
              size={50}
              showRating={false}
              defaultRating={5}
              starContainerStyle=""
              readonly={false}
              // ratingContainerStyle={{ paddingRight: 10 }} 
              // showRating
              // onFinishRating={this.ratingCompleted}
            />
          </View>
          <View style={styles.ratingsInfo}>
            <View style={styles.ratingInfoView}>
              <AirbnbRating
                type='custom'
                defaultRating={5}
                ratingCount={5}
                size={20}
                showRating={false}
                readonly={true}
                ratingBackgroundColor="transparent"
              />
              <Text style={styles.ratingsInfoText}>Excellent</Text>
            </View>
            <View style={styles.ratingInfoView}>
              <AirbnbRating
                type='custom'
                defaultRating={4}
                ratingCount={5}
                size={20}
                showRating={false}
                readonly={true}
                ratingBackgroundColor="transparent"
              />
              <Text style={styles.ratingsInfoText}>Good</Text>
            </View>
            <View style={styles.ratingInfoView}>
              <AirbnbRating
                type='custom'
                defaultRating={3}
                ratingCount={5}
                size={20}
                showRating={false}
                readonly={true}
                ratingBackgroundColor="transparent"
              />
              <Text style={styles.ratingsInfoText}>Average</Text>
            </View>
            <View style={styles.ratingInfoView}>
              <AirbnbRating
                type='custom'
                defaultRating={2}
                ratingCount={5}
                size={20}
                showRating={false}
                readonly={true}
                ratingBackgroundColor="transparent"
              />
              <Text style={styles.ratingsInfoText}>Below Average</Text>
            </View>
            <View style={styles.ratingInfoView}>
              <AirbnbRating
                type='custom'
                defaultRating={1}
                ratingCount={5}
                size={20}
                showRating={false}
                readonly={true}
                ratingBackgroundColor="transparent"
              />
              <Text style={styles.ratingsInfoText}>Poor</Text>
            </View>
          </View>
        </View>
      </View>
  )
}

export default Ratings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHeader: {
    paddingTop: 50
  },
  header: {
    flex: 1,
    backgroundColor: '#2B6684',
    paddingLeft: 15,
    paddingTop: 4
  },
  footer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    marginTop: 20
  },
  rating: {
    marginTop: 30,
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal"
  },
  footerRatingsText: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#000000",
    marginBottom: 10
  },
  ratingsInfo: {
    width: Dimensions.get("window").width * 0.7,
    height: 270,
    backgroundColor: "#F7F8FF",
    borderRadius: 8,
    marginTop: 50,
    marginBottom: 90,
    justifyContent: "center",
    padding: 35
  },
  footerRatingsFigure: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "normal",
    marginTop: 10,
    marginBottom: 10
  },
  ratingInfoView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  ratingsInfoText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "normal",
    marginTop: 3,
    marginLeft: 10
  }
})