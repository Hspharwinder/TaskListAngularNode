var mongoose = require('mongoose');

var taskUser = new mongoose.Schema({
    userId: { type : String},
    email: { type : String, unique: true },
    password: {type: String },
});

mongoose.model('taskUser', taskUser);