var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./test.js');
// app.get('/welcome', function(req, res){
//   //res.send('<h1>Hello world</h1>');
//   res.sendFile(__dirname + '/welcome.html');
// });


app.use(express.static('public'));
//app.use(express.cookieParser());    // to support coockie-encoded bodies
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));




var firstOn = {};

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  /*var conn = db.connect();
  var query = conn.query('select * from chatuser a order by a.time', function(err, rows,fields) {
    if(err) throw err;
    if(rows){
      for(var i=0;i<rows.length;i++){
       console.log(i,rows[i].username);
      }
    }
  });
  console.log(query.sql);
  conn.end();

*/
  console.log(req.body);

 // if(req.cookies.user==null){
  //	res.redirect('/welcome');
  //}
  //else
  	res.sendFile(__dirname + '/index.html');
  //res.redirect('/index');
});
app.post('/',function(req,res){
	console.log(req.body.name);
  /*var keyname = req.body.name;
  if(firstOn.containsKey(keyname)){
    firstOn.keyname++;
  }
  else
    firstOn.keyname = 1;*/
	res.sendFile(__dirname + '/index.html');
	/*if(req.name){
		res.redirect('/index');
		
	}*/

});

/*io.on('connection',function(socket){
	console.log('a user connected');
});
*/
/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
*/
/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});*/
//var isonnow={'name':};
io.on('connection', function(socket){

 // isonnow++;
 //console.log("coockie",Cookies.get());


  socket.on('ready', function(ms){
    var conn = db.connect();
    var query = conn.query("select a.username,a.msg,date_format(a.time,'%Y-%m-%d %H:%i:%s') time from chatuser a order by a.time", function(err, rows,fields) {
      if(err) throw err;
      if(rows){
        //var record=new Array();
        for(var i=0;i<rows.length;i++){
         //record.push(rows[i].username);
         io.to(socket.id).emit('chatrecord',rows[i].username+'                    '+rows[i].time);
         io.to(socket.id).emit('chatrecord',rows[i].msg);
        }
        io.to(socket.id).emit('chatrecordend');
        //io.emit('chatrecord',record);
      }
    });
    console.log(query.sql);
    conn.end();
  });
  
  socket.on('chat message', function(msg){
    var conn = db.connect();
    var query = conn.query("insert into chatuser values('"+msg.name+"','"+msg.time+"','"+msg.message+"')", function(err, rows,fields) {
      if(err) throw err;
    });
    console.log(query.sql);
    conn.end();
      io.emit('chat message', msg);
    });
    socket.on('name', function(name){
    	io.emit('name', name);
    	console.log('name:'+name);
    });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});