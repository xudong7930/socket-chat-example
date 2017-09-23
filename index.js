const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

app.get('/vue.min.js', function(request, response){
    response.sendFile(__dirname + '/vue.min.js');
});

app.get('/socket.io.js', function(request, response){
    response.sendFile(__dirname + '/socket.io.js');
});


io.on('connection', function(socket) {
    socket.on('chat.message1', function(message){
        io.emit('chat.message2', message);
    });

    socket.on('disconnect', function(reason){
        console.info(reason);
        io.emit('chat.message2', 'disconect from client');
    });
});


server.listen(8100, function() {
    console.info('Listen on 8100');
});

