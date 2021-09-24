import expressJwt from "express-jwt";
import Asta from "../models/asta";
// req.user
export const richiediAccesso = expressJwt({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const auctionOwner = async (req, res, next) => {
  let auction = await Asta.findById(req.params.id).exec();
  let owner = auction.ownerID._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
