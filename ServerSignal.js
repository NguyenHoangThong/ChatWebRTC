var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3001);
io.on('connection', function(socket) {
    socket.emit('test',{data: "hello"});
    socket.on('1',function (data) {
       console.log(data);
       socket.join("1");
    });
    socket.on('offer', function(data) {
        console.log(data);
        socket.in("1").emit('offerPeer',{offer: data.offer});
    });

    socket.on('answer', function (data) {
        console.log(data);
       socket.in("1").emit('myOffer', {data: data.data});
    });

    // socket.on('candidate', function (data) {
    //    console.log(data);
    //    socket.in("1").emit('candidatePeer', {data: data.data});
    // });
});