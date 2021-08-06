import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import Toast from "react-native-root-toast";
import SpinnerButton from "react-native-spinner-button";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import { logoutAction, changePassword } from "../actions/authAction";
import { connect } from "react-redux";

function Settings({ logoutAction, auth, changePassword, navigation }) {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    text: "",
    check_textInputChange: false,
    secureTextEntry: true,
    secureTextEntryNew: true,
    isValidPassword: true,
  });
  const [isFocused, checkIsFocused] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isFocused2, checkIsFocused2] = useState(false);
  const logOut = () => {
    logoutAction();
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        newPassword: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        newPassword: val,
        isValidPassword: false,
      });
    }
  };

  const handlePasswordChange1 = (val) => {
    setData({
      ...data,
      oldPassword: val,
    });

  };

  const checkFocusPass = () => {
    checkIsFocused2({ isFocused: !isFocused });
  };

  const checkFocus = () => {
    checkIsFocused({ isFocused: !isFocused });
  };

  const checkBlurPass = () => {
    checkIsFocused2(false);
  };

  const checkBlur = () => {
    checkIsFocused(false);
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateSecureTextEntryNew = () => {
    setData({
      ...data,
      secureTextEntryNew: !data.secureTextEntryNew,
    });
  };

  
  const onSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    // setDisableBtn(true)
    changePassword(auth.email, data)
      .then((message) => {
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
        });
        setLoader(false);
        setTimeout(() => {
          Toast.hide(toast);
          
          navigation.navigate("DrawerNavigationRoutes", { screen: "Home" });
        }, 3000);
      })
      .catch((message) => {
        console.log(message)
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
        });
        Toast.hide(toast);
        // setDisableBtn(false)
        setLoader(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DrawerNavigationRoutes", { screen: "Home" })
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
            <Text style={styles.earning}>Settings</Text>
            <TouchableOpacity onPress={logOut}>
              <View style={styles.iconsRight}>
                <Ionicons
                  style={styles.iconArrow}
                  size={20}
                  name="log-out-outline"
                  color="#fff"
                />
                <Text style={styles.filterText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.background}>
      <View style={styles.footer}>
        <Text
          style={[
            styles.text_footer,
            {
              color: "#7F8284",
              fontSize: 12,
              marginTop: 35,
              justifyContent: "flex-start",
              alignItems: "flex-start"
            },
          ]}
        >
          Old Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#7F8284" size={18} />
          <TextInput
            placeholder="Old Password"
            placeholderTextColor="#7F8284"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: "#424648",
                fontWeight: "500",
                fontSize: 14,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange1(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: "#7F8284",
              fontSize: 12,
              marginTop: 35,
            },
          ]}
        >
          New Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#7F8284" size={18} />
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#7F8284"
            secureTextEntry={data.secureTextEntryNew ? true : false}
            style={[
              styles.textInput,
              {
                color: "#424648",
                fontWeight: "500",
                fontSize: 14,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntryNew}>
            {data.secureTextEntryNew ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </View>
        )}
        <View style={styles.buttonCont}>
          <SpinnerButton
            buttonStyle={styles.acceptBtn}
            isLoading={loader}
            onPress={onSubmit}
            indicatorCount={10}
          >
            <Text
              style={[
                styles.acceptText,
                {
                  color: "#fff",
                },
              ]}
            >
              Save Changes
            </Text>
          </SpinnerButton>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.AuthReducer.user.user,
  };
};

export default connect(mapStateToProps, { logoutAction, changePassword })(Settings);

const styles = StyleSheet.create({
  background: {
    flex: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHeader: {
    paddingTop: 50,
  },
  header: {
    // flex: 1,
    backgroundColor: "#2B6684",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 4,
    paddingBottom: 7,
  },
  footer: {
    flex: 4,
    paddingLeft: 20,
    paddingRight: 20,
  },

  icon: {
    marginTop: 20,
  },
  rating: {
    marginTop: 30,
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal",
  },
  buttonCont: {
    justifyContent: "center",
    marginTop: 70
  },
  acceptBtn: {
    height: 56,
    width: Dimensions.get("window").width * 0.9,
    color: "white",
    backgroundColor: "#2B6684",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  acceptText: {
    color: "white",
    fontSize: 16,
    fontWeight: "normal",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  titleCal: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
  },
 
  iconArrow: {
    marginLeft: 4,
  },
  iconsRight: {
    flexDirection: "row",
  },
  filterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 5,
    paddingTop: 2,
  },
  earning: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#CBCECF",
    paddingBottom: 5,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
