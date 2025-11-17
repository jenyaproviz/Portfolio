import express from "express";
import { sendContactEmail } from "../controllers/contact.js";

const router = express.Router();

router.post("/", sendContactEmail);

export default router;
