const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require('express');
const app = express();
const mysql = require('mysql');

// Binding express app to port 3000
app.listen(3000, function () {
    console.log("Node server running @ http://localhost:3000");
});

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/style', express.static(__dirname + '/style'));

app.get('/', function (req, res) {
    res.sendFile('home.html', {'root': __dirname + '/templates'});
});

app.get('/mon-profil', function (req, res) {
    res.sendFile('mon-profil.html', {'root': __dirname + '/templates'})
});

app.get('/connexion', function (req, res) {
    res.sendFile('connexion.html', {'root': __dirname + '/templates'})
});

app.get('/inscription', function (req, res) {
    res.sendFile('inscription.html', {'root': __dirname + '/templates'})
});

app.get('/feed', function (req, res) {
    res.sendFile('feed.html', {'root': __dirname + '/templates'})
});

app.get('/modifProfile', function (req, res) {
    res.sendFile('modifProfile.html', {'root': __dirname + '/templates'})
});

app.get('/modifPswd', function (req, res) {
    res.sendFile('modifPswd.html', {'root': __dirname + '/templates'})
});

app.get('/repart-sexe', function (req, res) {
    res.sendFile('repart_sexe.html', {'root': __dirname + '/templates'})
});

app.get('/repart-ville', function (req, res) {
    res.sendFile('repart_ville.html', {'root': __dirname + '/templates'})
});

app.get('/repart-pays', function (req, res) {
    res.sendFile('repart_pays.html', {'root': __dirname + '/templates'})
});

app.get('/evol-follow', function (req, res) {
    res.sendFile('evol_follow.html', {'root': __dirname + '/templates'})
});

app.get('/profil', function (req, res) {
    res.sendFile('profil.html', {'root': __dirname + '/templates'})
});

app.get('/testmap', function (req, res) {
    res.sendFile('testmap.html', {'root': __dirname + '/templates'})
});

