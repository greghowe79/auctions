import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const { autenticazione } = useSelector((state) => ({ ...state }));
  return autenticazione && autenticazione.token ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
