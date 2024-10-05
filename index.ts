import express, { Express } from "express";

const app: Express = express();
const port: number = 3000;
import dotenv from "dotenv";
dotenv.config();

app.set("views", "./views"); // dinh nghia thu muc view
app.set("view engine", "pug"); // dinh nghia pug

app.use(express.static("public")); // thu muc tinh

import sequelize from "./config/database.config";
sequelize;

import tourDtb from "./models/tour.models";

import { RouteClient } from "./router/client/index.route";
RouteClient(app);

app.listen(port, () => {
    console.log(`dang chay cong ${port}`);
});
