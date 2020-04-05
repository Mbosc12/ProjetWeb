const express = require('express');
const app = express();
var mysql = require('mysql');

// Binding express app to port 3000
app.listen(3000,function(){
	console.log("Node server running @ http://localhost:3000");
});

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/style', express.static(__dirname+'/style'));

app.get('/',function(req,res){
	res.sendFile('home.html',{'root':__dirname+'/templates'});
});

app.get('/mon-profil',function(req,res){
  res.sendFile('mon-profil.html',{'root':__dirname + '/templates'})
})

// Requete pour avoir tous les utilisateurs
app.get('/Post',function(req,res){
	// connection à la bdd créée
	var db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});
	db.connect(function(err) {
		if (err) throw err;

		var sql = "SELECT message FROM post WHERE post.FK_utilisateur_mail = 'gretathunberg@gmail.com'";
		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		
		db.end();
	}); 
});

// Requete pour avoir tous les utilisateurs
app.get('/AllUtilisateur',function(req,res){
	// connection à la bdd créée
	var db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});
	db.connect(function(err) {
		if (err) throw err;

		var sql = "SELECT * FROM utilisateur";
		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		
		db.end();
	}); 
});


// Requete pour avoir toutes les info d'un seul utilisateur avec le mail en parametre
app.get('/unUtilisateur',function(req,res){
	// connection à la bdd créée
	var db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

	db.connect(function(err) {
		if (err) throw err;
		//console.log("req = "+req);
		var query = req.query;
		//console.log("query = "+query);
		//console.log("query.mail = "+query.mail);
		var sql = `SELECT * FROM utilisateur WHERE mail = '${query.mail}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// Requete pour vérifier si le mail correspond au mdp
app.get('/VerifUtilisateur',function(req,res){
	// connection à la bdd créée
	var db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

	db.connect(function(err) {
		if (err) throw err;
		
		var query = req.query;
		
		var sql = `SELECT * FROM utilisateur WHERE mail = '${query.mail}' AND motdepass = '${query.mdp}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			
			if (result.length == 0){
				res.send(false);
			}else{
				res.send(true);
			}
			/*
			console.log(result);
			res.send(result);
			*/
		});
		db.end();
	}); 
});