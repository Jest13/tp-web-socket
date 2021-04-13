const mongoosse = require('mongoose');
const Msg = require('./models/messages');
const io = require('socket.io')(3000)
const mongoDB = 'mongodb+srv://jest:jest123@cluster0.cm0as.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoosse.connect(mongoDB, { useNewUrlParser: true,
useUnifiedTopology: true}).then(() => {
console.log('connecté')
}).catch(err => console.log(err))
io.on('connexion', (socket) => {
    Msg.find().then(result => {
        socket.emit('création dun message', result)
    })
    console.log('Un utilisateur sest connecté');
    socket.emit('message', 'Hello world');
    socket.on('deconnexion', () => {
        console.log('utilisateur deconnecté');
    });
    socket.on('chatmessage', msg => {
        const message = new Msg({ msg });
        message.save().then(() => {
            io.emit('message', msg)
        })


    })
});