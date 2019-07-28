const { Schema, model } = require('mongoose');

const PlateSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  priceBy: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
});

module.exports = model('Plate', PlateSchema);