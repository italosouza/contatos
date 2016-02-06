/**
 * @brief implementa as rotas utilizadas pelo modulo projeto
 * @details [long description]
 *
 * @return json string
 * @param req
 * @param res
 * @param next
 */

module.exports = function(app) {
  var controller = app.controllers.projeto;
  var auth = app.services.auth;

  app.route('/projeto')
    .get(auth.validarAutenticacao, controller.listar)
    .post(auth.validarAutenticacao, controller.salvar);

  app.route('/projeto/:id')
    .get(auth.validarAutenticacao, controller.buscar)
    .delete(auth.validarAutenticacao, controller.remover);
};
