import express from "express";
const router = express.Router();

import * as orderControllers from "../../controllers/client/order.controllers";

router.post("/", orderControllers.index);

export const orderRoute = router;
