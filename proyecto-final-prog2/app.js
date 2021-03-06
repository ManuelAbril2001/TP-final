var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peliculasPreferidasRouter = require('./routes/peliculasPreferidas');
var resultadosRouter = require('./routes/resultados');
var generosRouter = require('./routes/generos');
var peliculasRouter = require('./routes/peliculas');
var peliculasPorGeneroRouter = require('./routes/peliculasPorGenero');
var registroRouter = require('./routes/registro')
var reseniaRouter= require("./routes/resenia")
var detallesUsuarioRouter = require("./routes/detallesUsuario")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/peliculasPreferidas', peliculasPreferidasRouter);
app.use('/resultados', resultadosRouter);
app.use('/generos', generosRouter);
app.use('/peliculas',peliculasRouter);
app.use('/peliculasPorGenero', peliculasPorGeneroRouter);
app.use('/registro', registroRouter);
app.use('/resenia', reseniaRouter);
app.use('/detallesUsuario', detallesUsuarioRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
