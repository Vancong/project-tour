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

app.get("/tour", async (req, res) => {
    const tours = await tourDtb.findAll({
        where: {
            status: "active",
            deleted: false,
        },
        raw: true,
    });

    res.render("client/page/tour/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours,
    });
});

app.listen(port, () => {
    console.log(`dang chay cong ${port}`);
});
