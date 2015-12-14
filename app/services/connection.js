var mysql      = require('mysql');

module.exports = function() {

  // var dao = {};
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'iask'
  });

  // dao.res = {};


  // dao.conectar = function() {
  //   connection.connect(function(err) {
  //     if (err) {
  //       console.error('error connecting: ' + err.stack);
  //       return;
  //     }

  //     console.log('connected as id ' + connection.threadId);
  //   });
  // };

  // dao.query = function(psSql) {
  //   var sSql = psSql || '';

  //   dao.res.status = 200;
  //   dao.res.msg = '';
  //   dao.res.rows = {};

  //   if (sSql != '')
  //   {
  //     connection.query(sSql, function(err, rows, fields) {
  //       dao.res.rows = rows;
  //     });
  //   }
  //   else
  //   {
  //     dao.res.status = 500;
  //     dao.res.msg = 'Query não informada.';
  //   }
  //   return dao.res;
  // };

  // dao.fechar = function() {
  //   connection.end();
  //   console.log('Fechando conexão');
  // };

  // dao.commit = function() {
  //   connection.commit(function(err) {
  //       if (err) {
  //         return connection.rollback(function() {
  //           // throw err;
  //           console.log('Erro ao executar instrução SQL. Realizando Rollback', err)
  //         });
  //       }
  //       console.log('success!');
  //     });
  // };

  return connection;

};