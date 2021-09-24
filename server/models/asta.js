import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const astaSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Il titolo è richiesto",
    },
    description: {
      type: String,
      trim: true,
      required: "description è richiesta",
      maxlength: 10000,
    },
    startingOffer: {
      type: Number,
      required: "L' offerta iniziale è richiesta",
      trim: true,
    },

    endTime: {
      type: Date,
      required: "La data è richiesta",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    ownerID: {
      type: ObjectId,
      ref: "User",
    },
    offers: {
      type: [
        {
          userId: ObjectId,
          amount: Number,
        },
      ],
      default: [],
    },
    winner: {
      type: [
        {
          userId: ObjectId,
          winner: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Asta", astaSchema);
