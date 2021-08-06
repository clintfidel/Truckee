import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import DeliveriesReducer from "./DeliveriesReducer"


const rootReducer = combineReducers({
  AuthReducer,
  DeliveriesReducer
});
  
  export default rootReducer;