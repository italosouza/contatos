/**
 * Created by italo on 12/16/2015.
 */

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

  var schema = mongoose.Schema({
    titulo: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    conteudo: {
      type: String,
      required: true
    },
    inclusao: {
      type: Date,
      default: Date.now
    },

    projeto: {
      type: mongoose.Schema.ObjectId,
      ref: 'Projeto'
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Fragmento', schema);

};
