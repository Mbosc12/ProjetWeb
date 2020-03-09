
//installer mysql
//installer nodejs
//créer un dossier projet
//dans une invite de commande
//	cd le dossier projet
//	npm install mysql;
// mettre ce fichier sql.js dans le dossier 

var mysql = require('mysql');

// connection à mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});
//création de la bdd
con.connect(function(err) {
	if (err){
		console.log('error while connecting !') ;
		throw err;
	} 
	console.log("Connected to mysql!");
	var sql1 = "DROP DATABASE IF EXISTS mydb;";
	con.query(sql1, function (err, result) {
		if (err) throw err;
		console.log("Database drop");
	});
	var sql1 = "CREATE DATABASE IF NOT EXISTS mydb";
	con.query(sql1, function (err, result) {
		if (err) throw err;
		console.log("Database created");
	});
	con.end();
});



