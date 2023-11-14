const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.set('useFindAndModify', false,  "useUnifiedTopology", true );
mongoose.connect(mongodb.URI, {
  useNewUrlParser: true
})
  .then(db => console.log(true))
  .catch(err => console.log(err));
