import React from "react";
import { StyleSheet, ScrollView, Dimensions, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dot from "../assets/dot.svg"

function Earnings({navigation}) {
  return (
    <ScrollView
    style={styles.backgroundColor}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={()=> navigation.navigate('DrawerNavigationRoutes', { screen: 'Home' })}>
              <Ionicons style={styles.icon} size={20} name="arrow-back-circle-outline" color="#fff" />
            </TouchableOpacity>
            <View style={styles.titleCal}>
              <Text style={styles.earning}>Earnings</Text>
                <TouchableOpacity onPress={()=> console.log('1')}>
                  <View style={styles.iconsRight}>
                    <Ionicons style={styles.iconCal} size={20} name="calendar" color="#fff" />
                    <Text style={styles.date}>Feb. 6, 2021</Text>
                    <Ionicons style={styles.iconArrow} size={20} name="caret-down" color="#fff" />
                  </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
        <ScrollView
          style={styles.backgroundColor}>
            <View style={styles.earningsBoxCont}>
            <View style={styles.earningsBox}>
              <View style={styles.textDetails}>
                <Text style={styles.earningsText}>TODAY’S EARNINGS</Text>
                <Text style={styles.earningsAmount}>₦5,000</Text>
              </View>
            </View>
          </View>
          <View style={styles.earningsBreakdown}>
            <View>
              <Text style={styles.breakdownText}>This Week</Text>
              <Text style={styles.breakdownAmount}>#23,000</Text>
            </View>
            <View>
              <Text style={styles.breakdownText}>This Month</Text>
              <Text style={styles.breakdownAmount}>#23,000</Text>
            </View>
            <View>
              <Text style={styles.breakdownText}>All Time</Text>
              <Text style={styles.breakdownAmount}>#72,000</Text>
            </View>
          </View>
          <View style={styles.earningsBreakdownList}>
            <Text style={styles.earningsDate}>February 2021</Text>
            <View style={styles.dateText}>
              <View style={styles.dottedDate}>
                <Image style={styles.dotImage} source={dot} />
                <Text style={styles.detailsDate}>Feb. 21, 2021</Text>
              </View>
              <Text style={styles.detailsAmount}>₦23,000</Text>
            </View>
            <View style={styles.dateText}>
              <View style={styles.dottedDate}>
                <Image style={styles.dotImage} source={dot} />
                <Text style={styles.detailsDate}>Mar. 19, 2021</Text>
              </View>
              <Text style={styles.detailsAmount}>₦23,000</Text>
            </View>
          </View>
          <View style={styles.earningsBreakdownList}>
            <Text style={styles.earningsDate}>January 2021</Text>
            <View style={styles.dateText}>
              <View style={styles.dottedDate}>
                <Image style={styles.dotImage} source={dot} />
                <Text style={styles.detailsDate}>Jan. 2, 2021</Text>
              </View>
              <Text style={styles.detailsAmount}>₦23,000</Text>
            </View>
            <View style={styles.dateText}>
              <View style={styles.dottedDate}>
                <Image style={styles.dotImage} source={dot} />
                <Text style={styles.detailsDate}>Mar. 19, 2021</Text>
              </View>
              <Text style={styles.detailsAmount}>₦35,000</Text>
            </View>
            <View style={styles.dateText}>
              <View style={styles.dottedDate}>
                <Image style={styles.dotImage} source={dot} />
                <Text style={styles.detailsDate}>Jun. 29, 2021</Text>
              </View>
              <Text style={styles.detailsAmount}>₦42,000</Text>
            </View>
            <View style={styles.dateText}>
              <View style={styles.dottedDate}>
                <Image style={styles.dotImage} source={dot} />
                <Text style={styles.detailsDate}>Jan. 7, 2021</Text>
              </View>
              <Text style={styles.detailsAmount}>₦31,000</Text>
            </View>
          </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  )
}

export default Earnings;

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: "#fff",
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
    flex: 1,
    backgroundColor: '#2B6684',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4
  },
  footer: {
    flex: 4,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: "scroll"
  },
  titleCal: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30
  },
  iconCal: {
    marginRight: 8
  },
  iconArrow: {
    marginLeft: 4,
  },
  iconsRight: {
    flexDirection: "row"
  },
  earning: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal"
  },
  date: {
    fontWeight: "normal",
    fontSize: 14,
    marginTop: 4,
    color: "#fff"
  },
  earningsBox: {
		height: 72,
		width: Dimensions.get("window").width * 0.9,
		backgroundColor: "#2B6684",
		flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
		padding: 15,
    marginTop: 40
	},
  earningsText: {
		color: "#fff",
		fontWeight: "500",
		fontSize: 12
	},
  textDetails: {
    alignItems: "center"
  },
  earningsAmount: {
		fontSize: 24,
		paddingTop: 8,
		fontWeight: "bold",
		fontStyle: "normal",
		color: "#fff",
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
    color: "#68686A"
  },
  earningsBoxCont: {
    justifyContent: "center",
    alignItems: "center"
  },
  breakdownAmount: {
    fontSize: 15,
    fontWeight: "bold"
  }, 
  earningsBreakdownList: {
    paddingLeft: 15,
    marginTop: 40
  },
  earningsDate: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 40,
    color: "#68686A"
  },
  dateText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  dottedDate: {
    flexDirection: "row"
  },
  dotImage: {
    marginTop: 5,
    marginRight: 10,
    backgroundColor: "#8691B1",
    borderRadius: 2
  },
  detailsDate: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#68686A"
  },
  detailsAmount: {
    fontWeight: "normal",
    color: "#000000",
    fontSize: 15,
    paddingRight: 30
  }
})