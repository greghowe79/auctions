import { useState } from "react";
import { toast } from "react-toastify";
import { makeOffer } from "../actions/aste";
import { useSelector } from "react-redux";
import OfferCreateForm from "../components/forms/OfferCreateForm";

const NewOffer = ({ history, match }) => {
  // redux
  //const token = useSelector((state) => state.autenticazione.token);
  const { autenticazione } = useSelector((state) => ({ ...state }));
  const { token } = autenticazione;
  // state
  const [values, setValues] = useState({
    newOffer: "",
  });

  // destructuring variables from state
  const { newOffer } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    try {
      let res = await makeOffer(newOffer, match.params.id, token);
      console.log("OFFER CREATE RES", res);
      toast.success("New offer is posted");
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Offer Too High");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Make Your Offer</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <OfferCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewOffer;
