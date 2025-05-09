
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    database : "mydb",
    username : "postgres",
    password : "anshul@012",
    host : "localhost",
    dialect : "postgres",
})
    



export { sequelize } ;