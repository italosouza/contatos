/**
 * @brief implementa as rotas utilizadas pelo modulo
 * @details [long description]
 *
 * @param  [express app]
 * @return [home route module]
 */

module.exports = function(app) {
  var controller = app.controllers.atividade;
  app.get('/atividade', controller.listar);
  app.get('/atividade/:id', controller.buscar);
};