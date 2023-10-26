require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const api = require('./routes/api');
const {mongoConnect} = require('./services/mongo')
const port = process.env.PORT;

// create instance of express
const app = express();

app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// proxies requests to the api
app.use('/api', proxy('http://localhost:8080/'));
app.use(api);

async function startServer(){
    await mongoConnect();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}...`); 
    });
}

startServer();


//convert back to commonjs modules
