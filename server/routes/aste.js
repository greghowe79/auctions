import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import { richiediAccesso, auctionOwner } from "../middlewares";

// controllers
import {
  create,
  getOne,
  getAuctions,
  makeOffer,
  image,
  sellerAuctions,
  update,
  userAuctionOffers,
} from "../controllers/aste";

router.post("/create", richiediAccesso, formidable(), create);
router.get("/auctions/:id", getOne);
router.get("/auctions", getAuctions);
router.post("/makeoffer", richiediAccesso, makeOffer);

router.get("/auction/image/:auctionId", image);
router.get("/seller-auctions", richiediAccesso, sellerAuctions);

router.put(
  "/update-auction/:id",
  richiediAccesso,
  auctionOwner,
  formidable(),
  update
);

// offers
router.get("/user-auction-offers", richiediAccesso, userAuctionOffers);
module.exports = router;
