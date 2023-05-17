const Yup = require('yup');
const FieldMessage = require( './fieldMessage');
const { utilsFindObjById } = require('../controllers/tasks');

const descriptionCaractersMax = 200

const getTasks = (req) => {
    const errors = [];
    // No validation is required to get all tasks for now //
    return errors;
}

const registerTask = async (req) => {
    const errors = [];
    // Basic data validations
    const schema = Yup.object().shape({
        description: Yup.string().required('Task description is required').nullable().test('len', `Description must contain less than ${descriptionCaractersMax} caracters`, val => val.length <= descriptionCaractersMax),
        priority: Yup.number().nullable().required('Task priority is required!').min(1, "Priority must be atleast 1").max(5, "Allowed maximum priority is 5"),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
        err.inner.forEach((error) => {
            errors.push(new FieldMessage(error.path, error.message));
        });
    }
    return errors;
}

const updateTask = async (req) => {
    const errors = [];
    const { id } = req.query;

    // Basic data validations
    const schema = Yup.object().shape({
        description: Yup.string().nullable().test('len', `Description must contain less than ${descriptionCaractersMax} caracters`, val => val.length <= descriptionCaractersMax),
        priority: Yup.number().nullable().min(1, "Priority must be atleast 1").max(5, "Allowed maximum priority is 5"),
    });

    const querySchema = Yup.object().shape({
        id: Yup.number().required('Task ID is required')
    });
    
    try {
        await querySchema.validate(req.query, { abortEarly: false });
    } catch (err) {
        err.inner.forEach((error) => {
            errors.push(new FieldMessage(error.path, error.message));
        });
        return errors;
    }

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
        err.inner.forEach((error) => {
            errors.push(new FieldMessage(error.path, error.message));
        });
    }
    
    // Validate existing Id
    if (!utilsFindObjById(id)) {
        errors.push(new FieldMessage('id', 'Task ID not found on database'));
    }
    return errors;
}

const deleteTask = async (req) => {
    const errors = [];
    const { id } = req.query;

    const querySchema = Yup.object().shape({
        id: Yup.number().required('Task ID is required')
    });
    
    try {
        await querySchema.validate(req.query, { abortEarly: false });
    } catch (err) {
        err.inner.forEach((error) => {
            errors.push(new FieldMessage(error.path, error.message));
        });
        return errors;
    }

    // Validate existing Id
    if (!utilsFindObjById(id)) {
        errors.push(new FieldMessage('id', 'Task ID not found on database'));
    }
    return errors;
}

module.exports = {
    getTasks,
    registerTask,
    updateTask,
    deleteTask
}