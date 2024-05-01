const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig.js');
const apiRoutes = require('./routes/index.js');

const db = require('./models/index.js');

// const UserRepository = require('./repository/user-repository.js');
// const UserService = require('./services/user-service.js');

const app = express();  

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);
    
    app.listen(PORT, async () => {
        console.log(`Server is running ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});  
        }

        
        
        // const service = new UserService();
        // // const newToken = service.createToken({email: 'gaurav1@admin.com', id:1});
        // // console.log("new token is ", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhdXJhdjFAYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTcxMzAwMjI2MiwiZXhwIjoxNzEzMDAyMjkyfQ.aLUctPpECBh0ZOLXlqiL_K9TbulvVYordm_B33z0haY';
        // const response = service.verifyToken(token);
        // console.log(response);
    });
}

prepareAndStartServer();



