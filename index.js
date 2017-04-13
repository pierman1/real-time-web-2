var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public/js'));

var users = [];

io.on('connection', function (client) {

    io.emit('new user', client.id);

    client.on('username', function(userName) {

        console.log(client.id + ' tried to register as ' + userName);


        users.push({
            name: userName,
            id: client.id
        });

        io.emit('username joined', client.id, userName, users);

    });

    client.on('message', function (msg) {

        console.log(msg);

        io.emit('message to clients', client.id, msg, users);

    });

});

// http.listen(4000, function () {
http.listen(process.env.PORT || 5000, function () {
    console.log('listening on *:3008');
});