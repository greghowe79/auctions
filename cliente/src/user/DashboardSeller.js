import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//import { HomeOutlined } from "@ant-design/icons";
//import { creaAccountConnessione } from "../actions/stripe";
import { sellerAuctions } from "../actions/aste";
import SmallCard from "../components/cards/SmallCard";
//import { toast } from "react-toastify";

const DashboardSeller = () => {
  const { autenticazione } = useSelector((state) => ({ ...state }));
  const [auctions, setAuctions] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellersAuctions();
  }, []);

  const loadSellersAuctions = async () => {
    let { data } = await sellerAuctions(autenticazione.token);
    setAuctions(data);
  };

  /* const handleClick = async () => {
    setLoading(true);
    try {
      let res = await creaAccountConnessione(autenticazione.token);
      console.log(res); // get login link
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Connessione Stripe fallita, Riprova.");
      setLoading(false);
    }
  }; */

  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Auctions</h2>
        </div>
        <div className="col-md-2">
          <Link to="/create" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
      <div className="row">
        {auctions.map((a) => (
          <SmallCard
            key={a._id}
            a={a}
            showViewMoreButton={false}
            owner={true}
          />
        ))}
      </div>
    </div>
  );

  /* const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Imposta il payout per pubblicare le camere d' Hotel</h4>
            <p className="lead">
              FSD collabora con stripe per trasferire i guadagni sul tuo conto
              bancario
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "In lavorazione..." : "Imposta il Payout"}
            </button>
            <p className="text-muted">
              <small>
                Sarai rindirizzato a Stripe per completare il processo di
                inserimento.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  ); */

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {/*  {autenticazione &&
      autenticazione.user &&
      autenticazione.user.stripe_seller &&
      autenticazione.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()} */}

      {connected()}

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </>
  );
};

export default DashboardSeller;
