var mongoose = require('mongoose');
var Schema = mongoose.Schema;





var schemaPlayer = new Schema({
  _id: String
});



var schemaPlanTeam = new Schema({
  _id: String,
  listPlayer: [schemaPlayer]
  
}, { collection: 'planTeams', versionKey: false});

module.exports = mongoose.model('PlanTeam', schemaPlanTeam);