import { tourRoute } from "./tour.route";
import { categoryRoute } from "./category.route";
import { Express } from "express";
export const RouteClient = (app: Express) => {
    app.use("/categories", categoryRoute);
    app.use("/tours", tourRoute);
};
