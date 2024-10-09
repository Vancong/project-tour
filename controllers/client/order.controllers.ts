import { Request, Response } from "express";
import orderDtb from "../../models/order.models";
import { generateOrderCode } from "../../helpers/generate.helpers";
export const index = async (req: Request, res: Response) => {
    const data = req.body;

    const dataOrder = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial",
    };
    const order = await orderDtb.create(dataOrder);
    const orderId = order.dataValues.id;
    const code = generateOrderCode(orderId);
    console.log(order);
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

    res.json({
        code: 200,
        message: "thanh cong",
        orderCode: code,
    });
};
