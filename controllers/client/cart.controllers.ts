import { Request, Response } from "express";
import tourDtb from "../../models/tour.models";
//[GET] /cart
export const index = async (req: Request, res: Response) => {
    res.render("client/page/cart/index.pug", {
        pageTitle: "Cart",
    });
};
//[POST] /cart/list-json
export const listJson = async (req: Request, res: Response) => {
    const tours = req.body;
    let total = 0;
    for (const tour of tours) {
        const infoTour = await tourDtb.findOne({
            where: {
                id: tour.tourId,
                deleted: false,
                status: "active",
            },
            raw: true,
        });
        tour["image"] = "";
        if (infoTour["images"]) {
            infoTour["images"] = JSON.parse(infoTour["images"]);
            tour["image"] = infoTour["images"][0];
        }
        tour["title"] = infoTour["title"];
        tour["slug"] = infoTour["slug"];
        tour["price"] = infoTour["price"];

        if (infoTour["discount"] > 0) {
            tour["price"] =
                (1 - infoTour["discount"] / 100) * infoTour["price"];
        }

        tour["total"] = tour["price"] * tour["quantity"];

        total += tour["total"];
    }
    res.json({
        tours: tours,
        total: total,
    });
};
