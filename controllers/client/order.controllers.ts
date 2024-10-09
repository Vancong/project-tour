import { Request, Response } from "express";
import orderDtb from "../../models/order.models";
import { generateOrderCode } from "../../helpers/generate.helpers";
import orderItemDtb from "../../models/order-item.models";
import tourDtb from "../../models/tour.models";
import sequelize from "../../config/database.config";
import { QueryTypes } from "sequelize";

//[POST] /order
export const index = async (req: Request, res: Response) => {
    const data = req.body;

    // Lưu data vào bảng orders
    const dataOrders = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial",
    };

    const order = await orderDtb.create(dataOrders);
    const orderId = order.dataValues.id;
    const code = generateOrderCode(orderId);

    await orderDtb.update(
        {
            code: code,
        },
        {
            where: {
                id: orderId,
            },
        }
    );

    // Lưu data vào bảng orders_item
    for (const item of data.cart) {
        const dataItem = {
            order_id: orderId,
            tour_id: item.tourId,
            quantity: item.quantity,
        };
        const tourInfo = await tourDtb.findOne({
            where: {
                id: item.tourId,
                deleted: false,
                status: "active",
            },
            raw: true,
        });
        dataItem["price"] = tourInfo["price"];
        dataItem["discount"] = tourInfo["discount"];
        dataItem["timeStart"] = tourInfo["timeStart"];
        await orderItemDtb.create(dataItem);
    }

    res.json({
        code: 200,
        message: "Đặt hàng thành công!",
        orderCode: code,
    });
};

//[GET] /order/suceese/:id
export const suceese = async (req: Request, res: Response) => {
    const orderCode = req.params.id;
    const order = await orderDtb.findOne({
        where: {
            code: orderCode,
            deleted: false,
        },
        raw: true,
    });
    console.log(order["id"]);
    const ordersItem = await orderItemDtb.findAll({
        where: {
            order_id: order["id"],
        },
        raw: true,
    });
    let total = 0;
    for (const item of ordersItem) {
        item["price_special"] = item["price"] * (1 - item["discount"] / 100);
        item["total"] = item["price_special"] * item["quantity"];
        total += item["total"];
        const tourInfo = await tourDtb.findOne({
            where: {
                id: item["tour_id"],
            },
            raw: true,
        });
        tourInfo["images"] = JSON.parse(tourInfo["images"]);
        item["image"] = tourInfo["images"][0];
        item["title"] = tourInfo["title"];
        item["slug"] = tourInfo["slug"];
    }

    res.render("client/page/order/suceese", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        ordersItem: ordersItem,
        total: total,
    });
};
