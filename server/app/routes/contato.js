/**
 * @brief implementa as rotas utilizadas pelo modulo contato
 * @details [long description]
 *
 * @return json string
 * @param req
 * @param res
 * @param next
 */

module.exports = function(app) {
  var controller = app.controllers.contato;
  var auth = app.services.auth;

  app.route('/contato')
    .get(auth.validarAutenticacao, controller.listar)
    .post(auth.validarAutenticacao, controller.salvar);

  app.route('/contato/:id')
    .get(auth.validarAutenticacao, controller.buscar)
    .delete(auth.validarAutenticacao, controller.remover);
};
