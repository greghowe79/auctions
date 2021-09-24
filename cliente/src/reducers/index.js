import { combineReducers } from "redux";
import { autenticazioneReducer } from "./autenticazione";

const rootReducer = combineReducers({
  autenticazione: autenticazioneReducer,
});

export default rootReducer;
