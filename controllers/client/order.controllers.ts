import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);

    res.json({
        code: 200,
        message: "thanh cong",
    });
};
