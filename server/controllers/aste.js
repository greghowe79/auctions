import Asta from "../models/asta";
import Offer from "../models/offer";
import moment from "moment";
import fs from "fs";
import User from "../models/user";

// import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let auction = new Asta(fields);
    auction.ownerID = req.user._id;
    // handle image
    if (files.image) {
      auction.image.data = fs.readFileSync(files.image.path);
      auction.image.contentType = files.image.type;
    }

    auction.save((err, result) => {
      if (err) {
        console.log("saving auction err => ", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const getOne = async (req, res) => {
  let auction = await Asta.findById(req.params.id)
    .select("-image.data")
    .populate("ownerID")
    .exec();
  auction = await getWinner(auction);
  console.log("SINGLE Auction", auction);
  res.json(auction);
};

export const getWinner = async (auction) => {
  if (!moment(auction.endTime).isAfter(moment())) {
    if (
      !(
        typeof auction.offers != "undefined" &&
        auction.offers != null &&
        auction.offers.length > 0
      )
    ) {
    } else {
      let min = auction.offers[0].amount;
      let index = 0;
      for (let i = 1; i < auction.offers.length; i++) {
        if (auction.offers[i].amount < min) {
          min = auction.offers[i].amount;
          index = i;
        }
      }
      const userId = auction.offers[index].userId;
      const user = await User.findById(userId);
      const winner = user.name;

      const actualWinner = {
        userId: userId,
        winner: winner,
      };
      auction.winner.push(actualWinner);
      await auction.save();
    }
  }
  return auction;
};

export const getAuctions = async (req, res) => {
  try {
    const aste = await Asta.find({})
      .limit(24)
      .select("-image.data")
      .populate("ownerID", "_id name")
      .exec();
    res.status(200).json({
      status: "success",
      results: aste.length,
      data: {
        aste,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export const makeOffer = async (req, res) => {
  const id = req.body.auctionID;
  const offer = req.body.offer;
  const asta = await Asta.findById(id);

  if (!moment(asta.endTime).isAfter(moment())) {
    return res.status(400).json({
      status: "fail",
      message: "L'asta è già terminata",
    });
  }
  let bestOffer = asta.offers[0];
  for (let i = 1; i < asta.offers.length; i++) {
    if (asta.offers[i].amount < bestOffer.amount) {
      bestOffer = asta.offers[i];
    }
  }

  if (!bestOffer) {
    bestOffer = {
      amount: asta.startingOffer,
    };
  }

  // console.log(offer * 100, bestOffer.amount * 0.98 * 100);
  if (Math.round(offer * 100) > Math.round(bestOffer.amount * 0.98 * 100)) {
    return res.status(400).json({
      status: "fail",
      message: "Offerta troppo alta",
    });
  }
  const newOffer = {
    userId: req.user._id,
    amount: offer,
  };

  asta.startingOffer = offer;

  asta.offers.push(newOffer);
  await asta.save();
  return res.status(200).json({
    status: "success",
    message: "Offerta valida",
    data: newOffer,
  });
};

export const image = async (req, res) => {
  let auction = await Asta.findById(req.params.auctionId).exec();
  if (auction && auction.image && auction.image.data !== null) {
    res.set("Content-Type", auction.image.contentType);
    return res.send(auction.image.data);
  }
};

export const sellerAuctions = async (req, res) => {
  let all = await Asta.find({ ownerID: req.user._id })
    //let all = await Asta.find({ ownerID: mongoose.Types.ObjectId(req.user._id) })
    .select("-image.data")
    .populate("ownerID", "_id name")
    .exec();
  //console.log(all);
  res.send(all);
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Asta.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).select("-image.data");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Hotel update failed. Try again.");
  }
};

export const userAuctionOffers = async (req, res) => {
  const all = await Offer.find({ offeredBy: req.user._id })
    .select("session")
    .populate("auction", "-image.data")
    .populate("offeredBy", "_id name")
    .exec();
  res.json(all);
};
