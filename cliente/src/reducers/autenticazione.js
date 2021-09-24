let userState;

if (window.localStorage.getItem("autenticazione")) {
  userState = JSON.parse(window.localStorage.getItem("autenticazione"));
} else {
  userState = null;
}

export const autenticazioneReducer = (state = userState, action) => {
  switch (action.type) {
    case "UTENTE_LOGGATO":
      return { ...state, ...action.payload };
    case "DISCONNESSIONE":
      return action.payload;
    default:
      return state;
  }
};
