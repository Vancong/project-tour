import { Request, Response } from "express";
import tourDtb from "../../models/tour.models";

export const index = async (req: Request, res: Response) => {
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
};
