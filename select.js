var mysql = require('mysql');

// connection à la bdd créée
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
	if (err) throw err;
	
	con.query("SELECT * FROM utilisateur", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
	
	con.end();
});