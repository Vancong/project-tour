import { Request, Response } from "express";
import tourDtb from "../../models/tour.models";
import categoryDtb from "../../models/category.models";

//[GET] /categories
export const index = async (req: Request, res: Response) => {
    const categories = await categoryDtb.findAll({
        where: {
            status: "active",
            deleted: false,
        },
        raw: true,
    });
    console.log(categories);
    res.render("client/page/categories/index.pug", {
        pageTitle: "Danh muc tour",
        categories: categories,
    });
};
