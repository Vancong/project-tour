import express, { Express } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/tour", (req, res) => {
    res.send("ok");
});

app.listen(port, () => {
    console.log(`dang chay cong ${port}`);
});
