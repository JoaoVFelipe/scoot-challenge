require('dotenv').config()
const moment = require('moment')
const fs = require('fs');
const ValidateExceptions = require('../exceptions/validate');

taskfile = './database/tasks.json';

const utilsGetTasks = () => {
    let actualData = fs.readFileSync(taskfile);
    let {tasks} = JSON.parse(actualData);
    return tasks; 
}

const utilsFindObjById = (id) => {
    let tasks = utilsGetTasks();
    objIndex = tasks.findIndex((obj => obj.id == id));
    return tasks[objIndex] || null;
}

const generateNewId = (array) => {
    const lastId = array.length ? array[array.length - 1].id : 0;
    return Number(lastId + 1);
}

// Register tasks in database
const registerTask = async (req, res) => {
    const {description, priority, dueDate, completed} = req.body;
    try {
        let tasks = utilsGetTasks();
        let newObj = { id: generateNewId(tasks), description, priority, dueDate: moment(dueDate).format('MM-DD-YYYY') || '', completed: completed || false }
        tasks.push(newObj)

        let newData = JSON.stringify({tasks});

        fs.writeFile(taskfile, newData, (err) => {
            if (err)  throw new ValidateExceptions(400, 'An error occurred while writing the JSON file.', [`Details: ${err}`]);
            return res.status(201).json({});
        });
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'An error occurred when trying to write your data.', details: err.errors || err});
    }
}

// Get all tasks
const getTasks = async (req, res) => {
    try {
        fs.readFile(taskfile, (err, data) => {
            if (err) throw new ValidateExceptions(400, 'An error occurred while reading the JSON file.', [`Details: ${err}`]);
            let tasks = JSON.parse(data);
            return res.status(200).json(tasks);
        });
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'An error occurred when trying to retrieve your data.', details: err.errors || err});
    }
}

// Update a tasks
const updateTask = async (req, res) => {
    const { id } = req.query;
    const { description, priority, dueDate, completed } = req.body;

    try {
        let tasks = utilsGetTasks();
        if(objIndex) {
            objIndex = tasks.findIndex((obj => obj.id == id));
        
            if(description) {
                tasks[objIndex].description = description;
            }
            if(priority) {
                tasks[objIndex].priority = priority;
            }
            if(dueDate) {
                tasks[objIndex].dueDate = moment(dueDate).format('MM-DD-YYYY');
            }
            if(completed !== null) {
                tasks[objIndex].completed = completed;
            }
            
            let newData = JSON.stringify({tasks});
    
            fs.writeFile(taskfile, newData, (err) => {
                if (err)  throw new ValidateExceptions(400, 'An error occurred while writing the JSON file.', [`Details: ${err}`]);
                return res.status(201).json({});
            });
        } else {
            throw new ValidateExceptions(404, 'Object Not Found.', [`Details: ${err}`]);
        }
       
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'An error occurred when trying to write your data.', details: err.errors || err});
    }
   
}

// Delete a task by Id
const deleteTask = async (req, res) => {
    const { id } = req.query;
    try {
        let tasks = utilsGetTasks();
    
        objIndex = tasks.findIndex((obj => obj.id == id));
        if (objIndex) {
            tasks.splice(objIndex, 1);

            let newData = JSON.stringify({tasks});
    
            fs.writeFile(taskfile, newData, (err) => {
                if (err)  throw new ValidateExceptions(400, 'An error occurred while writing the JSON file.', [`Details: ${err}`]);;
                return res.status(200).json({});
            });
        } else {
            throw new ValidateExceptions(404, 'Object Not Found.', [`Details: ${err}`]);
        }
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'An error occurred when trying to delete your data.', details: err.errors || err});
    }
}


module.exports = {
   registerTask,
   getTasks,
   updateTask,
   deleteTask,
   utilsGetTasks,
   utilsFindObjById
};