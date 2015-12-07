/**
 * @brief implementa as configurações da aplicação express
 * @details [relação de dependencia: ROTA -(usa)-> CONTROLLER -(usa)-> MODEL]
 * @return [express app module]
 */

var express = require('express');
var load = require('express-load');

module.exports = function()
{
  var app = express();

  app.set('port', 3000);

  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  //carregando modulos
  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);


  return app;
};