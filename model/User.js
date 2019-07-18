const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
//specifies that mongoose has Schema property
const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: String
});
//create a new collection called user
//it will not override the properties
mongoose.model('user', userSchema);
