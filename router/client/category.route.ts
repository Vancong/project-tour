import express from "express";
const router = express.Router();

import * as categoryControllers from "../../controllers/client/category.controllers";

router.get("/", categoryControllers.index);

export const categoryRoute = router;
