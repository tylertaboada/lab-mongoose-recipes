const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    unique: true
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: [
      'breakfast',
      'main_course',
      'soup',
      'snack',
      'drink',
      'dessert',
      'other'
    ]
  },
  image: String,
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
