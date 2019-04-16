const mongoose = require('mongoose');

const conn = mongoose.createConnection(`mongodb://${process.env.MONGODB}`);

const planetSchema = new mongoose.Schema({
    name: String,
    terrain: String,
    climate: String,
    apparitions: String
});

const Planet = conn.model('Planet', planetSchema, 'Planet');

module.exports = {
    Planet
};