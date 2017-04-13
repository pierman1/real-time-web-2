(function () {

    var socket = io();

    // when a user joins
    socket.on('new user', function (userId) {

        console.log('NEW USER JOINED : ' + userId);

    });


    var loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', function () {

        event.preventDefault();

        var userName = document.querySelector('#login').value;

        console.log(userName);

        socket.emit('username', userName);

    });

    var allUsers = [];

    // when a user sets a username
    socket.on('username joined', function (clientId, userName, users) {

        console.log(clientId);
        console.log(userName);

        allUsers.push(users);
        console.log(users);

    });


    ////// Chat functionality

    var chatForm = document.querySelector('.chat-form');

    chatForm.addEventListener('submit', function () {

        event.preventDefault();

        var msg = document.querySelector('#msg').value;

        console.log(msg);

        socket.emit('message', msg);

    });

    var messageList = document.querySelector('#messageList');

    // when client recieves a message
    socket.on('message to clients', function (clientId, msg, users) {

        console.log(clientId);

        console.log(users);

        for (i=0; i < users.length; i++) {

            var senderId = users[i].id;
            var senderName = users[i].name;

            console.log(senderName);

            if (senderId === clientId) {

                console.log(senderName + ' ' + senderId);

                var m = document.createElement('li');
                m.innerHTML = senderName + ' says: ' + msg;
                messageList.appendChild(m);


            }

        }


    });





})();