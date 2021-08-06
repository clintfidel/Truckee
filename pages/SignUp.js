import React, { useState } from "react";
import { registerAction } from "../actions/authAction"
import SpinnerButton from "react-native-spinner-button";
import Toast from 'react-native-root-toast';
import {
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  View,
  CheckBox,
  Dimensions,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";

const Signup = ({ navigation, registerAction }) => {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    license: "",
    text: "",
    subscribed: 1,
    firstNameInputChange: false,
    phoneNumberInputChange: false,
    lastNameInputChange: false,
    check_emailInputChange: false,
    check_licenceInputChange: false,
    secureTextEntry: true,
    isValidUserEmail: true,
    isValidUserFirstName: true,
    isValidUserLastName: true,
    isValidUserLicence: true,
    isValidUserPhoneNumber: true,
    isValidUser: true,
    isFocused: false,
    isValidPassword: true,
  });
  const [isFocused, checkIsFocused] = React.useState(false);
  const [isFocused2, checkIsFocused2] = React.useState(false);
  const [isFocused3, checkIsFocused3] = React.useState(false);
  const [isFocused4, checkIsFocused4] = React.useState(false);
  const [isFocused5, checkIsFocused5] = React.useState(false);
  const [isFocused1, checkIsFocused1] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [isSelected, setSelection] = React.useState(false);

  const lastNameInputChangeFunc = (val) => {
    if (val.trim().length > 3) {
      setData({
        ...data,
        lastName: val,
        text: val,
        lastNameInputChange: true,
        isValidUserLastName: true,
      });
    } else {
      setData({
        ...data,
        lastName: val,
        text: val,
        lastNameInputChange: false,
        isValidUserLastName: false,
      });
    }
  };

  const firstNameInputChangeFunc = (val) => {
    if (val.trim().length > 3) {
      setData({
        ...data,
        firstName: val,
        text: val,
        firstNameInputChange: true,
        isValidUserFirstName: true,
      });
    } else {
      setData({
        ...data,
        firstName: val,
        text: val,
        firstNameInputChange: false,
        isValidUserFirstName: false,
      });
    }
  };

  const emailInputChange = (val) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val.trim())) {
      setData({
        ...data,
        email: val,
        text: val,
        check_emailInputChange: true,
        isValidUserEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        text: val,
        check_emailInputChange: false,
        isValidUserEmail: false,
      });
    }
  };

  const phoneNumberInputChangeFunc = (val) => {
    if (val.trim().length > 10 && val.trim().length < 14) {
      setData({
        ...data,
        phoneNumber: val,
        text: val,
        phoneNumberInputChange: true,
        isValidUserPhoneNumber: true,
      });
    } else {
      setData({
        ...data,
        phoneNumber: val,
        text: val,
        phoneNumberInputChange: false,
        isValidUserPhoneNumber: false,
      });
    }
  };

  const licenceInputChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        license: val,
        text: val,
        check_licenceInputChange: true,
        isValidUserLicence: true,
      });
    } else {
      setData({
        ...data,
        license: val,
        text: val,
        check_licenceInputChange: false,
        isValidUserLicence: false,
      });
    }
  };

  const selectCheckbox = () => {
    setSelection({ isSelected: !isSelected });
  };
  const checkFocusFirstName = () => {
    checkIsFocused({ isFocused: !isFocused });
  };
  const checkFocusLastName = () => {
    checkIsFocused1({ isFocused1: !isFocused1 });
  };
  const checkFocusPass = () => {
    checkIsFocused2({ isFocused2: !isFocused2 });
  };
  const checkBlurFirstName = () => {
    checkIsFocused(false);
  };
  const checkBlurLastName = () => {
    checkIsFocused1(false);
  };
  const checkBlurPhoneNumber = () => {
    checkIsFocused5(false);
  };
  const checkBlurPass = () => {
    checkIsFocused2(false);
  };
  const checkBlurEmail = () => {
    checkIsFocused3(false);
  };
  const checkBlurLicence = () => {
    checkIsFocused4(false);
  };
  const checkFocusEmail = () => {
    checkIsFocused3({ isFocused3: !isFocused3 });
  };
  const checkFocusLicence = () => {
    checkIsFocused4({ isFocused4: !isFocused4 });
  };
  const checkFocusPhoneNumber = () => {
    checkIsFocused5({ isFocused5: !isFocused5})
  }
  const handlePasswordChange = (val) => {
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
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUserFirstName = (val) => {
    if (val.trim().length > 3) {
      setData({
        ...data,
        isValidUserFirstName: true,
      });
    } else {
      setData({
        ...data,
        isValidUserFirstName: false,
      });
    }
  };
  const handleValidUserLastName = (val) => {
    if (val.trim().length > 3) {
      setData({
        ...data,
        isValidUserLastName: true,
      });
    } else {
      setData({
        ...data,
        isValidUserLastName: false,
      });
    }
  };

  const handleValidUserPhoneNumber = (val) => {
    if (val.trim().length > 10 && val.trim().length < 14) {
      setData({
        ...data,
        isValidUserPhoneNumber: true,
      });
    } else {
      setData({
        ...data,
        isValidUserPhoneNumber: false,
      });
    }
  };

  const handleValidUserEmail = (val) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val.trim())) {
      setData({
        ...data,
        isValidUserEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidUserEmail: false,
      });
    }
  };
  const handleValidUserLicence = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        isValidUserLicence: true,
      });
    } else {
      setData({
        ...data,
        isValidUserLicence: false,
      });
    }
  };
  const userDetails = {
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    license: data.license,
    subscribed: 1
  }

  const onSubmit = (event) => {
    setLoader(true)
    registerAction(data)
      .then((message) => {
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
        });
        setLoader(false);
        setTimeout(() => {
          Toast.hide(toast)
          navigation.navigate("DrawerNavigationRoutes", { screen: "Home" });
        }, 3000);
      })
      .catch((message) => {
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
        });
        Toast.hide(toast)        
        setLoader(false)
        // toastrOption();
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
          First name
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#7F8284" size={18} />
          <TextInput
            placeholder="First name"
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
            onChangeText={(val) => firstNameInputChangeFunc(val)}
            onEndEditing={(e) => handleValidUserFirstName(e.nativeEvent.text)}
          />
          {data.firstNameInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidUserFirstName ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              First Name must be 4 or more characters long.
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
          Last name
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#7F8284" size={18} />
          <TextInput
            placeholder="Last name"
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
            onChangeText={(val) => lastNameInputChangeFunc(val)}
            onEndEditing={(e) => handleValidUserLastName(e.nativeEvent.text)}
          />
          {data.lastNameInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidUserLastName ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Last Name must be 4 or more characters long.
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
            onChangeText={(val) => emailInputChange(val)}
            onEndEditing={(e) => handleValidUserEmail(e.nativeEvent.text)}
          />
          {data.check_emailInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidUserEmail ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Email must be a valid email address.
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
         Phone Number
        </Text>
        <View style={styles.action}>
          <FontAwesome name="phone" color="#7F8284" size={18} />
          <TextInput
            placeholder="Phone Number"
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
            onFocus={checkFocusPhoneNumber}
            onBlur={checkBlurPhoneNumber}
            onChangeText={(val) => phoneNumberInputChangeFunc(val)}
            onEndEditing={(e) => handleValidUserPhoneNumber(e.nativeEvent.text)}
          />
          {data.phoneNumberInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidUserPhoneNumber ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Enter a valid Phone Number.
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
        Driver’s License
        </Text>
        <View style={styles.action}>
          <FontAwesome name="" color="#7F8284" size={18} />
          <TextInput
            placeholder="Driver’s License"
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
            onChangeText={(val) => licenceInputChange(val)}
            onEndEditing={(e) => handleValidUserLicence(e.nativeEvent.text)}
          />
          {data.check_licenceInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidUserLicence ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              License must be 8 or more characters long.
            </Text>
          </View>
        )}
        {/* <View style={styles.updates}>
          <CheckBox
            value={isSelected}
            onValueChange={selectCheckbox}
            onPress={selectCheckbox}
            style={[
              styles.checkbox,
              {
                backgroundColor: isSelected ? "#2B6684" : "transparent",
              },
            ]}
          />
          <Text style={styles.updatesText}>
            I agree to recieve communicaitons about Truckee
          </Text>
        </View> */}
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
              Sign Up
            </Text>
          </SpinnerButton>
        </View>
        <Text
          style={[
            styles.updatesText,
            {
              marginTop: 35,
              textAlign: "center",
            },
          ]}
        >
          By continuing, you’re agreeing to our{" "}
          <Text
            style={[
              styles.updatesText,
              {
                textDecorationLine: "underline",
              },
            ]}
          >
            Terms of Service and Privacy Policy
          </Text>
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default connect(null, { registerAction })(Signup);
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
  updates: {
    flexDirection: "row",
    marginTop: 30,
  },
  updatesText: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#424648",
    marginLeft: 15,
    marginTop: 3,
  },
  checkbox: {
    alignSelf: "center",
    borderColor: "#CBCECF",
    width: 22,
    height: 22,
    borderRadius: 4,
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
    paddingTop: 5
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
    backgroundColor: "#2B6684"
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
