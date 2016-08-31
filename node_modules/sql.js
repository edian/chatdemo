var mysql = require('mysql');
var db={
	connect:function(){
		var connection =mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'101220097xu',
			database:'mydb'
		});
		connection.connect();
		return connection;
	}
}
/*var connection =mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'101220097xu'
});
var databasename = 'mydb';
var tablename = 'chatuser';*/

//function begindbconnect(){
	//connection.connect();
	//connection.query('use '+databasename);
//};


/*connection.query('SELECT 1+1 AS solution',function(err,rows,fields){
	if(err) throw err;
	console.log('The solution is:',rows[0].solution);
});*/

/*
connection.query('SELECT * from '+tablename,function(err,rows,fields){
	if(err) throw err;
	if(rows){
		for(var i=0;i<rows.length;i++){
			console.log(i,rows[i].username);
		}
		
	}
	
});
*/
/*
function queryuser(username){
	connection.connect();
	connection.query('use '+databasename);
	var sqlline = 'SELECT * from '+tablename+' a where a.username = \''+username+'\'';
	console.log('sqlline:',sqlline);
	connection.query(sqlline,function(err,rows,fields){
		if(err) throw err;
		if(rows){			
		 	for(var i=0;i<rows.length;i++){
		 		console.log(i,rows[i].time);
		 	}
			
		 }
		
	});
	connection.end();

};*/

//function insertuser(user)

//function enddbconnect(){
	//connection.end();
//};



//module.exports.queryuser=queryuser;
//module.exports.begindbconnect=begindbconnect;
//module.exports.enddbconnect=enddbconnect;
module.exports = db;
