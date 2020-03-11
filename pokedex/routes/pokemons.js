var router = require('express').Router();

var Pokemon = require('./../models/Pokemon');

router.get('/',(req, res) => {
    Pokemon.find()
    .then(pokemons => {
      console.log(pokemons)
      res.render('./../views/pokemons/index.html', { pokemons : pokemons });
    });
});

router.get('/:id', (req, res) => {
  Pokemon.findById(req.params.id).populate('types')
  .then(pokemon => {
    res.render('./../views/pokemons/show.html', { pokemon : pokemon });
  }).catch(err => {
    res.status(404);
    res.send("404");
  });
});

module.exports = router;