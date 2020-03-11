var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
  name: String,
  number: Number,
  description: String,
  picture: String,
  types: [String]
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;