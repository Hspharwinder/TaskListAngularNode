
const router = require('express-promise-router')();
const task = require('../utils/taskOperation');

router.post('/addTask', task.addtask);
router.post('/getTask', task.getTask);
router.post('/delete', task.deleteTask);
router.post('/taskComplete', task.taskComplete);

module.exports = router;