import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Support({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
            <Ionicons style={styles.iconBack} size={20} name="arrow-back-circle-outline" color="#fff" />
          </TouchableOpacity>
          <Text style={styles.support}>Support</Text>
        </View>
      </View>
      <ScrollView
        style={styles.background}>
      <View style={styles.footer}>
        <View style={styles.customerContactCont}>
          <Text style={styles.customerTitle}>Contact us by phone</Text>
          <View style={styles.customerNameCont}>
            <Ionicons style={styles.icon} size={20} name="call" color="#9CACBF" />
            <Text style={styles.customerName}>08017449078</Text>
          </View>
          <View style={styles.customerNameCont}>
            <Ionicons style={styles.icon} size={20} name="call" color="#9CACBF" />
            <Text style={styles.customerName}>08012345678</Text>
          </View>

          <Text style={styles.customerTitle2}>Contact us by email</Text>
          <View style={styles.customerNameCont}>
            <Ionicons style={styles.icon} size={20} name="mail" color="#9CACBF" />
            <Text style={styles.customerName}>support@truckee.com</Text>
          </View>
          <Text style={styles.customerTitle3}>Frequently Asked Questions</Text>
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
    paddingTop: 70
  },
  header: {
    // flex: 1,
    backgroundColor: '#2B6684',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
    paddingBottom: 7
  },
  footer: {
    flex: 4,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: "scroll"
  },

  support: {
    marginTop: 30,
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal"
  },
  customerContactCont: {
    paddingTop: 15
  },
  customerNameCont: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    flexDirection: "row"
  },
  customerTitle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#2B6684",
    paddingTop: 15,
    paddingLeft: 9
  },
  customerTitle2: {
    fontWeight: "500",
    fontSize: 18,
    color: "#2B6684",
    paddingTop: 38,
    paddingLeft: 9
  },
  customerTitle3: {
    fontWeight: "500",
    fontSize: 18,
    color: "#2B6684",
    paddingTop: 48,
    paddingLeft: 9
  },
  customerName: {
    fontSize: 16,
    color: "#424648",
    paddingLeft: 10
  },
  call: {
    borderRadius: 17,
    padding: 7,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: "#9CACBF",
    marginLeft: 150
  },
  callText: {
    color: "#FFFFFF"
  },
})

export default Support;
