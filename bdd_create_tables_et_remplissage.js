
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
    console.log("1/8 Table utilisateur created");
  });
  var sql = "CREATE TABLE post(PK_post_id INT AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50), titre VARCHAR(50) NOT NULL, message VARCHAR(50) NOT NULL, ville VARCHAR(50), date_event DATE, PRIMARY KEY(PK_post_id), FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("2/8 Table post created");
  });
  var sql = "CREATE TABLE photo(PK_photo_id INT AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50), titre VARCHAR(50) NOT NULL, FK_post_id INT, PRIMARY KEY(PK_photo_id), FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail), FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("3/8 Table photo created");
  });
  var sql = "CREATE TABLE Poster(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_publication DATE NOT NULL,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("4/8 Table Poster created");
  });
  var sql = "CREATE TABLE Follower(FK_utilisateur_mail_1 VARCHAR(50),FK_utilisateur_mail_2 VARCHAR(50),date_follow DATE NOT NULL,PRIMARY KEY(FK_utilisateur_mail_1, FK_utilisateur_mail_2),FOREIGN KEY(FK_utilisateur_mail_1) REFERENCES utilisateur(mail),FOREIGN KEY(FK_utilisateur_mail_2) REFERENCES utilisateur(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("5/8 Table Follower created");
  });
  var sql = "CREATE TABLE Liker(id_like INT NOT NULL AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50), FK_post_id INT,date_like DATE NOT NULL,PRIMARY KEY(id_like),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("6/8Table Liker created");
  });
  var sql = "CREATE TABLE Commenter(id_commentaire INT NOT NULL AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_commentaire DATE NOT NULL,message_commentaire VARCHAR(200) NOT NULL,PRIMARY KEY(id_commentaire),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7/8 Table Commenter created");
  });
  var sql = "CREATE TABLE Partager(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_partage DATE NOT NULL,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("8/8 Table Partager created");
  });




  // remplissage --------------------------------------------------------------------------------------------------------------------------------------------------------

  // Utilisateurs
  // pseudo, nom, prenom, mail, motdepass, date_naissance, sexe, pays, CP, ville, adresse, photo_profil, date_inscription
  console.log(" Ajout de 10 utilisateur : ");
  var sql = "INSERT INTO utilisateur VALUES ('admin','admin','admin','admin@gmail.com','admin','2020-03-09','A','admin','00000','admin','admin','1',NOW())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 - utilisateur admin inserted");
  });
  var sql = "INSERT INTO utilisateur VALUES ('GretaThunberg','Greta','Thunberg','gretathunberg@gmail.com','superadmin','2020-03-09','F','Suède', '81000','Stockholm','20 rue de la poudriere', 3,'2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("2 - utilisateur GretaThumberg inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('emmanuelmacron','Emmanuel','Macron','emmanuelmacron@gmail.com','superadmin','2020-03-09','M','France','75008','Paris','55 Rue du Faubourg Saint-Honoré',null,'2020-03-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("3 - utilisateur emmanuelmacron inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('DonaldTrump','Donald','Trump','donaldtrump@gmail.com','superadmin','2020-03-09','M','Etats-unis' ,'DC 20500','Washington','1600 Pennsylvania Ave NW',null,'2020-03-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("4 - utilisateur donaldtrump inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('HaloMora','Halo','Mora','HaloMora@gmail.com','HaloMoradu69','2020-04-10','A','France','31000','Toulouse','10 chemin des Tuileries','2','2020-04-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("5 - utilisateur HaloMora inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('PereCastor','Pere','Castor','PereCastor@gmail.com','RaconteNousUneHistoire','2020-04-10','M','France','32000','Auch','12 impasse des peupliers',null,'2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("6 - utilisateur PereCastor inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('HarryPotter','Potter','Harry','harrypotter@gmail.com','stupefly','2010-04-10','M','England','00000','London','4 Privet Drive, Little Whinging Surrey',null,'2020-04-20')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("7 - utilisateur HarryPotter inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('DarkVador','Dark','Vador','darkvador@gmail.com','123soleil','2010-04-10','M','USA','00000','los Angeles','somewhere on space',null,NOW())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("8 - utilisateur DarkVador inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('Yoda','Yoda','Yoda','Yoda@gmail.com','huhuhu','2010-04-10','M','USA','00000','los Angeles','somewhere on space',null,NOW())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("9 - utilisateur Yoda inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('YouKnowWho','You','KnowWho','youknowwho@gmail.com','iamextraordinary','2010-04-10','M','USA','00000','los Angeles','Le chaudron baveur',null,NOW())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("10 - utilisateur YouKnowWho inserted");
  });
  


  // photo
  console.log(" Ajout de 1 photo : ");
  var sql = "INSERT INTO photo VALUES ('1','admin@gmail.com', 'cactus.jpg', 0)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("11 - Photo cactus.jpg  inserted");
  });
  
  

  // Posts + Poster + photo 
  console.log(" Ajout de 12 post : ");
  var sql = "INSERT INTO post VALUES ('1','gretathunberg@gmail.com', 'Premier message','Ceci est le premier post de GretaGram', 'Paris', '2020-05-10')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("12 - Post 1 greta inserted");
  });
  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','1','2020-04-02')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("13 - greta Poster 1 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'greta.png', 1)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("14 - Photo greta.png greataThunber inserted");
  });

  var sql = "INSERT INTO post VALUES ('2','gretathunberg@gmail.com', 'Second message','Ceci est le second post de GretaGram', null, null)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("15 - Post 1 greta inserted");
  });
  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','2','2020-04-02')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("16 - greta Poster 2 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'poney.jpg', 2)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("17 - Photo poney.jpg greataThunber inserted");
  });

  var sql = "INSERT INTO post VALUES (3, 'gretathunberg@gmail.com', 'troisieme message','Ceci est le troisieme post de GretaGram', null, null)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("18 - Post 3 greta inserted");
  });
  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','3','2020-04-03')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("19 - greta Poster 3 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'ouf.png', 3)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("20 - Photo ouf.png greataThunber inserted");
  });

  var sql = `INSERT INTO post VALUES (4, 'gretathunberg@gmail.com', 'quatrieme post', "La porte se referme", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("21 - Post 4 GretaThunberg ");
  });
  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','4','2020-04-11')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("22 - GretaThunberg Poster 4 inserted ");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('gretathunberg@gmail.com', 'hardMetal.jpg', 4)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("23 - Photo hardMetal.jpg greataThunber inserted");
  });

  var sql = `INSERT INTO post VALUES (5, 'emmanuelmacron@gmail.com', "Mes chers compatriotes", "Vive la france, vive la république", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("24 - Post 5 emmanuelmacron");
  });
  var sql = "INSERT INTO Poster VALUES ('emmanuelmacron@gmail.com','5','2020-04-12')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("25 - emmanuelmacron Poster 5 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('emmanuelmacron@gmail.com', 'manu.jpg', 5)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("26 - Photo manu.jpg emmanuelmacron inserted");
  });
  
  var sql = `INSERT INTO post VALUES (6, 'donaldtrump@gmail.com', "covid", "buvez de l'eau de javal pour tuer le virus", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("27 - Post 6 donaldtrump");
  });
  var sql = "INSERT INTO Poster VALUES ('donaldtrump@gmail.com','6','2020-04-16')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("28 - donaldtrump Poster 6 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('donaldtrump@gmail.com', 'trump.jpg', 6)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("29 - Photo trump.jpg donaldtrump inserted");
  });

  var sql = `INSERT INTO post VALUES (7, 'HaloMora@gmail.com', 'HaloMora', "La porte s'ouvre", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("30 - Post 7 HaloMora");
  });
  var sql = "INSERT INTO Poster VALUES ('HaloMora@gmail.com','7','2020-04-10')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("31 - HaloMora Poster 7 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('HaloMora@gmail.com', 'halo.jpg', 7)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("32 - Photo halo.jpg HaloMora inserted");
  });
  
  var sql = `INSERT INTO post VALUES (8, 'PereCastor@gmail.com', 'Mets tes lunettes', "Et lis nous tout!", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("33 - Post 8 PereCastor");
  });
  var sql = "INSERT INTO Poster VALUES ('PereCastor@gmail.com','8','2020-04-18')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("34 - PereCastor Poster 8 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('PereCastor@gmail.com', 'castor.jpg', 8)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("35 - Photo castor.jpg PereCastor inserted");
  });
  
  var sql = `INSERT INTO post VALUES (9, 'harrypotter@gmail.com', 'I solemnly swear that i am up to no good', "mischief managed", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("36 - Post 9 harrypotter");
  });
  var sql = "INSERT INTO Poster VALUES ('harrypotter@gmail.com','9','2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("37 - harrypotter Poster 9 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('harrypotter@gmail.com', 'potter.jpg', 9)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("38 - Photo potter.jpg harrypotter inserted");
  });
  
  var sql = `INSERT INTO post VALUES (10, 'darkvador@gmail.com', 'Keep calm and use the force', "Come to the darkside, we have cookies", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("39 - Post 10 darkvador");
  });
  var sql = "INSERT INTO Poster VALUES ('darkvador@gmail.com','10','2020-04-20')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("40 - darkvador Poster 10 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('darkvador@gmail.com', 'vador.jpg', 10)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("41 - Photo vador.jpg darkvador inserted");
  });

  var sql = `INSERT INTO post VALUES (11, 'Yoda@gmail.com', 'the greatest teacher, Failure is', "Do, or do not, there is no try", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("42 - Post 11 Yoda");
  });
  var sql = "INSERT INTO Poster VALUES ('Yoda@gmail.com','11','2020-04-21')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("43 - Yoda Poster 11 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('Yoda@gmail.com', 'yoda.jpg', 11)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("44 - Photo yoda.jpg Yoda inserted");
  });

  var sql = `INSERT INTO post VALUES (12, 'youknowwho@gmail.com', 'Only i can live forever', "I confess myself... disappointed", null, null)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("45 - Post 12 youknowwho");
  });
  var sql = "INSERT INTO Poster VALUES ('youknowwho@gmail.com','12','2020-04-22')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("46 - youknowwho Poster 12 inserted");
  });
  var sql = "INSERT INTO photo (FK_utilisateur_mail, titre, FK_post_id) VALUES ('youknowwho@gmail.com', 'voldemort.jpg', 12)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("47 - Photo voldemort.jpg youknowwho inserted");
  });



  //Follower
  console.log(" Ajout de Follower : ");

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','emmanuelmacron@gmail.com','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("48 - gretathunber est followé par emmanuelmacron");
  });
  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','donaldtrump@gmail.com','2020-03-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("49 - gretathunber est followé par donaldtrump");
  });
  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','HaloMora@gmail.com','2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("50 - gretathunber est followé par HaloMora");
  });
  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','PereCastor@gmail.com','2020-04-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("51 - gretathunber est followé par PereCastor");
  });

  var sql = "INSERT INTO Follower VALUES('donaldtrump@gmail.com','gretathunberg@gmail.com','2020-03-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("52 - donaldtrump est followé par gretathumber");
  });

  var sql = "INSERT INTO Follower VALUES('HaloMora@gmail.com','gretathunberg@gmail.com','2020-04-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("53 - HaloMora est followé par gretathumber");
  });
  var sql = "INSERT INTO Follower VALUES('HaloMora@gmail.com','PereCastor@gmail.com','2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("54 - HaloMora est followé par PereCastor");
  });

  var sql = "INSERT INTO Follower VALUES('PereCastor@gmail.com','HaloMora@gmail.com','2020-04-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("55 - PereCastor est followé par HaloMora");
  });
  var sql = "INSERT INTO Follower (FK_utilisateur_mail_1, FK_utilisateur_mail_2,date_follow) VALUES ('PereCastor@gmail.com','gretathunberg@gmail.com','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("56 - PereCastor est followed par greta");
  });
  var sql = "INSERT INTO Follower VALUES('PereCastor@gmail.com','harrypotter@gmail.com','2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("57 - PereCastor est followé par harrypotter");
  });
  var sql = "INSERT INTO Follower VALUES('PereCastor@gmail.com','darkvador@gmail.com','2020-04-20')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("58 - PereCastor est followé par darkvador");
  });
  var sql = "INSERT INTO Follower VALUES('PereCastor@gmail.com','Yoda@gmail.com','2020-04-21')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("59 - PereCastor est followé par Yoda");
  });
  var sql = "INSERT INTO Follower VALUES('PereCastor@gmail.com','youknowwho@gmail.com','2020-04-22')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("60 - PereCastor est followé par youknowwho");
  });


  //Liker
  console.log(" Ajout de like : ");
  var sql = "INSERT INTO Liker VALUES(1, 'donaldtrump@gmail.com', 1,'2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("61 - donaldtrump like post 1");
  });

  var sql = "INSERT INTO Liker VALUES(2, 'emmanuelmacron@gmail.com', 1,'2020-03-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("62 - emmanuelmacron like post 1");
  });
  
  var sql = "INSERT INTO Liker VALUES(3, 'emmanuelmacron@gmail.com', 2,'2020-04-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("63 - emmanuelmacron like post 2");
  });

  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('PereCastor@gmail.com','1','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("64 - PereCastor Like post 1");
  });

  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('PereCastor@gmail.com','2','2020-03-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("65 - PereCastor Like post 2");
  });

  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('gretathunberg@gmail.com','3','2020-03-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("66 - gretathunberg Like post 3");
  });

  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('gretathunberg@gmail.com','8','2020-03-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("67 - gretathunberg Like post 8");
  });
  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('HaloMora@gmail.com','8','2020-04-05')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("68 - HaloMora Like post 8");
  });
  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('harrypotter@gmail.com','8','2020-04-29')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("69 - harrypotter Like post 8");
  });
  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('darkvador@gmail.com','8','2020-04-19')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("70 - darkvador Like post 8");
  });
  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('Yoda@gmail.com','8','2020-05-02')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("71 - Yoda Like post 8");
  });
  var sql = "INSERT INTO Liker (FK_utilisateur_mail,FK_post_id,date_like) VALUES ('youknowwho@gmail.com','8','2020-04-27')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("72 - youknowwho Like post 8");
  });



  //Commenter
  console.log(" Ajout de commentaires : ");
  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('gretathunberg@gmail.com','3','2020-04-10', 'Pour le Gondooor!')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("73 - gretathunberg Comment HaloMora 3 inserted");
  });

    var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('emmanuelmacron@gmail.com','1','2020-04-10', 'Magique !')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("74 - emmanuel Comment greta 1 inserted");
  });


  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('gretathunberg@gmail.com','1','2020-04-10', 'Merci !')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("75 - greta Comment greta 1 inserted");
  });


  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('donaldtrump@gmail.com','2','2020-04-10', 'Enfin !')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("76 - donald Comment greta 2 inserted");
  });

  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('harrypotter@gmail.com','8','2020-04-10', 'Vous savez comment on dit Palpatine dans le nord?')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("77 - harrypotter Comment PereCastor 8 inserted");
  });

  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('harrypotter@gmail.com','8','2020-04-11', 'Pain au Palpate')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("78 - harrypotter Comment PereCastor 8 inserted");
  });

  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('darkvador@gmail.com','8','2020-04-11', 'Pere Castor, Je suis ton pere')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("79 - darkvador Comment PereCastor 8 inserted");
  });

  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('Yoda@gmail.com','8','2020-04-13', 'Raconte leur la fois ou j ai fait courir un gars avec un sac rempli de cailloux ')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("80 - Yoda Comment PereCastor 8 inserted");
  });

  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('youknowwho@gmail.com','8','2020-04-12', ' Vous avez vu ma nouvelle baguette? ')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("81 - youknowwho Comment PereCastor 8 inserted");
  });

  var sql = "INSERT INTO Commenter (FK_utilisateur_mail, FK_post_id, date_commentaire, message_commentaire) VALUES ('PereCastor@gmail.com','8','2020-04-12', 'N oubliez pas, le 11 mai c est soirée deconfinement, je vous raconterai la fois où j étais ivre avec votre mère')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("82 - PereCastor Comment PereCastor 8 inserted");
  });

  //Partager
  console.log(" Ajout de partages : ");
  var sql = "INSERT INTO Partager VALUES ('PereCastor@gmail.com','3','2020-03-09')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("83 - PereCastor Partage HaloMora 3 inserted");
  });

  con.end();
});
