import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Delivery({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.modalBody}>
          <View style={styles.modalHeader}>
						<Ionicons style={styles.iconArrow} size={60} name="checkmark-circle" color="#2B6684" />
            <Text style={styles.acceptDelivery}>Delivery accepted!</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonCont}>
          <View style={styles.acceptBtn}>
            <TouchableOpacity onPress={()=> navigation.navigate('Root', { screen: "ActiveDeliveries"})}>
              <Text style={styles.acceptText}>Okay thanks, Continue</Text>
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
    height: 200,
    width: Dimensions.get("window").width * 0.9,
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
    justifyContent: "center",
		alignItems: "center",
  },
	acceptDelivery: {
		color: "#424648",
		fontSize: 16
	},
	footer: {
    flex: 1,
    backgroundColor: "#fff",
		alignItems: "center",
  },
	buttonCont: {
    justifyContent: "center",
  },
  acceptBtn: {
    height: 56,
    width: Dimensions.get("window").width * 0.9,
    color: "white",
    backgroundColor: "#2B6684",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  acceptText: {
    color: "white",
    fontSize: 16,
    fontWeight: "normal"
  }
});

export default Delivery;
