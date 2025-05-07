import bcrypt from "bcryptjs";
import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";


const User = sequelize.define("User", {
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    }
}, {
    tableName : "users",
    timestamps : false
})



User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
})

User.beforeUpdate(async (user) => {
    if(user.changed("password")){
        user.password = await bcrypt.hash(user.password, 10);
    }
})

export {
    User
}

