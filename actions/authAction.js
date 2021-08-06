import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";
import setAuthorization from "../utils/authorization";
import { SET_CURRENT_USER, USER_LOGOUT } from "./types";

/**
 * @description - Set current user
 *
 * @param {Object} user - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function setCurrentUser(user, token) {
  return {
    type: SET_CURRENT_USER,
    user,
    authenticated: true,
    token
  };
}

/**
* @description Request to the  API to register a new user
*
* @param {object} userDetails - 
*
* @return {object} dispatch object
*/

export const registerAction = userDetails => dispatch => axios
.post('https://truckee.azurewebsites.net/driver/auth/', userDetails)
.then((response) => {
  const { token } = response.data;
  setAuthorization(token);
  AsyncStorage.setItem('token', token);
  const currentUser = jwtDecode(token);
  dispatch(setCurrentUser(currentUser, token));
  return response.data.msg;
})
.catch(error => {
  Promise.reject(error.response.data.msg)
});

/**
* @description Request to the  API to log in a user
*
* @param {object} userDetails - 
*
* @return {object} dispatch object
*/
export const loginAction = userDetails => dispatch => axios
.post('https://truckee.azurewebsites.net/driver/auth/login', userDetails)
.then((response) => {
  const { token } = response.data;
  setAuthorization(token);
  AsyncStorage.setItem('token', token);
  const currentUser = jwtDecode(token);
  dispatch(setCurrentUser(currentUser, token));
  return response.data.msg;
})
.catch(error => {
  Promise.reject(error.response.data.msg)
});

/**
* @description Request to the  API to log in a user
*
* @param {object} userDetails - 
*
* @return {object} dispatch object
*/

export const changePassword = (email, userDetails) => (dispatch) => axios
.post(`https://truckee.azurewebsites.net/driver/auth/changepassword/${email}`, userDetails)
.then((response) => {
  const { token } = response.data;
  setAuthorization(token);
  AsyncStorage.setItem('token', token);
  const currentUser = jwtDecode(token);
  dispatch(setCurrentUser(currentUser, token));
  return response.data.msg;
})
.catch(error => {
  Promise.reject(error.response.data.msg)
});

/**
 * @description Request to the  API to log out a user
 *
 * @return {object} dispatch object
 */
 export const logoutAction = () => (dispatch) => {
  AsyncStorage.removeItem('token');
    setAuthorization(false);
    const currentUser = {
      type: USER_LOGOUT,
      user: {},
      authenticated: false
    };
    const token = null
    dispatch(setCurrentUser(currentUser, token))
  };
