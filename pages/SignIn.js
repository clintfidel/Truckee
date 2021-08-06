import React, { useEffect, useState } from "react";
import SpinnerButton from "react-native-spinner-button";
import Toast from "react-native-root-toast";
import {
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { loginAction } from "../actions/authAction";
import { connect } from "react-redux";

const SignIn = ({ navigation, loginAction }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    text: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isFocused: false,
    isValidPassword: true,
  });
  const [isFocused, checkIsFocused] = useState(false);
  const [isFocused2, checkIsFocused2] = useState(false);
  const [loader, setLoader] = useState(false);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        text: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        text: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const checkFocus = () => {
    checkIsFocused({ isFocused: !isFocused });
  };
  const checkFocusPass = () => {
    checkIsFocused2({ isFocused2: !isFocused2 });
  };
  const checkBlur = () => {
    checkIsFocused(false);
  };
  const checkBlurPass = () => {
    checkIsFocused2(false);
  };

  const handlePasswordChange = (val) => {
    checkIsFocused(true)
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    checkIsFocused(true)
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    checkIsFocused(true)
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  /**
   * @description - handles the onSubmit event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  const onSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    // setDisableBtn(true)
    loginAction(data)
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
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
        });
        Toast.hide(toast);
        // setDisableBtn(false)
        setLoader(false);
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.footer}>
        <Text
          style={[
            styles.text_footer,
            {
              color: "#7F8284",
              fontSize: 12,
            },
          ]}
        >
          Email address
        </Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#7F8284" size={18} />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#7F8284"
            style={[
              styles.textInput,
              {
                color: "#424648",
                fontWeight: "500",
                fontSize: 14,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Email must be 4 characters long.
            </Text>
          </View>
        )}

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
         Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#7F8284" size={18} />
          <TextInput
            placeholder="Password"
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
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
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

        <TouchableOpacity>
          <Text
            style={{
              color: "#424648",
              marginTop: 35,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <SpinnerButton
            buttonStyle={styles.signIn}
            isLoading={loader}
            onPress={onSubmit}
            indicatorCount={10}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Log In
            </Text>
          </SpinnerButton>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default connect(null, { loginAction })(SignIn);

const styles = StyleSheet.create({
  footer: {
    margin: 20,
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
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#CBCECF",
    paddingBottom: 5,
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
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#2B6684",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
