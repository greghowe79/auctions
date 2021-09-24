import { useState } from "react";
import { toast } from "react-toastify";
import { create } from "../actions/aste";
import { useSelector } from "react-redux";
import AstaCreateForm from "../components/forms/AstaCreateForm";

const NewAuction = ({ history }) => {
  // redux
  //const token = useSelector((state) => state.autenticazione.token);
  const { autenticazione } = useSelector((state) => ({ ...state }));
  const { token } = autenticazione;
  // state
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    startingOffer: "",
    endTime: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  // destructuring variables from state
  const { title, description, image, startingOffer, endTime } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    let auctionData = new FormData();
    auctionData.append("title", title);
    auctionData.append("description", description);
    auctionData.append("startingOffer", startingOffer);
    image && auctionData.append("image", image);
    auctionData.append("endTime", endTime);

    console.log([...auctionData]);

    try {
      let res = await create(auctionData, token);
      console.log("AUCTION CREATE RES", res);
      toast.success("New auction is posted");
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Auction</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <AstaCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAuction;
