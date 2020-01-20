const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(config.get('db.name'), { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => debug('Connected to db..'))
    .catch(err => debug('Could not connect to db..', err));

debug('Setting up middleware..');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

debug('Setting up routes..')
app.use('/', require('./routes/home'));
app.use('/api/genres', require('./routes/genres'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

debug('Listen to given port..')
app.listen(config.get('port'));
