const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    console.log('MongoDB Databse was cleaned');
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Lasagne',
      level: 'UltraPro Chef',
      ingredients: [
        'Lasagne sheets',
        'tomatoes',
        'onions',
        'garlic',
        'carrots',
        'minced beef',
        'cheese'
      ],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 60,
      creator: 'Tyler',
      created: 2020 / 07 / 23
    });
  })

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(recipes => {
    console.log(recipes);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })

  .then(newRecipe => {
    console.log(newRecipe);
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })

  .then(deletedItem => {
    console.log('Carrot Cake has been deleted');
    return mongoose.disconnect();
  })

  .then(() => {
    console.log('disconnected from MongoDB');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
