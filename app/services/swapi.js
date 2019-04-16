const request = require('request-promise');

const getPlanet = async name => request.get(`https://swapi.co/api/planets/?search=${name}`, {
    json: true
});

module.exports = {
    getPlanet
};