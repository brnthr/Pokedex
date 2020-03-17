var mongoose = require('mongoose');

var typeSchema = new mongoose.Schema({
  name: String,
  color: String,
  textColor: String,
  //imgPath: String,
});

/*
typeSchema.virtual('pokemons', {
    ref: 'Pokemon',
    localfield: '_id',
    foreignField: 'types'
});
*/

var Type = mongoose.model('Type', typeSchema);

module.exports = Type;