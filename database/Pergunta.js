const sequelize = require('sequelize');
const connection = require('./database.js');

//CRIANDO TABELAS NO BD UTILIZANDO SEQUELIZE
const Pergunta = connection.define('pergunta',{
//tabela titulo, tipo string e nao pode vazio
    titulo:{
        type: sequelize.STRING,
        allowNull:false
    },

    descricao:{
        type: sequelize.TEXT,
        allowNull:false
    }

});

//vai sincronizar o(constante pergunta) com o banco de dados
//force é pra caso existir uma tabela igual ele nao recriar em cima por isso esta falso
Pergunta.sync({force: false}).then(function(){

});

module.exports = Pergunta;