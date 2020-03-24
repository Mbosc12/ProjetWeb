
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
  
  var sql = "CREATE TABLE utilisateur(pseudo VARCHAR(50) NOT NULL,nom VARCHAR(50),prenom VARCHAR(50),mail VARCHAR(50),motdepass VARCHAR(50) NOT NULL,date_naissance DATE,CP VARCHAR(50),ville VARCHAR(50),adresse VARCHAR(50),PRIMARY KEY(mail))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table utilisateur created");
  });
  var sql = "CREATE TABLE post(id INT,titre VARCHAR(50) NOT NULL,message VARCHAR(50) NOT NULL,PRIMARY KEY(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table post created");
  });
  var sql = "CREATE TABLE Poster(id INT,id_1 INT,date_publication DATE NOT NULL,PRIMARY KEY(id, id_1),FOREIGN KEY(id) REFERENCES utilisateur(id),FOREIGN KEY(id_1) REFERENCES post(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Poster created");
  });
  var sql = "CREATE TABLE Follow(id INT,id_1 INT,PRIMARY KEY(id, id_1),FOREIGN KEY(id) REFERENCES utilisateur(id),FOREIGN KEY(id_1) REFERENCES utilisateur(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Follow created");
  });
  var sql = "CREATE TABLE Liker(id INT,id_1 INT,PRIMARY KEY(id, id_1),FOREIGN KEY(id) REFERENCES utilisateur(id),FOREIGN KEY(id_1) REFERENCES post(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Liker created");
  });
  var sql = "CREATE TABLE Commenter(id INT,id_1 INT,date_commentaire DATETIME NOT NULL,message_commentaire VARCHAR(50) NOT NULL,PRIMARY KEY(id, id_1),FOREIGN KEY(id) REFERENCES utilisateur(id),FOREIGN KEY(id_1) REFERENCES post(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Commenter created");
  });
  var sql = "CREATE TABLE Partager(id INT,id_1 INT,PRIMARY KEY(id, id_1),FOREIGN KEY(id) REFERENCES utilisateur(id),FOREIGN KEY(id_1) REFERENCES post(id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Partager created");
  });
  
  
  var sql = "INSERT INTO utilisateur VALUES ('Hola','Que','Tal','holaquetal@gmail.com','muybienytu','2020-03-09','81000','Albi','20 rue de la poudriere')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
  con.end();
});