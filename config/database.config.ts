import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
    process.env.DTB_NAME,
    process.env.DTB_USERNAME,
    process.env.DTB_PASSWORD,
    {
        host: process.env.DTB_HOST,
        port: 4306,
        dialect: "mysql",
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Kết nối database thành công");
    })
    .catch((error) => {
        console.error("Kết nối database thất bại ", error);
    });
export default sequelize;
