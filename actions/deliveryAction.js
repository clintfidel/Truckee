import axios from "axios";
import { ALL_DELIVERIES, CONFIRMED_DELIVERIES, SINGLE_DELIVERY, ACCEPT_DELIVERY, FINISH_DELIVERY } from "./types";

export const getAllDeliveries = () => (dispatch) =>
  axios
    .get("https://shopnow.azurewebsites.net/truckee/deliveries")
    .then((response) => {
      dispatch({
        type: ALL_DELIVERIES,
        orders: response.data.orders,
      });
    })
    .catch((error) => Promise.reject(error.response.data.message));

export const getSingleDelivery = (id) => (dispatch) =>
  axios
    .get(`https://shopnow.azurewebsites.net/truckee/delivery/${id}`)
    .then((response) => {
      dispatch({
        type: SINGLE_DELIVERY,
        order: response.data.orders,
      });
    })
    .catch((error) => Promise.reject(error.response.data.message));

export const getConfirmedDeliveries = () => (dispatch) =>
  axios
    .get("https://shopnow.azurewebsites.net/truckee/new/deliveries")
    .then((response) => {
      dispatch({
        type: CONFIRMED_DELIVERIES,
        orders: response.data.orders,
      });
    })
    .catch((error) => Promise.reject(error.response.data.message));

  export const acceptDelivery = (id, details) => (dispatch) =>
    axios
      .patch(`https://shopnow.azurewebsites.net/truckee/delivery/${id}`, details)
      .then((response) => {
        dispatch({
          type: ACCEPT_DELIVERY,
          order: response.data.order,
        });
      })
      .catch((error) => Promise.reject(error.response));
      
  export const finishDelivery = (id) => (dispatch) =>
    axios
      .patch(`https://shopnow.azurewebsites.net/truckee/${id}`)
      .then((response) => {
        console.log(response, 'finished')
        dispatch({
          type: FINISH_DELIVERY,
          order: response.data.order,
        });
      })
      .catch((error) => Promise.reject(error.response.data));
