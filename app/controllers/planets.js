const {
    Types
} = require('mongoose');
const {
    Planet
} = require('../models/planet');

const {
    getPlanet
} = require('../services/swapi');

const find = async (req, res) => {
    const {
        name
    } = req.query;

    let planets;
    try {
        if (name) {
            planets = await Planet.find({
                name
            });
        } else {
            planets = await Planet.find({});
        }

        res.status(200);
        if (planets.length) res.send(planets);
        else res.send('Galáxia vazia');
    } catch (e) {
        res.status(500);
        res.send(e.message);
    }
};

const findById = (req, res) => Planet.findById(req.params.id)
    .then((planet) => {
        res.status(200);
        if (planet) res.send(`${planet.name}`);
        else res.send('Se predeu na Galáxia');
    })
    .catch((err) => {
        res.status(500);
        res.send(err.message);
    });

const add = async (req, res) => {
    const {
        name,
        climate,
        terrain
    } = req.body;
    try {
        const result = await getPlanet(name);
        if (result.results[0]) {
            const {
                lastErrorObject,
                value
            } = await Planet.findOneAndUpdate({
                name
            }, {
                name,
                terrain,
                climate,
                apparitions: result.results[0].films.length
            }, {
                upsert: true,
                new: true,
                rawResult: true
            });
            res.status(200);
            if (lastErrorObject && !lastErrorObject.updatedExisting) {
                res.send({
                    message: `Criado: ${name}`,
                    id: value.id
                });
            } else res.send(`Criado: ${name}`);
        } else {
            res.status(404);
            res.send(`
            Não foi criado: ${name}`);
        }
    } catch (e) {
        res.status(500);
        res.send(e.message);
    }
};

const destroy = async (req, res) => {
    try {
        const castId = Types.ObjectId(req.params.id);
        const planet = await Planet.findOneAndRemove({
            _id: castId
        });
        res.status(200);
        res.send(`Removido: ${planet.name}`);
    } catch (e) {
        res.status(500);
        res.send(e.message);
    }
};

module.exports = {
    find,
    findById,
    add,
    destroy
};