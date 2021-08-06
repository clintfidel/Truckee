import {
    SET_CURRENT_USER,
    GET_ALL_USERS
  } from '../actions/types';
  
  const initialState = {
    user: {},
    token: null,
    authenticated: false,
    message: '',
    imageUrl: '',
    users: []
  };
  
  /**
   * @description - User authentication reducer
   *
   * @param {Object} state - Default application state
   *
   * @param {Object} action - Response from the API
   *
   * @returns {Object} - Object containing new state
   */
  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user, token: action.token, authenticated: action.authenticated };
    case GET_ALL_USERS: {
      return { ...state, users: action.users };
    }
    default:
      return state;
    }
  };
  export default AuthReducer;