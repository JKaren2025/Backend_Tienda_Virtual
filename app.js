const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const http = require('http');
//////
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',//el puerto donde corre tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    ,
    credentials: true
}));

app.use(express.json());
/////
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send({
    message: 'Bienvenido a la API de la tienda virtual'
}));

require('./routes/route_categorias')(app);
require('./routes/route_usuarios')(app);
require('./routes/route_productos')(app);
require('./routes/route_carritos')(app);
require('./routes/route_carrito_detalle')(app);
require('./routes/route_auth')(app);

const port = Number.parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;

/**PORT=8000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=db_tienda_virtual
*/
