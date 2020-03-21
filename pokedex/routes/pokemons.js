var router = require('express').Router();

var Pokemon = require('./../models/Pokemon');
var Type = require('./../models/Type');

router.get('/',(req, res) => {
    Pokemon.find().populate('types')
    .then(pokemons => {
      //console.log(pokemons);
      res.render('./../views/pokemons/index.html', { pokemons : pokemons });
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/new', (req, res) => {
  Type.find({})
  .then(types => {
    const pokemon = new Pokemon();
    res.render('./../views/pokemons/edit.html', { pokemon : pokemon, types : types });
  })
  .catch(err => {
    console.error(err);
  });
});

router.get('/edit/:id', (req, res) => {
  Type.find({})
  .then(types => {
    Pokemon.findById(req.params.id).then(pokemon => {
      //console.log(pokemon);
      res.render('./../views/pokemons/edit.html', { pokemon : pokemon, types : types });
    });
  })
  .catch(err => {
    console.error(err);
  });
});


router.get('/:id', (req, res) => {
  Pokemon.findById(req.params.id).populate('types')
  .then(pokemon => {
    //console.log(pokemon);
    //res.render('./../views/pokemons/show.html', { pokemon : pokemon });
  })
  .catch(err => {
    res.status(404);
    res.send("404");
  });
});

module.exports = router;