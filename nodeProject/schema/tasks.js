var mongoose = require('mongoose');

var tasks = new mongoose.Schema({
    taskId: { type:String }, 
    taskName: {type: String },
    taskDetail: { type:String },
    taskComplete: { type: Boolean },
    userId: { type : String}
});

mongoose.model('tasks', tasks);