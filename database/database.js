const { Sequelize } = require('sequelize');
const sequelize = require('sequelize'); //importa o sequelize
//sequelize faz salvar dados no banco de dados usando js

const connection = new Sequelize('guiaperguntas','root','1230',{
    host: 'localhost', // servidor q ta rodando
    dialect:'mysql' // tipo de banco q é
})

module.exports = connection; //exportar a conexao criada