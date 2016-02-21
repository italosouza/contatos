/**
 * @brief implementa as rotas utilizadas pelo modulo navegacao
 * @details [long description]
 *
 * @return json string
 * @param req
 * @param res
 * @param next
 */

module.exports = function(app) {
  var controller = app.controllers.navegacao;
  var auth = app.services.auth;

  app.route('/navegacao')
    .get(auth.validarAutenticacao, controller.listar)
    .post(auth.validarAutenticacao, controller.salvar);

  app.route('/navegacao/:id')
    .get(auth.validarAutenticacao, controller.buscar)
    .delete(auth.validarAutenticacao, controller.remover);
};
