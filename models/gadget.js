import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js";

const Gadget = sequelize.define("Gadget", {
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status : {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : "Available"
    },
    deCommissionedAt : {
        type : DataTypes.DATE,
        allowNull : true,
    }
}, {
    tableName : "gadgets",
    timestamps : false
});

export { 
    Gadget
};