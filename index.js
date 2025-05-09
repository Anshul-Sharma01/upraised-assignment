import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import "./models/user.model.js";
import "./models/gadget.model.js";

(async () => {
    try{
        await sequelize.sync({ alter : true });
        console.log("All models synced successfully");
    }catch(err){
        console.error(`Sync Error : ${err}`);
    }
})();


const startServer = async () => {
    try{
        await sequelize.authenticate();
        console.log("Database Connected successfully");
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    }catch(err){
        console.error(`Database connection failed : ${err}`);
        process.exit(1);
    }
}

startServer();

