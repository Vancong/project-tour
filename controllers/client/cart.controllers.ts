import { Request, Response } from "express";

//[GET] /cart
export const index = async (req: Request, res: Response) => {
    res.render("client/page/cart/index.pug", {
        pageTitle: "Cart",
    });
};
