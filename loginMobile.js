var app = require('express')();

//Importando o modulo http
var http = require('http').createServer(app);

var mysql = require('mysql');

var conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bcd127',
    database: 'dbhhealth'

});

//modulo para pegar dados via post
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//Efetua a conexão
conection.connect(function(err){

    if(!err){
        console.log("Conexao efetuado com sucesso");
    }else{
        console.log("Erro na conexao");
        console.log(err);
    }
});


app.post("/Login", function(req, res){
    var _cpf = req.body.cpf; // < perecido com > $_GET['nome']
    var _senha = req.body.senha; //

    //Efetua a query no banco
    conection.query("SELECT * FROM tbl_login where cpf = ? AND senha = ? ", [_cpf, _senha] ,function(error, results, fields){
      if( !error && results.length > 0 ){
        res.json({sucesso:true , msg:"sucesso", results:results});
      }else{
        res.json({sucesso:false , msg:"Erro ao Selecionar", _erro : error});
      }
    });
});


app.get("/Especialidade", function(req, res){

    //Efetua a query no banco
    conection.query("SELECT * FROM tbl_especialidade", null,function(error, results, fields){
      if( !error && results.length > 0 ){
        res.json({sucesso:true , msg:"sucesso", results:results});
      }else{
        res.json({sucesso:false , msg:"Erro ao Selecionar", _erro : error});
      }
    });
});

app.get("/ListarResultadoExame", function(req, res){

    //Efetua a query no banco
    conection.query(" SELECT result.*, \
                      e.nome \
                      FROM tbl_resultado_exame as result \
                      INNER JOIN tbl_exame as e \
                      ON e.idExame = result.idExame;",null ,function(error, results, fields){
      if( !error && results.length > 0 ){
        res.json({sucesso:true , msg:"sucesso", results:results});
      }else{
        res.json({sucesso:false , msg:"Erro ao Selecionar", _erro : error});
      }
    });
});

app.get("/ListarResultadoConsulta", function(req, res){

    //Efetua a query no banco
    conection.query("SELECT * FROM tbl_resulado_consulta ",null ,function(error, results, fields){
      if( !error && results.length > 0 ){
        res.json({sucesso:true , msg:"sucesso", results:results});
      }else{
        res.json({sucesso:false , msg:"Erro ao Selecionar", _erro : error});
      }
    });
});

http.listen(8888, function(){
    console.log("Servidor Executando porta 8888");
});
