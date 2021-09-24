import User from "../models/user";
import jwt from "jsonwebtoken";

export const registrati = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");
    // register
    const user = new User(req.body);

    await user.save();
    console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    // controlla se l' utente con quella email esiste
    let user = await User.findOne({ email }).exec();
    // console.log("L' UTENTE ESISTE", user);
    if (!user)
      return res
        .status(400)
        .send("NON E' STATA TROVATA UN EMAIL ASSOCIATA ALL' UTENTE");
    // confronta la password
    user.comparePassword(password, (err, match) => {
      console.log("COMPARE PASSWORD IN LOGIN ERR", err);
      if (!match || err) return res.status(400).send("Password errata");
      //GENERA UN TOKEN E POI INVIA UNA RISPOSTA AL CLIENTE
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "90d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    });
  } catch (err) {
    console.log("ERRORE DI LOGIN", err);
    res.status(400).send("Accesso fallito");
  }
};
