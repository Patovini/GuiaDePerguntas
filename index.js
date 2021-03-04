const express = require("express");
const app = express();
const bodyparser = require("body-parser"); 
const connection = require("./database/database.js");
const { authenticate } = require("./database/database.js");
const perguntaModel = require("./database/Pergunta.js");
// const Pergunta = require("./database/Pergunta.js");
const respostaModel = require("./database/Resposta.js");


//BANCO DE DADOS

connection
    .authenticate()
    .then(function(){
        console.log("conexao feita com banco de dados!")
    })
    .catch(function(msgErro){
        console.log(msgErro);
    })


// EXPRESS USANDO O EJS COMO VIEW ENGINE

app.set('view engine','ejs'); //digo para o express usar o ejs como engine(motor) de html q vou usar e o EJS
app.use(express.static('public')); // para usar arquivos estaticos (os arquivos estaticos na pasta public)

//BODYPARSER--------------

app.use(bodyparser.urlencoded({extended: false}));//bodyparser traduz os dados recebido(html) para js  
app.use(bodyparser.json()); // traduz de json para js

//ROTAS--------------

// rota / = principal entao e a index
app.get("/",function(req, res){
    //findall = select * from (ele faz o select da tabela) e raw = para fazer uma pesquisa crua(somente os dados da tbl)
    perguntaModel.findAll({raw:true, order:[
        ['id','DESC'] // ORDER = ordernar e dentro tem pelo oq eu gostaria(id e decrescente)
    ]}).then(function(perguntass){
        //faz o select no bd e joga na variavel perguntass
        
        res.render("index.ejs",{
            perguntass: perguntass
        }); 

    });


});

app.get("/perguntas",function(req, res){
    res.render("perguntar.ejs");
})

//rota para salvar as informaçoes (perguntas)
app.post("/salvarpergunta",function(req, res){
    
    var titulo1 = req.body.titulo1; // pegando o valor q esta no titulo(nome do placeholder) e passando pra var
    var descricao1 = req.body.descricao1;  //body e graças ao bodyparser
    
    //create = insert into (serve para inserir no bd)
    perguntaModel.create({
        titulo: titulo1,
        descricao: descricao1,
    }).then(function(){
        res.redirect("/")
    });
})

app.get("/perg/:id", function(req, res){
    var id = req.params.id;
    perguntaModel.findOne({
        //procurando valor especifico
        where: {id: id} 
    }).then(function(pergunta){
        if(pergunta != undefined){ // pergunta encontrada

            respostaModel.findAll({
                //where pergunta(bd) com o id (pagianweb)
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']],

            }).then(function(respostas){
                res.render("perg",{
                    pergunta: pergunta,
                    respostas: respostas,
                 });
            });
        }else{ // nao encontrada
            res.redirect("/")
        }
    });
});

//rota para salvar as informaçoes (respostas)
app.post("/salvarResposta", function(req, res){
    var corpo = req.body.corpo1;
    var perguntaId = req.body.pergunta1;

    respostaModel.create({
        //corpo(bd): corpo(variavel ali em cima)
        corpo: corpo,
        perguntaId: perguntaId,
    }).then(function(){
        res.redirect("/perg/"+perguntaId);
    })
});

app.listen(8080,function(){ console.log("App conectado");});
