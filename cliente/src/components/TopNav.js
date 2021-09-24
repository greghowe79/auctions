import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

const TopNav = () => {
  const dispatch = useDispatch();
  const { autenticazione } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: "DISCONNESSIONE",
      payload: null,
    });
    window.localStorage.removeItem("autenticazione");
    history.push("/login");
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>

      {autenticazione !== null && (
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      )}

      {autenticazione !== null && (
        <button className="nav-link pointer" onClick={logout}>
          Logout
        </button>
      )}

      {autenticazione === null && (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/registrati">
            Registrati
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