/* Liste des requêtes disponibles :
   1) /NbUtilisateur : Nombre d'utilisateur (sortie : nb)
   2) /AllUtilisateur : Tous les utilisateurs (sortie : liste)
   3) /unUtilisateur : Toutes les info d'un utilisateur (entrée : mail -> sortie : liste)
   3 bis) /photoProfil : retourne le nom de la photo de profil d'un utilisateur (entrée : mail -> sortie : photo_profil)
   3 ter) /AllPhoto : retourne tous les noms des photos d'un utilisateur (entrée : mail -> sortie : liste)
   4) /VerifUtilisateur : Vérification mail mdp (entrée : mail -> sortie mdp)
   5) /NbPostUtilisateur : Nombre de Post d'un utilisateur (entrée : mail -> sortie : nb)
   6) /AllPostUtilisateur : Tous les Posts d'un utilisateur (entrée : mail -> sortie : list)
   7) /NbFollowerUtilisateur : Nombre de Follower d'un utilisateur (entrée : mail -> sortie : nb)
   8) /Followers : Liste des Follower d'un utilisateur (entrée : mail -> sortie : liste de pseudo)
   9) /NbCommentaireUtilisateur : Nombre de commentaires d'un utilisateur (entrée : mail -> sortie : nb)
   10) /AllCommentaireUtilisateur : Liste des Commentaires d'un utilisateur (entrée : mail -> sortie : liste)
   11) /unPost : Toutes les info d'un post (entrée : id_post -> sortie : liste)
   12) /LikePost : Like d'un post (entrée : id_post -> sortie : liste)
   13) /NbCommentairePost : Nombre de commentaire d'un post (entrée : id_post -> sortie : nb)
   14) /AllCommentairePost : Commentaires d'un post (entrée : id_post -> sortie : liste)
   15) /newUser : Inscrit un utilisateur dans la bdd (entrée : pseudo, nom, prenom, mail, motdepass, date_naissance, CP, ville, adresse -> sortie : nb (1 ou 0))
   16) /pseudoExisting : Vérication pseudo déjà existant (entrée : pseudo -> sortie : nb)
   17) /mailExisting : Vérication mail déjà existant (entrée : mail -> sortie : nb)
   18) /AjoutPost : Enregistre un post et poster (entrée : PK_post_id, FK_utilisateur_mail, titre, message, date_publication -> sortie : 1 ou 0)
   19) /AjoutLike : Enregistre un Like (entrée : FK_utilisateur_mail, FK_post_id -> sortie : 1 ou 0)
   20) /AjoutFollower : Enregistre un Follower (entrée : FK_utilisateur_mail_1, FK_utilisateur_mail_2 -> sortie : 1 ou 0)
   21) /AjoutCommentaire : Enregistre un commentaire (entrée : FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire -> sortie : 1 ou 0)
   22) /AjoutPartage : Enregistre un partage de post (entrée : FK_utilisateur_mail, FK_post_id -> sortie : 1 ou 0)
   23) /ModifUtilisateur : Update un utilisateur déjà dans la bdd (entrée : pseudo, nom, prenom, mail, motdepass, date_naissance, CP, ville, adresse -> sortie : nb (1 ou 0))
   23 bis) /ModifMDPUtilisateur : Update un mdp utilisateur déjà dans la bdd (entrée : mail, motdepass -> sortie : nb (1 ou 0))
   24) /ModifPost : modifie un ou plusieurs éléments d'un post : (entrée : PK_post_id, FK_utilisateur_mail, titre, message, date_publication -> sortie : 1 ou 0)
   25) /EnleveLike : supprime le like de la base de donnée : (entrée : FK_utilisateur_mail, FK_post_id -> sortie : nb 0 ou 1)
   26) /EnleveFollower : supprime un follower de la bdd : (entrée : FK_utilisateur_mail_1, FK_utilisateur_mail_2 -> sortie nb 0 ou 1)
   27) /EnleveCommentaire : supprime un commentaire de la bdd : (entrée : FK_utilisateur_mail, FK_post_id -> sortie : nb 0 ou 1)
   28) /EnlevePost : supprime un post : (entrée : PK_post_id -> sortie : nb 0 ou 1)

   29) /NbFemmeHomme : nombre de femme et d'homme follower d'un utilisateur (entrée : mail -> sortie : liste)
   30) /NbFollowParJour : Nb de follow pour un jour donné (entrée : mail, date -> sortie : nb)
   31) /nbFollowersByCity : nombre de followers par ville d'un utilisateur (entrée : mail -> sortie : liste)
   32) /nbFollowersByCountry : nombre de followers par ville d'un utilisateur (entrée : mail -> sortie : liste)
   33) /nbFollowersSince4w : nombre de followers depuis 4 semaines d'un utilisateur (entrée : mail -> sortie : liste)
   34) /showFeed : id de tous les posts à afficher dans le feed (entrée : mail -> sortie : liste)
   35) /ajoutPhoto : ajoute une photo (entrée : mail, titre -> sortie : nb)
   36) /notifLike : mail, titre, id et date_like de tous les utilisateurs qui ont liké un de tes post (entrée : mail -> sortie : liste)
   37) /notifCom : mail, titre, id et date_like de tous les utilisateurs qui ont commenté un de tes post (entrée : mail -> sortie : liste)
   38) /notifFollow : mail et date_like de tous les utilisateurs qui te follow (entrée : mail -> sortie : liste)
   39) /notifPartage : mail, titre, id et date_like de tous les utilisateurs qui ont partagé un de tes post (entrée : mail -> sortie : liste)
   40) /getMail : donne le mail à partir du pseudo (entrée : pseudo -> sortie : mail)
   41) /getPhotoId : id d'une photo (entrée: titre -> sortie: liste)
   42) /getImage : donne la photo d'un post à partir de son id (entrée : id -> sortie : photo)
 */




