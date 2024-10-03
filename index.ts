import express, { Express } from "express";

const app: Express = express();
const port: number = 3000;

app.set("views", "./views"); // dinh nghia thu muc view
app.set("view engine", "pug"); // dinh nghia pug

app.use(express.static("public")); // thu muc tinh

app.get("/tour", (req, res) => {
    res.render("client/page/tour");
});

app.listen(port, () => {
    console.log(`dang chay cong ${port}`);
});
