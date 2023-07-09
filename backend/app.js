require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express(process.env.JWT_SECRET);

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());

app.use(requestLogger); // подключаем логгер запросов

app.use(cors({
  credentials: true,
  origin: 'https://api.mesto-grafs.nomoreparties.sbs',
}));

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT);
