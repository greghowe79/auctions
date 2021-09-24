import express from "express";

const router = express.Router();

// controllers
import { registrati, login } from "../controllers/autenticazione";

router.post("/registrati", registrati);
router.post("/login", login);

module.exports = router;
