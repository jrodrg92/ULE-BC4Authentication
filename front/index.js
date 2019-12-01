var express=require('express');
var sesion= require('express-session');
var init = require('./src/routes');
var path = require('path');
var bodyParser=require('body-parser');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

const app= express(); //Se crea una instancia de la aplicacion para configurarla

// settings
app.set('port', 3000);
app.use('/frontend', express.static(path.join(__dirname + '/frontend')));
app.set('views', path.join(__dirname, '/src/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(sesion({
  cookie: { maxAge: 60000 },
  secret: "13safsfgd321assds21df",
  resave:false,
  saveUninitialized:false
}));

app.use(init);

// listening the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});