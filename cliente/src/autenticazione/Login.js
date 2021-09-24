import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/autenticazione";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("INVIA I DATI DEL LOGIN", { email, password });
    try {
      let res = await login({ email, password });

      if (res.data) {
        console.log(
          "SALVA LA RISPOSTA DELL' UTENTE IN REDUX E NEL LOCAL STORAGE POI EFFETTUA IL REDIRECT =======>"
        );
        // console.log(res.data);
        // salvare lo user e il token nel locale storage
        window.localStorage.setItem("autenticazione", JSON.stringify(res.data));
        // salvare lo user e il token in redux
        dispatch({
          type: "UTENTE_LOGGATO",
          payload: res.data,
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error("err.response.data");
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
