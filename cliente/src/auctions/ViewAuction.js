import React, { useState, useEffect } from "react";
// import { useStore } from "react-redux";
import { getOne } from "../actions/aste";
import { useSelector } from "react-redux";

const ViewAuction = ({ match, history }) => {
  const { autenticazione } = useSelector((state) => ({ ...state }));
  const [auction, setAuction] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    loadSellerAuction();
  }, []);

  const loadSellerAuction = async () => {
    let res = await getOne(match.params.id);
    // console.log(res);
    setAuction(res.data);
    setImage(`${process.env.REACT_APP_API}/auction/image/${res.data._id}`);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{auction.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img
              src={image}
              alt={auction.title}
              className="img img-fluid m-2"
            />
          </div>

          <div className="col-md-6">
            <br />
            <b>{auction.description}</b>
            <p className="alert alert-info mt-3">${auction.startingOffer}</p>
            <p className="card-text">
              End Auction {new Date(auction.endTime).toLocaleDateString()} at{" "}
              {new Date(auction.endTime).toLocaleTimeString()}
            </p>
            <i>{`Posted by ${auction.ownerID && auction.ownerID.name}`}</i>
            <br />

            {(auction?.winner || [])[0]?.winner && (
              <i>{`Winner ${(auction?.winner || [])[0]?.winner}`}</i>
            )}

            <br />

            <button
              /* style={{
                display:
                  autenticazione && (autenticazione.user._id === auction.ownerID)
                    ? "none"
                    : "block",
              }} */
              onClick={() => history.push(`/makeoffer/${auction._id}`)}
              className="btn btn-block btn-lg btn-primary mt-3"
            >
              {autenticazione && autenticazione.token
                ? "Make Your Offer"
                : "Login to Make Your Offer"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAuction;
