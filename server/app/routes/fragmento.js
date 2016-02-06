/**
 * @brief implementa as rotas utilizadas pelo modulo fragmento
 * @details [long description]
 *
 * @return json string
 * @param req
 * @param res
 * @param next
 */

module.exports = function(app) {
  var controller = app.controllers.fragmento;
  var auth = app.services.auth;

  app.route('/fragmento')
    .get(auth.validarAutenticacao, controller.listar)
    .post(auth.validarAutenticacao, controller.salvar);

  app.route('/fragmento/:id')
    .get(auth.validarAutenticacao, controller.buscar)
    .delete(auth.validarAutenticacao, controller.remover);
};
