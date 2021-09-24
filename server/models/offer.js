import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const offerSchema = new mongoose.Schema(
  {
    auction: {
      type: ObjectId,
      ref: "Asta",
    },

    offeredBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Offer", offerSchema);
