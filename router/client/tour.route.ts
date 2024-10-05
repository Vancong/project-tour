import express from "express";
const router = express.Router();

import * as tourControllers from "../../controllers/client/tour.controllers";

router.get("/", tourControllers.index);

export const tourRoute = router;
