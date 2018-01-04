var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var nbaPlayersSchema = new Schema({
  name: String,
  nickname: String,
  number: Number,
  position: String,
  team: String,
});

var NBAPlayers = mongoose.model('nbaPlayers', nbaPlayersSchema);

module.exports = NBAPlayers;
