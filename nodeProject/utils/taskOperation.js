const mongoose = require('mongoose');
const task = mongoose.model('tasks');
const { v4: uuidv4 } = require('uuid');


// creating chat in DB
const addtask = (req, res) => {
    // Set values of Chat
    let group = new task(req.body);
    group.taskId = uuidv4();
    // debugger;
    // save chat into DB
    group.save().then(result => {
        console.log(result);
        if (result.length != 0) {
            console.log('record inserted');
            return res.status(200).json([{ message: 'row inserted' }])
        }else{
            console.log("No row affected in DB");
            return res.status(200).json([{ message: 'No row affected in DB', error: err }])
        }
        // res.status(201).json({ message: "Record inserted Successfully" });
    }).catch(err => {
        console.log("Error While Insertion ", err);
        res.status(500).json({ error: "Error While Insertion " + err });
    }); 
};

const getTask = (req, res) => {
    task.find({userId: req.body.userId }).then(result => {
        if (result.length != 0) {
            console.log('record Retrived');
            return res.status(200).json(result)
        }else{
            console.log("No record found");
            return res.status(200).json([])
        }
    }).catch(err => {
        console.log("Fail to get record ", err);
        res.status(500).json({ error: "Fail to get record" + err });
    }); 
}

const deleteTask = (req, res) => {
    task.deleteOne({ _id: req.body.taskId }).then(result => {
        if (result.length != 0) {
            console.log('record Retrived');
            return res.status(200).json(result)
        }else{
            console.log("No record found");
            return res.status(200).json([{ message: 'No record found' }])
        }
    }).catch(err => {
        console.log("Fail to get record ", err);
        res.status(500).json({ error: "Fail to get record" + err });
    }); 
} 


const taskComplete = (req, res) => {
    const _id = req.body._id;
    task.findOneAndUpdate({ _id },{"taskComplete": req.body.taskComplete}).then(result => {
        if (result.length != 0) {
            console.log('record Retrived');
            return res.status(200).json(result)
        }else{
            console.log("No record found");
            return res.status(200).json({ message: 'No record found' })
        }
    }).catch(err => {
        console.log("Fail to get record ", err);
        res.status(500).json({ error: "Fail to get record" + err });
    }); 
} 

module.exports = {
    addtask,
    deleteTask,
    getTask,
    taskComplete
    // getGroup
}