const express = require('express');
const bodyParser = require('body-parser');

const {config} = require("./config/config.json")

const { PORT } = require('./config/serverConfig.js');
const apiRoutes = require('./routes/index.js');

const db = require('./models/index.js');

const app = express();
   


const prepareAndStartServer = async() => {

    app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

//     const env = process.env.NODE_ENV || 'development';
// const config = require('./config/config.json')[env];
// console.log("ENV =", env);
// console.log(config);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
    });

     try {
        await db.sequelize.sync({ alter: true });
        console.log("Database synced successfully");
    } catch (error) {
        console.log("Sync Error:", error);
    }
}   

prepareAndStartServer();