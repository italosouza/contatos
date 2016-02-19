/**
 * Created by italo on 12/16/2015.
 */

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    email: {
      type: String,
      index: {
        unique: true
      }
    },
    endereco: {
      type: String
    },
    observacao: {
      type: String
    },
    dtInclusao: {
      type: Date,
      default: Date.now
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Contato', schema);

};
