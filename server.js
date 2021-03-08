let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get("/", function(req, res){            // racine du server ---> 
    res.sendFile(__dirname + '/index.html'); // reponse index.html 
})

io.on('connection', function(socket){   
    console.log("un utilisateur s'est connecté  ");     //gestion de connexion
    socket.on('disconnect', function (){
        console.log("un utilisateur s'est déconnecté")
    })
    socket.on('chat message', function(msg){            //gestion de message 
        console.log('message recu : ' + msg);
        io.emit('chat message', msg); // ecouter tout les event chat message 
    })
})

http.listen(3000, function(){                      // initialisation du serveur sur le port 3000
    console.log('serveur tourne sur le port 3000 | @CamilHirane')
})