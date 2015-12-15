/**
 * @brief implementa as configurações da aplicação express
 * @details [relação de dependencia: ROTA -(usa)-> CONTROLLER -(usa)-> MODEL]
 * @return [express app module]
 */

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function()
{
  var app = express();

  app.set('port', 80);
  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  //middlewares
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());


  //carregando modulos/rotas
  load('models', {cwd: 'app'})
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);


  return app;
};