// 1) /NbUtilisateur : Nombre d'utilisateur (sortie : nb)
app.get('/NbUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
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
app.get('/AllUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });
    db.connect(function (err) {
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
app.get('/unUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
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

// 3 bis) /photoProfil : retourne le nom de la photo de profil d'un utilisateur (entrée : photoId, mail -> sortie : photo_profil)
app.get('/photoProfil', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;
        var query = req.query;
        var sql = `SELECT titre FROM photo WHERE PK_photo_id = '${query.photoId}' AND FK_utilisateur_mail='${query.mail}'`;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 3 ter) /AllPhoto : retourne tous les noms des photos d'un utilisateur (entrée : mail -> sortie : liste)
app.get('/AllPhoto', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;
        var query = req.query;
        var sql = `SELECT titre, FK_post_id FROM photo WHERE FK_utilisateur_mail='${query.mail}'`;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 3 bis) /photoProfil : retourne le nom de la photo de profil d'un utilisateur (entrée : photoId, mail -> sortie : photo_profil)
app.get('/photoProfil', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;
        var query = req.query;
        var sql = `SELECT titre FROM photo WHERE PK_photo_id = '${query.photoId}' AND FK_utilisateur_mail='${query.mail}'`;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 3 ter) /AllPhoto : retourne tous les noms des photos d'un utilisateur (entrée : mail -> sortie : liste)
app.get('/AllPhoto', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;
        var query = req.query;
        var sql = `SELECT titre FROM photo WHERE FK_utilisateur_mail='${query.mail}'`;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 4) /VerifUtilisateur : Vérification mail mdp (entrée : mail -> sortie mdp)
app.get('/VerifUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `SELECT motdepass FROM utilisateur WHERE mail = '${query.mail}'`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 5) /NbPostUtilisateur : Nombre de Post d'un utilisateur (entrée : mail -> sortie : nb)
app.get('/NbPostUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
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
app.get('/AllPostUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });
    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `SELECT * FROM post WHERE post.FK_utilisateur_mail = '${query.mail}'`;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });

        db.end();
    });
});


// 7) /NbFollowerUtilisateur : Nombre de Follower d'un utilisateur (entrée : mail -> sortie : nb)
app.get('/NbFollowerUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `SELECT COUNT(*) AS NumberOfFollower FROM Follower WHERE FK_utilisateur_mail_1 = '${query.mail}'`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 8) /Followers : Liste des Follower d'un utilisateur (entrée : mail -> sortie : liste de pseudo)
app.get('/Followers',function(req,res){
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

        var sql = `SELECT pseudo FROM utilisateur, follower WHERE FK_utilisateur_mail_1 = '${query.mail}' AND follower.FK_utilisateur_mail_2 = utilisateur.mail`;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });

        db.end();
    });
});

