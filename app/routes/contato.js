/**
 * @brief implementa as rotas utilizadas pelo modulo contato
 * @details [long description]
 *
 * @param  [express app]
 * @return [home route module]
 */

module.exports = function(app) {
  var controller = app.controllers.contato;
  app.get('/contatos', controller.listaContatos);
  app.get('/contatos/:id', controller.obtemContato);
};