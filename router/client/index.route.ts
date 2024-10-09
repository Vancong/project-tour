import { tourRoute } from "./tour.route";
import { categoryRoute } from "./category.route";
import { cartRoute } from "./cart.route";
import { orderRoute } from "./order.route";
import { Express } from "express";
export const RouteClient = (app: Express) => {
    app.use("/categories", categoryRoute);
    app.use("/tours", tourRoute);
    app.use("/cart", cartRoute);
    app.use("/order", orderRoute);
};
