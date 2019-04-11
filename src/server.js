const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Toda vez que o user entra na aplicação receberemos o socket
// Esse socket represneta a conexao real time entre o user com o servidor
io.on('connection', socket => {
  //console.log('ok');
  socket.on('connectRoom', box => {
    // Isola o usuário a uma sala única
    socket.join(box);
  });
});

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-lzyub.mongodb.net/omnistack?retryWrites=true',
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  // passa uma info global para aplicação definindo uma nova var dentro de req
  //Toda rota que vier a partir daqui vai ter acesso a 'io'
  req.io = io;

  return next();
});

// Cadastrar um modulo dentro do meu express
app.use(express.json()); // Ajuda o servidor a entender as reqs no formato json
app.use(express.urlencoded({ extended: true })); // Permit o envio de arqs nas reqs
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3000);
