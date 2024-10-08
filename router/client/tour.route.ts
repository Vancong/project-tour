import express from "express";
const router = express.Router();

import * as tourControllers from "../../controllers/client/tour.controllers";

router.get("/:slugCategory", tourControllers.index);

router.get("/detail/:slugTour", tourControllers.detail);

export const tourRoute = router;
