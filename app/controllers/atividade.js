module.exports = function(app) {
  var controller = {};
  var conexao = app.services.connection;

  controller.listar = function(req, res) {

    conexao.query('select * from atividade', function(err, rows, fields) {
      if (err)
      {
        res.status(500).json({msg: 'Não foi possível realizar esta operação', err: err});
      }
      res.status(200).json(rows);
    });
  };

  controller.buscar = function(req, res) {
    var nID = req.params.id;

    conexao.query('select * from atividade where id = ?', [nID], function(err, rows, fields) {
      if (err)
      {
        res.status(500).json({msg: 'Não foi possível realizar esta operação', err: err});
      }
      res.status(200).json(rows);
    });
  };

  return controller;
};