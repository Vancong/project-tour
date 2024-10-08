import express from "express";
const router = express.Router();

import * as cartControllers from "../../controllers/client/cart.controllers";

router.get("/", cartControllers.index);

export const cartRoute = router;
