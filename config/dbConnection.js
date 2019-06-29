require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.DB_STRING;
const options = {
  useNewUrlParser: true,
  autoIndex: false,
  reconnectTries: 1000,
  reconnectInterval: 500,
  poolSize: 5,
  bufferMaxEntries: 0,
  useCreateIndex: true
};

mongoose.connect(url, options);
mongoose.connection.on('error', error => console.log(`Erro na conexão com o BD: ${error}.`));
mongoose.connection.on('disconnected', () => console.log('Aplicação desconectada do Banco de Dados.'));
mongoose.connection.on('connected', () => console.log('Connected to database.'));

module.exports = mongoose;
