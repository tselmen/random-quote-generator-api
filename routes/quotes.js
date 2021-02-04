import express from "express";
import {getRandomQuote} from "../controllers/quotes.js";
const router = express.Router();

router.get("/", getRandomQuote);

export default router;