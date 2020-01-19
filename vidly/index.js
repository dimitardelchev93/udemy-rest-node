const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use('/', require('./routes/home'));
app.use('/api/genres', require('./routes/genres'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

app.listen(3000);
