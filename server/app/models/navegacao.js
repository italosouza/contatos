/**
 * Created by italo on 12/16/2015.
 */

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

  var schema = mongoose.Schema({
    name: {
      type: String
    },
    rota: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    icon: {
      type: String
    },
    content: {
      type: String
    },
    dtInclusao: {
      type: Date,
      default: Date.now
    },
    sistema: {
      type: String
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Navegacao', schema);

};
