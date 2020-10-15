const mongoose = require('mongoose');

require('../schema/taskUser');
require('../schema/tasks');

const uri = 'mongodb://localhost:27017/MachineTest'; 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log(uri);
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});