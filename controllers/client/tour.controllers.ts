import { Request, Response } from "express";
import sequelize from "../../config/database.config";
import { json, QueryTypes } from "sequelize";
import { format, parseISO } from "date-fns";
// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
    const slug = req.params.slugCategory;

    const tours = await sequelize.query(
        `
    SELECT tours.*,ROUND(price* (1-discount/100)) AS price_special
     FROM tours
    JOIN tours_categories ON tours.id=tours_categories.tour_id
    JOIN categories ON categories.id=tours_categories.category_id
    WHERE 
        categories.slug='${slug}'
        AND categories.deleted=false
        AND categories.status='active'
        AND tours.deleted=false
        AND tours.status='active'
        
        `,
        {
            type: QueryTypes.SELECT,
        }
    );
    for (const item of tours) {
        if (item["images"]) {
            const arrayImage = JSON.parse(item["images"]);
            if (arrayImage.length > 0) {
                item["image"] = arrayImage[0];
            }
            item["price_special"] = parseInt(item["price_special"]);
        }
    }

    res.render("client/page/tour/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours,
    });
};

// [GET] /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
    const slugTour = req.params.slugTour;
    const tour = await sequelize.query(
        `
            SELECT tours.*,ROUND(price* (1-discount/100)) AS price_special
            from tours
            WHERE
            slug='${slugTour}'
            AND status='active'
            AND deleted=false

        `,
        {
            type: QueryTypes.SELECT,
        }
    );
    for (const item of tour) {
        item["price_special"] = parseInt(item["price_special"]);
        const arrayImage = JSON.parse(item["images"]);
        item["arrayImage"] = arrayImage;
        const date = format(new Date(item["timeStart"]), "dd-MM-yyyy HH:mm:ss");
        item["formatDate"] = date;
    }
    res.render("client/page/tour/detail.pug", {
        pageTitle: "chi tiet tour",
        tour: tour[0],
        images: tour[0]["arrayImage"],
    });
};
