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
    res.render('./../views/pokemons/edit.html', { pokemon : pokemon, types : types, endpoint: '/' });
  })
  .catch(err => {
    console.error(err);
  });
});

router.get('/edit/:id', (req, res) => {
  Type.find({})
  .then(types => {
    Pokemon.findById(req.params.id).then(pokemon => {
      res.render('./../views/pokemons/edit.html', { pokemon : pokemon, types : types, endpoint: '/' + pokemon._id.toString() });
    });
  })
  .catch(err => {
    console.error(err);
  });
});

router.get('/delete/:id', (req, res) => {
  Pokemon.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect('/');
  })
  .catch(err => {
    res.status(404);
    res.send("404");
  });
});

router.get('/:id', (req, res) => {
  Pokemon.findById(req.params.id).populate('types')
  .then(pokemon => {
    res.render('./../views/pokemons/show.html', { pokemon : pokemon });
  })
  .catch(err => {
    res.status(404);
    res.send("404");
  });
});

router.post('/:id?', (req, res) => {
  new Promise((resolve, reject) => {
    if(req.params.id) {
      Pokemon.findById(req.params.id).then(resolve, reject);
    }
    else {
      resolve(new Pokemon());
    }
  })
  .then(pokemon => {
    pokemon.name = req.body.name;
    pokemon.description = req.body.description;
    pokemon.number = req.body.number;
    pokemon.types = req.body.types;

    if(req.file) pokemon.picture = req.file.filename;

    return pokemon.save();
  }).then(() => {
    res.redirect('/');
  });
});

module.exports = router;