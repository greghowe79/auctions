import { useState, useEffect } from "react";
import { getAuctions } from "../actions/aste";
import SmallCard from "../components/cards/SmallCard";

const Home = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    loadAllauctions();
  }, []);

  const loadAllauctions = async () => {
    let res = await getAuctions();
    setAuctions(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Auctions</h1>
      </div>
      <div className="container-fluid">
        <br />
        {auctions?.data?.aste.map((a) => (
          <SmallCard key={a._id} a={a} />
        ))}
      </div>
    </>
  );
};

export default Home;
