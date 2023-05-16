require('dotenv').config()

// Register tasks in database
const registerTask = async (req, res) => {
    return res.status(201).json({});
}

const getTasks = async (req, res) => {
    return res.status(200).json({});
}

const updateTask = async (req, res) => {
    return res.status(201).json({});
}

const deleteTask = async (req, res) => {
    return res.status(200).json({});
}


module.exports = {
   registerTask,
   getTasks,
   updateTask,
   deleteTask
};