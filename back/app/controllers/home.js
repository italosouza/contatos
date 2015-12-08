/**
 * @brief ponte de ligação entre view e os dados
 * @details [long description]
 * @return [home controller module]
 */

module.exports = function() {
  var controller = {};

  controller.index = function(req, res) {
    res.render('index', {nome: 'Express'});
  };

  return controller;
};