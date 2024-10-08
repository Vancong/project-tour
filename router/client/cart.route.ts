import express from "express";
const router = express.Router();

import * as cartControllers from "../../controllers/client/cart.controllers";

router.get("/", cartControllers.index);

router.post("/list-json", cartControllers.listJson);

export const cartRoute = router;
