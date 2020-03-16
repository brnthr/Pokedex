var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');

mongoose.connect('mongodb+srv://admin:admin@cluster-1-lgths.mongodb.net/pokedex?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

// const Pokemon = require('./models/Pokemon.js');
// new Pokemon({
//   name: 'Bulbizarre',
//   number: 1,
//   description: 'Pokémon de départ de type plante et poison',
//   types: [],
// }).save().then(doc => {
//   console.log('Doc créé');
//   console.log(doc);
// });

require('./models/Pokemon');
require('./models/Type');

var app = express();

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

console.log('Pokédex lancé sur le port 3000');
app.listen(3000);