// 9) /NbCommentaireUtilisateur : Nombre de commentaires d'un utilisateur (entrée : mail -> sortie : nb)
app.get('/NbCommentaireUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
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
app.get('/AllCommentaireUtilisateur', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });
    db.connect(function (err) {
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
app.get('/unPost', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
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

// 12) /LikePost : Nombre de Like d'un post (entrée : id_post -> sortie : nb)
app.get('/LikePost', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `SELECT pseudo FROM utilisateur, liker WHERE liker.FK_post_id = '${query.id}' and utilisateur.mail = liker.FK_utilisateur_mail`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

//TODO: A enlever, potentiellement inutile
// 13) /NbCommentairePost : Nombre de commentaire d'un post (entrée : id_post -> sortie : nb)
app.get('/NbCommentairePost', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
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
app.get('/AllCommentairePost', function (req, res) {
    // connection à la bdd créée
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
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

// 15) /newUser : Nouvel utilisateur
app.get('/newUser', function (req, res) {
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `INSERT INTO utilisateur (pseudo, nom, prenom, mail, motdepass, date_naissance, sexe, pays, cp, ville, adresse, photo_profil, date_inscription) VALUES ('${query.pseudo}', '${query.nom}', '${query.prenom}', '${query.mail}', '${query.motdepass}', '${query.date_naissance}','${query.sexe}','${query.pays}', '${query.CP}', '${query.ville}', '${query.adresse}', NULL, CURDATE()) `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 16) /pseudoExisting : Vérication pseudo déjà existant (entrée : pseudo -> sortie : nb)
app.get('/pseudoExisting', function (req, res) {
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `SELECT COUNT(pseudo) AS pseudoExisting FROM utilisateur WHERE pseudo='${query.pseudo}'`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 17) /mailExisting : Vérication mail déjà existant (entrée : mail -> sortie : nb)
app.get('/mailExisting', function (req, res) {
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"

    });

    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `SELECT COUNT(mail) AS mailExisting FROM utilisateur WHERE mail='${query.mail}'`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 18) /AjoutPost : Enregistre un post et poster (entrée : FK_utilisateur_mail, titre, message, date_publication -> sortie : 1 ou 0)
app.get('/AjoutPost',function(req,res){
	// connection à la bdd créée
	var db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `INSERT INTO post (FK_utilisateur_mail, titre, message) VALUES ('${query.mail}', '${query.titre}', '${query.message}')`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });

        var sql = `INSERT INTO Poster VALUES ('${query.mail}', '${query.postId}', NOW())`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 19) /AjoutLike : Enregistre un Like (entrée : FK_utilisateur_mail, FK_post_id -> sortie : 1 ou 0)
app.get('/AjoutLike',function(req,res){
	// connection à la bdd créée
	var db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        var query = req.query;

        var sql = `INSERT INTO Liker (FK_utilisateur_mail, FK_post_id, date_like) VALUES ('${query.mail}', '${query.postId}', NOW())`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 20) /AjoutFollower : Enregistre un Follower (entrée : FK_utilisateur_mail_1, FK_utilisateur_mail_2 -> sortie : 1 ou 0)
app.get('/AjoutFollower',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `INSERT INTO Follower VALUES ('${query.mail_1}', '${query.mail_2}', NOW())`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 21) /AjoutCommentaire : Enregistre un commentaire (entrée : FK_utilisateur_mail, FK_post_id, message_commentaire -> sortie : 1 ou 0)
app.get('/AjoutCommentaire',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `INSERT INTO Commenter VALUES ('${query.mail}', '${query.postId}', NOW(), '${query.message}')`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 22) /AjoutPartage : Enregistre un partage de post (entrée : FK_utilisateur_mail, FK_post_id -> sortie : 1 ou 0)
app.get('/AjoutPartage',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `INSERT INTO Partager VALUES ('${query.mail}', '${query.postId}', NOW())`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 23) /ModifUtilisateur : Update un utilisateur déjà dans la bdd (entrée : pseudo, nom, prenom, mail, motdepass, date_naissance, sexe, pays, CP, ville, adresse, photo_profil, date_inscription -> sortie : nb (1 ou 0))
// (pseudo, nom, prenom, mail, motdepass, date_naissance, sexe, pays, CP, ville, adresse, photo_profil, date_inscription)
app.get('/ModifUtilisateur',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `UPDATE utilisateur SET pseudo ='${query.pseudo}', nom ='${query.nom}', prenom ='${query.prenom}', mail ='${query.new_mail}', motdepass ='${query.motdepass}', date_naissance ='${query.date_naissance}', sexe ='${query.sexe}', pays ='${query.pays}', CP ='${query.CP}', ville ='${query.ville}', adresse ='${query.adresse}', photo_profil ='${query.photo_profil}', date_inscription ='${query.date_inscription}' WHERE mail ='${query.old_mail}' `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 23 bis) /ModifMDPUtilisateur : Update un mdp utilisateur déjà dans la bdd (entrée : mail, motdepass -> sortie : nb (1 ou 0))
app.get('/ModifMDPUtilisateur',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;
        console.log("le mail est : '${query.mail}'");
        console.log("le mdp est : '${query.motdepass}'");

        const sql = `UPDATE utilisateur SET motdepass ='${query.motdepass}' WHERE pseudo ='${query.pseudo}'`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 24) /ModifPost : modifie un ou plusieurs éléments d'un post : (entrée : PK_post_id, FK_utilisateur_mail, titre, message, date_publication -> sortie : 1 ou 0)
app.get('/ModifPost',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `UPDATE post SET FK_utilisateur_mail ='${query.mail}', titre ='${query.titre}', message ='${query.message}', date_publication ='${query.date_publication}' WHERE PK_post_id ='${query.postId}'`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 25) /EnleveLike : supprime le like de la base de donnée : (entrée : FK_utilisateur_mail, FK_post_id -> sortie : nb 0 ou 1)
app.get('/EnleveLike',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `DELETE FROM Liker WHERE FK_utilisateur_mail='${query.mail}' AND FK_post_id ='${query.post}' `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 26) /EnleveFollower : supprime un follower de la bdd : (entrée : FK_utilisateur_mail_1, FK_utilisateur_mail_2 -> sortie nb 0 ou 1)
app.get('/EnleveFollower',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `DELETE FROM Follower WHERE FK_utilisateur_mail_1='${query.mail_1}' AND FK_utilisateur_mail_2 ='${query.mail_2}' `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 27) /EnleveCommentaire : supprime un commentaire de la bdd : (entrée : FK_utilisateur_mail, FK_post_id -> sortie : nb 0 ou 1)
app.get('/EnleveCommentaire',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `DELETE FROM Commenter WHERE FK_utilisateur_mail='${query.mail}' AND FK_post_id ='${query.postId}' `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 28) /EnlevePost : supprime un post : (entrée : PK_post_id -> sortie : nb 0 ou 1)
app.get('/EnlevePost',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `DELETE FROM post WHERE PK_post_id='${query.postId}'`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 29) /NbFemmeHomme : nombre de femme et d'homme follower d'un utilisateur (entrée : mail -> sortie : liste)
app.get('/NbFemmeHomme',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql =
            `SELECT COUNT(sexe) AS sexe
                FROM utilisateur
                INNER JOIN (SELECT FK_utilisateur_mail_2 FROM follower WHERE FK_utilisateur_mail_1 = '${query.mail}') AS table1 
                WHERE utilisateur.mail = table1.FK_utilisateur_mail_2 AND sexe='F'
        UNION ALL
        SELECT COUNT(sexe)
                FROM utilisateur
                INNER JOIN (SELECT FK_utilisateur_mail_2 FROM follower WHERE FK_utilisateur_mail_1 = '${query.mail}') AS table1 
                WHERE utilisateur.mail = table1.FK_utilisateur_mail_2 AND sexe='M'
        UNION ALL
        SELECT COUNT(sexe)
                FROM utilisateur
                INNER JOIN (SELECT FK_utilisateur_mail_2 FROM follower WHERE FK_utilisateur_mail_1 = '${query.mail}') AS table1 
                WHERE utilisateur.mail = table1.FK_utilisateur_mail_2 AND sexe='A'
        `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 31) /nbFollowersByCity : nombre de followers par ville d'un utilisateur (entrée : mail -> sortie : liste)
app.get('/nbFollowersByCity', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql =
            `SELECT DISTINCT ville, COUNT(ville) as nb
                FROM utilisateur
                INNER JOIN (SELECT FK_utilisateur_mail_2 FROM follower WHERE FK_utilisateur_mail_1 = '${query.mail}') AS table1 
                WHERE utilisateur.mail = table1.FK_utilisateur_mail_2
                GROUP BY ville
                ORDER BY nb DESC
        `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 32) /nbFollowersByCountry : nombre de followers par ville d'un utilisateur (entrée : mail -> sortie : liste)
app.get('/nbFollowersByCountry', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql =
            `SELECT DISTINCT pays, COUNT(pays) as nb
                FROM utilisateur
                INNER JOIN (SELECT FK_utilisateur_mail_2 FROM follower WHERE FK_utilisateur_mail_1 = '${query.mail}') AS table1 
                WHERE utilisateur.mail = table1.FK_utilisateur_mail_2
                GROUP BY pays
                ORDER BY nb DESC
        `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 33) /nbFollowersSince4w : nombre de followers depuis 4 semaines d'un utilisateur (entrée : mail -> sortie : liste)
app.get('/nbFollowersSince4w', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql =
            `SELECT date_sub(CURDATE(), interval 21 day) as date, COUNT(*) as nb FROM Follower WHERE Follower.FK_utilisateur_mail_1 = '${query.mail}' 
            AND Follower.date_follow BETWEEN date_sub(CURDATE(), interval 27 day) AND date_sub(CURDATE(), interval 21 day)
        UNION ALL
        SELECT date_sub(CURDATE(), interval 14 day) as date, COUNT(*) as nb FROM Follower WHERE Follower.FK_utilisateur_mail_1 = '${query.mail}' 
            AND Follower.date_follow BETWEEN date_sub(CURDATE(), interval 20 day) AND date_sub(CURDATE(), interval 14 day)
        UNION ALL
        SELECT date_sub(CURDATE(), interval 7 day) as date, COUNT(*) as nb FROM Follower WHERE Follower.FK_utilisateur_mail_1 = '${query.mail}' 
            AND Follower.date_follow BETWEEN date_sub(CURDATE(), interval 13 day) AND date_sub(CURDATE(), interval 7 day)
        UNION ALL
        SELECT CURDATE() as date, COUNT(*) as nb FROM Follower WHERE Follower.FK_utilisateur_mail_1 = '${query.mail}' 
        AND Follower.date_follow BETWEEN date_sub(CURDATE(), interval 6 day) AND CURDATE();
        `;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 34) /showFeed : id de tous les posts à afficher dans le feed (entrée : mail -> sortie : liste)
app.get('/showFeed', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;
        /*
        const sql = `SELECT post.PK_post_id AS id_post 
                     FROM post 
                     INNER JOIN Follower on Follower.FK_utilisateur_mail_2=post.FK_utilisateur_mail 
                     WHERE Follower.FK_utilisateur_mail_1='${query.mail}'`;
        */
        const sql = `
                    SELECT post.PK_post_id AS id_post , poster.date_publication AS date_publication
                    FROM post
                    INNER JOIN follower on follower.FK_utilisateur_mail_1 = post.FK_utilisateur_mail
                    INNER JOIN poster on poster.FK_post_id=post.PK_post_id
                    WHERE follower.FK_utilisateur_mail_2 = '${query.mail}'
                    ORDER BY poster.date_publication DESC
                    `
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 35) /ajoutPhoto : ajoute une photo (entrée : mail, titre -> sortie : nb)
// INSERT INTO photo (FK_utilisateur_mail, titre) VALUES ('gretathunberg@gmail.com', 'poney.jpg')
app.get('/ajoutPhoto',function(req,res){
	// connection à la bdd créée
	const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});

    db.connect(function (err) {
        if (err) throw err;

        const query = req.query;

        const sql = `INSERT IGNORE INTO photo (FK_utilisateur_mail, titre) VALUES ('${query.mail}', '${query.titre}')`;

        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();
    });
});

// 36) /notifLike : mail, titre, id et date_like de tous les utilisateurs qui ont liké un de tes post (entrée : mail -> sortie : liste)
app.get('/notifLike', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `
                    SELECT liker.FK_utilisateur_mail, post.titre, liker.FK_post_id, liker.date_like
                    FROM liker
                    INNER JOIN post on liker.FK_post_id = post.PK_post_id
                    INNER JOIN follower on follower.FK_utilisateur_mail_1 = post.FK_utilisateur_mail
                    WHERE follower.FK_utilisateur_mail_2 = '${query.mail}'
                    ORDER BY liker.date_like DESC
                    `;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 37) /notifCom : mail, titre, id et date_like de tous les utilisateurs qui ont commenté un de tes post (entrée : mail -> sortie : liste)
app.get('/notifCom', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `
                    SELECT Commenter.FK_utilisateur_mail, post.titre, Commenter.FK_post_id, Commenter.date_commentaire
                    FROM Commenter
                    INNER JOIN post on  Commenter.FK_post_id = post.PK_post_id
                    INNER JOIN follower on follower.FK_utilisateur_mail_1 = post.FK_utilisateur_mail
                    WHERE follower.FK_utilisateur_mail_2 = '${query.mail}'
                    ORDER BY Commenter.date_commentaire DESC
                    `
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 38) /notifFollow : mail et date_like de tous les utilisateurs qui te follow (entrée : mail -> sortie : liste)
app.get('/notifFollow', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `
                    SELECT follower.FK_utilisateur_mail_2, follower.date_follow
                    FROM follower
                    WHERE follower.FK_utilisateur_mail_1 = '${query.mail}'
                    ORDER BY follower.date_follow DESC
                    `;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 39) /notifPartage : mail, titre, id et date_like de tous les utilisateurs qui ont partagé un de tes post (entrée : mail -> sortie : liste)
app.get('/notifPartage', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
	    user: "root",
	    password: "",
	    database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `
                    SELECT Partager.FK_utilisateur_mail, post.titre, Partager.FK_post_id, Partager.date_partage
                    FROM Partager
                    INNER JOIN post on  Partager.FK_post_id = post.PK_post_id
                    INNER JOIN follower on follower.FK_utilisateur_mail_1 = post.FK_utilisateur_mail
                    WHERE follower.FK_utilisateur_mail_2 = '${query.mail}'
                    ORDER BY Partager.date_partage DESC
                    `;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 40) /getMail : donne le mail à partir du pseudo (entrée : pseudo -> sortie : mail)
app.get('/getMail', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `SELECT mail from utilisateur where pseudo = '${query.pseudo}'
                    `
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 41) /getImage : donne la photo d'un post à partir de son id (entrée : id -> sortie : photo)
app.get('/getImage', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `SELECT titre FROM photo WHERE FK_post_id = '${query.FK_post_id}'
                    `
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});


// 41) /getPhotoId : id d'une photo (entrée: titre -> sortie: liste)
app.get('/getPhotoId', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
        port: "8889"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `SELECT PK_photo_id FROM photo WHERE titre='${query.titre}'`;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

// 42) /getImage : donne la photo d'un post à partir de son id (entrée : id -> sortie : photo)
app.get('/getImage', function (req, res) {
    // connection à la bdd créée
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    });

    db.connect(function (err) {
        if (err) return;

        const query = req.query;

        const sql = `SELECT titre FROM photo WHERE FK_post_id = '${query.FK_post_id}'
                    `
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
        db.end();

    });
});

/*
Likes
SELECT liker.FK_utilisateur_mail, post.titre, liker.FK_post_id, liker.date_like
                    FROM liker
                    INNER JOIN post on liker.FK_post_id = post.PK_post_id
                    INNER JOIN follower on follower.FK_utilisateur_mail_1 = post.FK_utilisateur_mail
                    WHERE follower.FK_utilisateur_mail_2 = 'gretathunberg@gmail.com'
                    ORDER BY liker.date_like DESC

Commentaires
SELECT Commenter.FK_utilisateur_mail, post.titre, Commenter.FK_post_id, Commenter.date_commentaire
                    FROM Commenter
                    INNER JOIN post on  Commenter.FK_post_id = post.PK_post_id
                    INNER JOIN follower on follower.FK_utilisateur_mail_1 = post.FK_utilisateur_mail
                    WHERE follower.FK_utilisateur_mail_2 = 'gretathunberg@gmail.com'
                    ORDER BY Commenter.date_commentaire DESC


followers
SELECT follower.FK_utilisateur_mail_2, follower.date_follow
                    FROM follower
                    WHERE follower.FK_utilisateur_mail_1 = 'gretathunberg@gmail.com'
                    ORDER BY follower.date_follow DESC


Partages
SELECT Partager.FK_utilisateur_mail, post.titre, Partager.FK_post_id, Partager.date_partage
                    FROM Partager
                    INNER JOIN post on  Partager.FK_post_id = post.PK_post_id
                    INNER JOIN follower on follower.FK_utilisateur_mail_1 = post.FK_utilisateur_mail
                    WHERE follower.FK_utilisateur_mail_2 = 'gretathunberg@gmail.com'
                    ORDER BY Partager.date_partage DESC
*/

const multer = require("multer");

const handleError = (err, res) => {
  console.log("un problème est survenu")
};

const upload = multer({
  dest: "/path/to/temporary/directory/to/store/uploaded/files"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.get("/CV.png", (req, res) => {
  res.sendFile(path.join(__dirname, "./uploads/CV.png"));
});

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/" +req.file.originalname+ ".png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);
        console.log("image enregistrée")
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
        console.log("Ce n'est pas un fichier .png")
      });
    }
  }
);