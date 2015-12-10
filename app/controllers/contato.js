module.exports = function() {
  var controller = {};
  var contatos = [
      {_id: 1, nome: 'Contato Exemplo 1', email: 'cont1@empresa.com.br'},
      {_id: 2, nome: 'Contato Exemplo 2', email: 'cont2@empresa.com.br'},
      {_id: 3, nome: 'Contato Exemplo 3', email: 'cont3@empresa.com.br'}
  ];

  controller.listaContatos = function(req, res) {
    res.status(200).json(contatos);
  };

  controller.obtemContato = function(req, res) {
    var nID = req.params.id;
    var contato = contatos.filter(function (contato) {
      return contato._id == nID;
    })[0];

    contato ?
      res.status(200).json(contato) :
      res.status(404).send('Contato não encontrado');
  };


  controller.removeContato = function(req, res) {
    var nID = req.params.id;

    contatos = contatos.filter(function(contato) {
      return contato._id != nID;
    });
    console.log('API: removeContato');
    res.status(204).end();
  };

  return controller;
};