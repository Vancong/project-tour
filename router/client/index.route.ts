import { tourRoute } from "./tour.route";
import { Express } from "express";
export const RouteClient = (app: Express) => {
    app.use("/tours", tourRoute);
};
