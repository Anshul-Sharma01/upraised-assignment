import dotenv from "dotenv";
import { password } from "pg/lib/defaults.js";

dotenv.config();

module.exports = {
    development : {
        username : "anshul",
        password : "anshul@012",
        database : "mydb",
        host : "localhost",
        dialect : "postgres"
    }
}


