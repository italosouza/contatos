/**
 * @brief implementa as rotas utilizadas pelo modulo home
 * @details [long description]
 *
 * @param  [express app]
 * @return [home route module]
 */


module.exports = function(app) {
  var controller = app.controllers.home;
  app.get('/', controller.index);
};