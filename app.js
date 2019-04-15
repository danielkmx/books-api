const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bookRoutes = require('./api/routes/book');
const favoriteBookRoutes = require('./api/routes/favoriteBook');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/favoriteBook', favoriteBookRoutes)

let mongol_url = process.env.NODE_ENV == 'test' ? process.env.MONGO_URL_TEST :process.env.MONGO_URL;

mongoose.connect(mongol_url ,{ useNewUrlParser: true });
app.use((req,res,next) => {
    const error = new Error('Not found');

    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;