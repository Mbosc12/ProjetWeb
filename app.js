const express = require('express');
const app = express();
var mysql = require('mysql');

// Binding express app to port 3000
app.listen(3000,function(){
	console.log("Node server running @ http://localhost:3000");
});

app.use('/node_moodules', express.static(__dirname + '/node_modules'));
app.use('/style', express.static(__dirname+'/style'));

app.get('/',function(req,res){
	res.sendFile('home.html',{'root':__dirname+'/templates'});
});

app.get('/showSignInPage',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/templates'});
})

app.get('/showSignUpPage',function(req,res){
  res.sendFile('signup.html',{'root':__dirname + '/templates'})
})

app.get('/test',function(req,res){
	// connection à la bdd créée
	var db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});
	db.connect(function(err) {
		if (err) throw err;
		db.query("SELECT * FROM utilisateur", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

