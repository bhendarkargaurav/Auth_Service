const express = require('express');

const { PORT } = require('./config/serverConfig.js');



const prepareAndStartServer = () => {

    const app = express();
    
    app.listen(PORT, () => {
        console.log(`Server is running ${PORT}`);
        // console.log(process.env);
    });
}

prepareAndStartServer();


