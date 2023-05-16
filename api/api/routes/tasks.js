const ValidateExceptions = require('../exceptions/validate');

var express = require('express');
var router = express.Router();

const controller = require('../controllers/tasks');
const validation  = require('../validations/tasks');

const baseValidateAndControllerCall = async (name, req, res) => {
  const errors = await validation[name](req, res);
  if (errors.length === 0) {
    await controller[name](req, res);
  } else {
    res.status(400).json(new ValidateExceptions(400, 'An error ocurred!', errors));
  }
};

/* GET All tasks.*/
router.get('/', function(req, res) {
  baseValidateAndControllerCall('getTasks', req, res);
});

/* POST Register a new task.*/
router.post('/', function(req, res) {
  baseValidateAndControllerCall('registerTask', req, res);
});

/* PUT Update a task.*/
router.put('/', function(req, res) {
  baseValidateAndControllerCall('updateTask', req, res);
});

/* DELETE Delete a task.*/
router.delete('/', function(req, res) {
  baseValidateAndControllerCall('deleteTask', req, res);
});


module.exports = router;
