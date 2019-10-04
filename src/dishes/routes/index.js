const Routes = require('express').Router();
const Dishes = require('../model');

const platesDocument = require('../model/plates.json');

Routes.DBFill = function () {
  Dishes.find({}).then(dishes => {
    if (dishes.length) return;

    platesDocument.map(plate => {
      Dishes.create(plate).then(newPlate => {
        console.log(`ok! id: ${newPlate.id} | ${newPlate.category}: ${newPlate.name} - ${newPlate.type}`);
      }).catch(error => { throw new Error(error, plate) });
    });

    console.log("Preenchendo Banco!");
  });
};

Routes.get('/', (req, res) => {
  Dishes.find({})
    .then(dishes => {
      if (!dishes.length) return res.send({ message: 'There are no dishes to display' });

      dishes = dishes.sort((a, b) => {
        if (a.type < b.type) return -1;
        else if (a.type > b.type) return 1;
        else return 0;
      });

      res.send(dishes);
    })
    .catch(err => {
      console.log(err);
      console.log('Erro na rota raiz em DishesRoutes src/plates/routes .get');
    });
});

Routes.post('/', (req, res) => {

  const {
    name,
    price,
    type,
    category,
    description,
    ingredients,
    image,
    priceBy
  } = req.body;

  if (!name || !price || !priceBy || !type || !category || !ingredients || !image) return res.status(400).send({ error: 'Request malformated' });

  Dishes.create({ name, price, priceBy, type, category, description, ingredients, image })
    .then(newDishe => {
      res.send(newDishe);
    })
    .catch(err => {
      console.log(err);
      console.log('Erro na rota raiz em DishesRoutes src/plates/routes .post');
    });
});

Routes.put('/', (req, res) => {
  const {
    name,
    price,
    type,
    category,
    description,
    ingredients,
    image,
    _id
  } = req.body;

  if (!_id || !name || !price || !type || !category || !ingredients || !image) return res.status(400).send({ error: 'Request malformated' });

  Dishes.findById(_id)
    .then(dishe => {
      if (!dishe) return res.status(400).send({ error: 'Dishe do not found' });

      dishe.update({
        name,
        price,
        type,
        category,
        description: description ? description : undefined,
        ingredients,
        image,
      }, (err, resp) => {
        if (err) return res.status(500).send({ error: 'Canno\'t update dishe' });

        res.send({ ok: resp.ok });
      });
    })
    .catch(err => {
      res.status(400).send({ error: '_id not found' });
    });
});

Routes.put('/update-all', (req, res) => {
  Dishes.find({}).then(dishes => {
    dishes.map(dishe => {
      let {
        name,
        price,
        type,
        category,
        ingredients,
        image,
      } = dishe;

      dishe.update({
        name,
        price,
        type,
        category,
        ingredients,
        image,
        priceBy: category.toLowerCase() == 'sushi' ? '5-un' : '1-un'
      });
    });
    return res.send();
  }).catch(err => {
    console.log(err);
    return res.status(400).send();
  });
});

module.exports = Routes;