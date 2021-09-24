import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Il nome è richiesto",
    },
    email: {
      type: String,
      trim: true,
      required: "L' email è richiesta",
      unique: true,
    },
    password: {
      type: String,
      required: "La password è richiesta",
      min: 6,
      max: 64,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  //l' hash della password verrà fatto solo quando un utente si registra oppure cambierà la propria password
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT HASH ERR", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("ERRORE NEL CONFRONTO DELLA PASSWORD", err);
      return next(err, false);
    }
    // se non ci sono errori, otteniamo null
    console.log("LA PASSWORD CORRISPONDE", match);
    return next(null, match); //true
  });
};
export default mongoose.model("User", userSchema);
