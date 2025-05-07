import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "mydb",
    "anshul", {
        host : "localhost",
        dialect : "postgres",
        logging : false
    }
)

export { sequelize } ;