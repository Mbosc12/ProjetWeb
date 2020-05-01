
var mysql = require('mysql');

// connection à la bdd créée
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});
// création des tables et insertions de valeurs
con.connect(function(err) {
  if (err) throw err;
  
  console.log("Connected to mydb!");
  
  var sql = "CREATE TABLE utilisateur(pseudo VARCHAR(50) NOT NULL ,nom VARCHAR(50),prenom VARCHAR(50),mail VARCHAR(50),motdepass VARCHAR(50) NOT NULL,date_naissance DATE,sexe VARCHAR(1),pays VARCHAR(50) NOT NULL, CP VARCHAR(50) NOT NULL,ville VARCHAR(50) NOT NULL,adresse VARCHAR(50) NOT NULL, photo_profil INT,date_inscription DATE NOT NULL,PRIMARY KEY(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table utilisateur created");
  });
  var sql = "CREATE TABLE post(PK_post_id INT AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50), titre VARCHAR(50) NOT NULL, message VARCHAR(50) NOT NULL,PRIMARY KEY(PK_post_id), FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table post created");
  });
  var sql = "CREATE TABLE photo(PK_photo_id INT AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50), titre VARCHAR(50) NOT NULL, FK_post_id INT, PRIMARY KEY(PK_photo_id), FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail), FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table photo created");
  });
  var sql = "CREATE TABLE Poster(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_publication DATE NOT NULL,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Poster created");
  });
  var sql = "CREATE TABLE Follower(FK_utilisateur_mail_1 VARCHAR(50),FK_utilisateur_mail_2 VARCHAR(50),date_follow DATE NOT NULL,PRIMARY KEY(FK_utilisateur_mail_1, FK_utilisateur_mail_2),FOREIGN KEY(FK_utilisateur_mail_1) REFERENCES utilisateur(mail),FOREIGN KEY(FK_utilisateur_mail_2) REFERENCES utilisateur(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Follower created");
  });
  var sql = "CREATE TABLE Liker(id_like INT NOT NULL AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50), FK_post_id INT,date_like DATE NOT NULL,PRIMARY KEY(id_like),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Liker created");
  });
  var sql = "CREATE TABLE Commenter(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_commentaire DATE NOT NULL,message_commentaire VARCHAR(50) NOT NULL,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Commenter created");
  });
  var sql = "CREATE TABLE Partager(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_partage DATE NOT NULL,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Partager created");
  });




  // remplissage --------------------------------------------------------------------------------------------------------------------------------------------------------

  // Utilisateurs
  var sql = "INSERT INTO utilisateur VALUES ('admin','admin','admin','admin@gmail.com','admin','2020-03-09','A','admin', '00000','admin','admin','1',NOW())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("0 - utilisateur admin inserted");
  });
  var sql = "INSERT INTO utilisateur VALUES ('GretaThunberg','Greta','Thunberg','gretathunberg@gmail.com','superadmin','2020-03-09','F','Suède', '81000','Stockholm','20 rue de la poudriere', 3,'2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 - utilisateur GretaThumberg inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('emmanuelmacron','Emmanuel','Macron','emmanuelmacron@gmail.com','superadmin','2020-03-09','M','France','75008','Paris','55 Rue du Faubourg Saint-Honoré',null,'2020-03-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("2 - utilisateur emmanuelmacron inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('DonaldTrump','Donald','Trump','donaldtrump@gmail.com','superadmin','2020-03-09','M','Etats-unis' ,'DC 20500','Washington','1600 Pennsylvania Ave NW',null,'2020-03-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("3 - utilisateur donaldtrump inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('HaloMora','Halo','Mora','HaloMora@gmail.com','HaloMoradu69','2020-04-10','A','France','31000','Toulouse','10 chemin des Tuileries','2','2020-04-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("4 - utilisateur HaloMora inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('PereCastor','Pere','Castor','PereCastor@gmail.com','RaconteNousUneHistoire','2020-04-10','M','France','32000','Auch','12 impasse des peupliers',null,'2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("5 - utilisateur PereCastor inserted");
  });
  
  // photo
  var sql = "INSERT INTO photo VALUES ('1','admin@gmail.com', 'cactus.jpg', 1)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("6 - Photo cactus.jpg  inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('HaloMora@gmail.com', 'halo.jpg', 4)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7 - Photo halo.jpg HaloMora inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'greta.png', 1)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7 bis - Photo greta.png greataThunber inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'halo.jpg', 2)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7 ter - Photo halo.jpg greataThunber inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'ouf.png', 3)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7 quatre - Photo ouf.png greataThunber inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'hardMetal.jpg', 5)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7 cinq - Photo hardMetal.jpg greataThunber inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'poney.jpg', 6)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7 six - Photo poney.jpg greataThunber inserted");
  });

  // Posts + Poster (6 posts au total)
  var sql = "INSERT INTO post VALUES ('1','gretathunberg@gmail.com', 'Premier message','Ceci est le premier post de GretaGram')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("8 - Post 1 greta inserted");
  });

  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','1','2020-04-02')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("9 - greta Poster 1 inserted");
  });

  var sql = "INSERT INTO post VALUES ('2','gretathunberg@gmail.com', 'Second message','Ceci est le second post de GretaGram')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("10 - Post 1 greta inserted");
  });

  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','2','2020-04-02')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("11 - greta Poster 2 inserted");
  });

  var sql = "INSERT INTO post (FK_utilisateur_mail, titre, message) VALUES ('gretathunberg@gmail.com', 'troisieme message','Ceci est le troisieme post de GretaGram')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("12 - Post 3 greta inserted");
  });
  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','3','2020-04-03')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("13 - greta Poster 3 inserted");
  });

  var sql = `INSERT INTO post (FK_utilisateur_mail, titre, message) VALUES ('HaloMora@gmail.com', 'HaloMora', "La porte s'ouvre")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("14 - HaloMora Post ");
  });

  var sql = "INSERT INTO Poster VALUES ('HaloMora@gmail.com','4','2020-04-10')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("15 - HaloMora Poster 4 inserted");
  });

    var sql = `INSERT INTO post (FK_utilisateur_mail, titre, message) VALUES ('gretathunberg@gmail.com', 'quatrième post', "La porte s'ouvre")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("14bis - Post 4 GretaThunberg ");
  });

  var sql = "INSERT INTO Poster VALUES ('HaloMora@gmail.com','5','2020-04-10')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("15bis - Post 4 GretaThunberg inserted ");
  });

  var sql = `INSERT INTO post (FK_utilisateur_mail, titre, message) VALUES ('gretathunberg@gmail.com', 'cinquieme post', "La porte se referme")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("14ter - Post 5 GretaThunberg ");
  });

  var sql = "INSERT INTO Poster VALUES ('HaloMora@gmail.com','6','2020-04-10')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("15ter - Post 5 GretaThunberg inserted ");
  });
 

  //Follower

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','emmanuelmacron@gmail.com','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("16 - gretathunber est followé par emmanuelmacron");
  });

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','donaldtrump@gmail.com','2020-03-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("17 - gretathunber est followé par donaldtrump");
  });

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','HaloMora@gmail.com','2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("17 bis - gretathunber est followé par HaloMora");
  });

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','PereCastor@gmail.com','2020-04-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("17 ter - gretathunber est followé par PereCastor");
  });

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','gretathunberg@gmail.com','2020-04-25')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("17 quad - gretathunber est followé par gretathunberg");
  });

  var sql = "INSERT INTO Follower VALUES('donaldtrump@gmail.com','gretathunberg@gmail.com','2020-03-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("18 - donaldtrump est followé par gretathumber");
  });

  var sql = "INSERT INTO Follower VALUES('HaloMora@gmail.com','gretathunberg@gmail.com','2020-04-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("19 - HaloMora est followé par gretathumber");
  });

  var sql = "INSERT INTO Follower VALUES('HaloMora@gmail.com','PereCastor@gmail.com','2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("20 - HaloMora est followé par PereCastor");
  });

  var sql = "INSERT INTO Follower VALUES('PereCastor@gmail.com','HaloMora@gmail.com','2020-04-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("21 - PereCastor est followé par HaloMora");
  });

  var sql = "INSERT INTO Follower (FK_utilisateur_mail_1, FK_utilisateur_mail_2,date_follow) VALUES ('PereCastor@gmail.com','gretathunberg@gmail.com','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("22 - PereCastor est followed par greta");
  });



  //Liker

  var sql = "INSERT INTO Liker VALUES(1, 'donaldtrump@gmail.com', 1,'2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("23 - donaldtrump like post 1");
  });

  var sql = "INSERT INTO Liker VALUES(2, 'emmanuelmacron@gmail.com', 1,'2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("24 - emmanuelmacron like post 1");
  });
  
  var sql = "INSERT INTO Liker VALUES(3, 'emmanuelmacron@gmail.com', 2,'2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("25 - emmanuelmacron like post 2");
  });

  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('PereCastor@gmail.com','1','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("26 - PereCastor Like post 1");
  });

  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('PereCastor@gmail.com','2','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("27 - PereCastor Like post 2");
  });

  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('gretathunberg@gmail.com','3','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("28 - gretathunberg Like post 3");
  });


  //Commenter

  var sql = "INSERT INTO Commenter VALUES ('gretathunberg@gmail.com','3','2020-04-10', 'Pour le Gondooor!')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("29 - gretathunberg Comment HaloMora 3 inserted");
  });

    var sql = "INSERT INTO Commenter VALUES ('emmanuelmacron@gmail.com','1','2020-04-10', 'Magique !')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("29 - emmanuel Comment greta 1 inserted");
  });


  var sql = "INSERT INTO Commenter VALUES ('gretathunberg@gmail.com','1','2020-04-10', 'Merci !')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("29 - greta Comment greta 1 inserted");
  });


  var sql = "INSERT INTO Commenter VALUES ('donaldtrump@gmail.com','2','2020-04-10', 'Enfin !')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("29 - donald Comment greta 2 inserted");
  });



  //Partager

  var sql = "INSERT INTO Partager VALUES ('PereCastor@gmail.com','3','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("30 - PereCastor Partage HaloMora 3 inserted");
  });

  con.end();
});
