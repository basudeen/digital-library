const express = require('express');
const mongodb = require('./config/database');
const routes = require('./src/routes/Mainrouter');
require('dotenv').config();
let PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`server is listening on this port ${PORT}`)
})
app.use(process.env.ENDPOINT_SUFFIX, routes);
