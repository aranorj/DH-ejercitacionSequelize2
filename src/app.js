const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
app.use(cors());

const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');

app.use('/', indexRouter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(moviesRoutes);
app.use(genresRoutes);

app.listen('3030', () => console.log('Servidor corriendo en el puerto 3030'));
