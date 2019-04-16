const express = require('express');
const cors = require('cors');
const consign = require('consign');
const bodyParser = require('body-parser');

const port = process.env.NODE_PORT_DEV || 8081;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

consign({
        cwd: __dirname
    })
    .include('routes')
    .into(app);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}.`);
});

module.exports = app;