const Joi = require('joi');
const validator = require('express-joi-validation')({});

const addSchema = Joi.object().keys({
    name: Joi.string().required(),
    climate: Joi.string().required(),
    terrain: Joi.string().required()
});

const findSchema = Joi.object().keys({
    name: Joi.string()
});

const paramsSchema = Joi.object().keys({
    id: Joi.string().required()
});

const {
    find,
    findById,
    add,
    destroy
} = require('../controllers/planets');

module.exports = (app) => {
    app.get('/planetas', validator.query(findSchema), find);
    app.post('/planetas', validator.body(addSchema), add);
    app.get('/planetas/:id', validator.params(paramsSchema), findById);
    app.delete('/planetas/:id', validator.params(paramsSchema), destroy);
};