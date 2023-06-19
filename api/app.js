require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

require('./connect');

app.use(helmet());

const limiter = rateLimit({
    window: 15 * 60 * 1000,
    max: 20
});
app.use(limiter);

const userRoute = require('./router/user');

app.use('/api', userRoute)

module.exports = app;