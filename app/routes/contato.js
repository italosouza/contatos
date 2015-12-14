/**
 * @brief implementa as rotas utilizadas pelo modulo contato
 * @details [long description]
 *
 * @param  [express app]
 * @return [home route module]
 */

module.exports = function(app) {
  var controller = app.controllers.contato;

  app.route('/contatos')
    .get(controller.listaContatos)
    .post(controller.salvaContato);

  app.route('/contatos/:id')
    .get(controller.obtemContato)
    .delete(controller.removeContato);
};