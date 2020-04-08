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

app.get('/connexion',function(req,res){
  res.sendFile('connexion.html',{'root':__dirname + '/templates'})
})




// 1) /NbUtilisateur : Nombre d'utilisateur (sortie : nb)

// 2) /AllUtilisateur : Tous les utilisateurs (sortie : liste)

// 3) /unUtilisateur : Toutes les info d'un utilisateur (entrée : mail -> sortie : liste)

// 4) /VerifUtilisateur : Vérification mail mdp (entrée : mail -> sortie mdp)

// 5) /NbPostUtilisateur : Nombre de Post d'un utilisateur (entrée : mail -> sortie : nb)

// 6) /AllPostUtilisateur : Tous les Posts d'un utilisateur (entrée : mail -> sortie : list)

// 7) /NbFollowerUtilisateur : Nombre de Follower d'un utilisateur (entrée : mail -> sortie : nb)

// 8) /ListeFollowerUtilisateur : Liste des Follower d'un utilisateur (entrée : mail -> sortie : liste de pseudo)

// 9) /NbCommentaireUtilisateur : Nombre de commentaires d'un utilisateur (entrée : mail -> sortie : nb)

// 10) /AllCommentaireUtilisateur : Liste des Commentaires d'un utilisateur (entrée : mail -> sortie : liste)

// 11) /unPost : Toutes les info d'un post (entrée : id_post -> sortie : liste)

// 12) /NbLikePost : Nombre de Like d'un post (entrée : id_post -> sortie : nb)

// 13) /NbCommentairePost : Nombre de commentaire d'un post (entrée : id_post -> sortie : nb)

// 14) /AllCommentairePost : Commentaires d'un post (entrée : id_post -> sortie : liste)




// 1) /NbUtilisateur : Nombre d'utilisateur (sortie : nb)
app.get('/NbUtilisateur',function(req,res){
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
		
		var sql = `SELECT COUNT(mail) AS NumberOfMail FROM utilisateur`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 2) /AllUtilisateur : Tous les utilisateurs (sortie : liste)
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


// 3) /unUtilisateur : Toutes les info d'un utilisateur (entrée : mail -> sortie : liste)
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

// 4) /VerifUtilisateur : Vérification mail mdp (entrée : mail -> sortie mdp)
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
		
		var sql = `SELECT motdepass FROM utilisateur WHERE pseudo = '${query.pseudo}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 5) /NbPostUtilisateur : Nombre de Post d'un utilisateur (entrée : mail -> sortie : nb)
app.get('/NbPostUtilisateur',function(req,res){
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
		
		var sql = `SELECT COUNT(PK_post_id) AS NumberOfPost FROM Poster WHERE FK_utilisateur_mail = '${query.mail}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 6) /AllPostUtilisateur : Tous les Posts d'un utilisateur (entrée : mail -> sortie : list)
app.get('/AllPostUtilisateur',function(req,res){
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

		var sql = `SELECT message FROM post WHERE post.FK_utilisateur_mail = '${query.mail}'`;
		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		
		db.end();
	}); 
});

// 7) /NbFollowerUtilisateur : Nombre de Follower d'un utilisateur (entrée : mail -> sortie : nb)
app.get('/NbFollowerUtilisateur',function(req,res){
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
		
		var sql = `SELECT COUNT(FK_utilisateur_mail_2) AS NumberOfFollower FROM Follower WHERE FK_utilisateur_mail_1 = '${query.mail}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 8) /ListeFollowerUtilisateur : Liste des Follower d'un utilisateur (entrée : mail -> sortie : liste de pseudo)
app.get('/ListeFollowerUtilisateur',function(req,res){
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
		
		var sql = `SELECT FK_utilisateur_mail_2 AS Followers FROM Follower WHERE FK_utilisateur_mail_1 = '${query.mail}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 9) /NbCommentaireUtilisateur : Nombre de commentaires d'un utilisateur (entrée : mail -> sortie : nb)
app.get('/NbCommentaireUtilisateur',function(req,res){
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
		
		var sql = `SELECT COUNT(FK_utilisateur_mail) AS NumberOfCommentaires FROM Commenter WHERE FK_utilisateur_mail = '${query.mail}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 10) /AllCommentaireUtilisateur : Liste des Commentaires d'un utilisateur (entrée : mail -> sortie : liste)
app.get('/AllCommentaireUtilisateur',function(req,res){
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

		var sql = `SELECT message_commentaire FROM Commenter WHERE Commenter.FK_utilisateur_mail = '${query.mail}'`;
		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		
		db.end();
	}); 
});

// 11) /unPost : Toutes les info d'un post (entrée : id_post -> sortie : liste)
app.get('/unPost',function(req,res){
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
		var sql = `SELECT * FROM post WHERE PK_post_id = '${query.postId}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 12) /NbLikePost : Nombre de Like d'un post (entrée : id_post -> sortie : nb)
app.get('/NbLikePost',function(req,res){
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
		
		var sql = `SELECT COUNT(FK_utilisateur_mail) AS NumberOfLike FROM Commenter WHERE FK_post_id = '${query.postId}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 13) /NbCommentairePost : Nombre de commentaire d'un post (entrée : id_post -> sortie : nb)
app.get('/NbCommentairePost',function(req,res){
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
		
		var sql = `SELECT COUNT(FK_utilisateur_mail) AS NumberOfCommentaire FROM Commenter WHERE FK_post_id = '${query.postId}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});

// 14) /AllCommentairePost : Commentaires d'un post (entrée : id_post -> sortie : liste)
app.get('/AllCommentairePost',function(req,res){
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
		
		var sql = `SELECT FK_utilisateur_mail, date_commentaire, message_commentaire FROM Commenter WHERE FK_post_id = '${query.postId}'`;

		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.end();
	}); 
});



