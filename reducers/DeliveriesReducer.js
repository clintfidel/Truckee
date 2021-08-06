import { ALL_DELIVERIES, SINGLE_DELIVERY, CONFIRMED_DELIVERIES, ACCEPT_DELIVERY, FINISH_DELIVERY } from '../actions/types';

const initialState = {
    message: '',
    allDeliveries: [],
    confirmedDeliveries: [],
    singleDelivery: {},
    acceptDelivery: {},
    finishDelivery: {}
  };

  /**
   * @description - Investment reducer
   *
   * @param {Object} state - Default application state
   *
   * @param {Object} action - Response from the API
   *
   * @returns {Object} - Object containing new state
   */
  
   const DeliveriesReducer = (state = initialState, action) => {
    switch (action.type) {
    case ALL_DELIVERIES:
  
      return {
        ...state,
        allDeliveries: action.orders,
      };
      case CONFIRMED_DELIVERIES:
      return {
        ...state,
        confirmedDeliveries: action.orders,
      };
    case SINGLE_DELIVERY:
      return {
        ...state,
        singleDelivery: action.order,
      };
    case ACCEPT_DELIVERY:
      return {
        ...state,
        acceptDelivery: action.order,
      };
    case FINISH_DELIVERY:
      return {
        ...state,
        finishDelivery: action.order,
      };
    default:
      return state;
    }
}

export default DeliveriesReducer