/*jshint esversion: 8 */
require("./util/import-mongo/index");

const express = require('express');
const cors = require('cors');

const app = express();
app.use("*", cors());
const port = 3060;


app.use(express.json());

// Route files
// Gift API Task 1: import the giftRoutes and store in a constant called giftroutes
const giftRoutes =  require('./routes/giftRoutes');

// Search API Task 1: import the searchRoutes and store in a constant called searchRoutes
const searchRoutes =  require('./routes/searchRoutes');

const authRoutes = require('./routes/authRoutes');


const pinoHttp = require('pino-http');
const logger = require('./logger');

//app.use(pinoHttp({ logger }));

// Use Routes
// Gift API Task 2: add the giftRoutes to the server by using the app.use() method.
app.use('/api/gift/', giftRoutes);

// Search API Task 2: add the searchRoutes to the server by using the app.use() method.
app.use('/api/search/', searchRoutes);

app.use('/api/auth/', authRoutes);


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status).send(err.message);
});

app.get("/", (req, res) => {
    res.send("Inside the server")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
