import { Router } from "express";
import { generateImage } from "./controller.js";

const r = Router();

r.post("/generateimage", generateImage);

export default r;
