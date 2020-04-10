
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
  
  var sql = "CREATE TABLE utilisateur(pseudo VARCHAR(50) NOT NULL ,nom VARCHAR(50),prenom VARCHAR(50),mail VARCHAR(50),motdepass VARCHAR(50) NOT NULL,date_naissance DATE,pays VARCHAR(50) NOT NULL, CP VARCHAR(50) NOT NULL,ville VARCHAR(50) NOT NULL,adresse VARCHAR(50) NOT NULL,PRIMARY KEY(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table utilisateur created");
  });
  var sql = "CREATE TABLE post(PK_post_id INT AUTO_INCREMENT, FK_utilisateur_mail VARCHAR(50), titre VARCHAR(50) NOT NULL, message VARCHAR(50) NOT NULL,PRIMARY KEY(PK_post_id), FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table post created");
  });
  var sql = "CREATE TABLE Poster(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_publication DATE NOT NULL,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Poster created");
  });
  var sql = "CREATE TABLE Follower(FK_utilisateur_mail_1 VARCHAR(50),FK_utilisateur_mail_2 VARCHAR(50),PRIMARY KEY(FK_utilisateur_mail_1, FK_utilisateur_mail_2),FOREIGN KEY(FK_utilisateur_mail_1) REFERENCES utilisateur(mail),FOREIGN KEY(FK_utilisateur_mail_2) REFERENCES utilisateur(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Follower created");
  });
  var sql = "CREATE TABLE Liker(id_like INT NOT NULL, FK_utilisateur_mail VARCHAR(50), FK_post_id INT,PRIMARY KEY(id_like),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Liker created");
  });
  var sql = "CREATE TABLE Commenter(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,date_commentaire DATETIME NOT NULL,message_commentaire VARCHAR(50) NOT NULL,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Commenter created");
  });
  var sql = "CREATE TABLE Partager(FK_utilisateur_mail VARCHAR(50),FK_post_id INT,PRIMARY KEY(FK_utilisateur_mail, FK_post_id),FOREIGN KEY(FK_utilisateur_mail) REFERENCES utilisateur(mail),FOREIGN KEY(FK_post_id) REFERENCES post(PK_post_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Partager created");
  });
  

  var sql = "INSERT INTO utilisateur VALUES ('GretaThunberg','Greta','Thunberg','gretathunberg@gmail.com','superadmin','2020-03-09','Suède', '81000','StockHolm','20 rue de la poudriere')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO utilisateur VALUES ('EmmanuelMacron','Emmanuel','Macron','emmanuelmacron@gmail.com','superadmin','2020-03-09', 'France','81000','Albi','20 rue de la poudriere')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
  var sql = "INSERT INTO utilisateur VALUES ('DonaldTrump','Donald','Trump','donaldtrump@gmail.com','superadmin','2020-03-09','France' ,'81000','Albi','20 rue de la poudriere')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO post VALUES ('1','gretathunberg@gmail.com', 'Premier message','Ceci est le premier post de GretaGram')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO post VALUES ('2','gretathunberg@gmail.com', 'Second message','Ceci est le second post de GretaGram')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','1','2020-04-02')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO Poster VALUES ('gretathunberg@gmail.com','2','2020-04-03')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','emmanuelmacron@gmail.com')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO Follower VALUES('gretathunberg@gmail.com','donaldtrump@gmail.com')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO Liker VALUES(0, 'donaldtrump@gmail.com', 1)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  var sql = "INSERT INTO Liker VALUES(1, 'emmanuelmacron@gmail.com', 1)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
  var sql = "INSERT INTO Liker VALUES(2, 'emmanuelmacron@gmail.com', 2)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  con.end();
});
