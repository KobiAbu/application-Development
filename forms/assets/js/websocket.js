$(function () {
    var socket = io();

    $('button').click(function () {
        socket.emit('new message', $('input').val());
        $('input').val('');
    });

    socket.on('new message', function (msg) {
        $('div').append(msg + '<br />');
    });

    socket.on('joined', function (msg) {
        $('div').append('A new user joined<br />');
    });

    socket.on('disconnected', function (msg) {
        $('div').append('A user disconnected<br />');
    });
});