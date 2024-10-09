import { Request, Response } from "express";
import orderDtb from "../../models/order.models";
import { generateOrderCode } from "../../helpers/generate.helpers";
import orderItemDtb from "../../models/order-item.models";
import tourDtb from "../../models/tour.models";
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
    });
};
