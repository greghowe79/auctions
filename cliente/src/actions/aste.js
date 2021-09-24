import axios from "axios";

export const create = async (asta, token) => {
  await axios.post(`${process.env.REACT_APP_API}/create`, asta, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const makeOffer = async (offer, id, token) => {
  await axios.post(
    `${process.env.REACT_APP_API}/makeoffer`,
    {
      offer: offer,
      auctionID: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAuctions = async () =>
  await axios.get(`${process.env.REACT_APP_API}/auctions`);

export const sellerAuctions = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-auctions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getOne = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/auctions/${id}`);

export const updateAuction = async (token, data, id) =>
  await axios.put(`${process.env.REACT_APP_API}/update-auction/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const userAuctionOffers = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user-auction-offers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
