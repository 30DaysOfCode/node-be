const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

var baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'Welcome to 30DoC backend, where plenty magic happens.',
        data: null
    });
});

const configureApp = (app) => {
    app.use(cors());
    app.use(bodyParser.json());

    app.use('/v1', baseRouter);

    app.get('/', (req, res) => {
        return res.redirect('/v1');
    });
}

configureApp(app);

module.exports = app;