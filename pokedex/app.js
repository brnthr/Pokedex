var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
  dest: __dirmane + '/uploads'
});

mongoose.connect('mongodb+srv://admin:admin@cluster-1-lgths.mongodb.net/pokedex?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

require('./models/Pokemon');
require('./models/Type');

var app = express();

app.use(bodyParser.urlencoded());
app.use(upload.single('file'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

app.use('/uploads', express.static(__dirname + '/uploads'));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

console.log('--> Pokédex lancé sur le port 3000');
app.listen(3000);