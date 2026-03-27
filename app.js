require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const http = require('http');
const app = express();
const routeCategorias = require('./routes/route_categorias');

app.use(logger('dev'));//para crear archivos en el sistema, en el console
app.use(bodyParser.json());//devolver respuestas en formato json
app.use(bodyParser.urlencoded({ extended: true }));//devolver respuestas en formato urlencoded

app.get('/', (req, res) =>  res.status(200).send({
    message: 'Bienvenido a mi APIde Tienda Virtual',
}));

routeCategorias(app);

const port = parseInt(process.env.PORT) || 8000;//puerto de react 51.30  a 51,34 ES PARA QUE NO CHOQUE
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});
module.exports = app;
