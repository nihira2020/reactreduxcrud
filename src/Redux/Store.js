
import { CompanyReducer } from "./Reducer";
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer=combineReducers({company:CompanyReducer})
const Store=configureStore({reducer:rootreducer,middleware:[thunk,logger]})
export default Store;