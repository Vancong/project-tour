import express from "express";
const router = express.Router();

import * as orderControllers from "../../controllers/client/order.controllers";

router.post("/", orderControllers.index);

router.get("/suceese/:id", orderControllers.suceese);
export const orderRoute = router;
