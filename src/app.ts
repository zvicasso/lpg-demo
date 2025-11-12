// Desc: This is the main entry point for the application
// Date: 24/10/2025
// Programmer: Ishe Valentine Zvicasso

//import packages and components

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

//setting port, listen for requests
const PORT: number = Number(process.env.PORT) || 60000;

import db from './models/index';
import routes from './routes'

//setting port, listen for requests
let port: number = PORT || 60000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"] },
  connectionStateRecovery: {}
});

const corsOptions = { origin: ["http://localhost:3000"] };
app.use(cors(corsOptions));

//parse requests of content type - application/json
app.use(bodyParser.json());

//parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World! This is a test');
});

//connecting MongoDB database
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

/*server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => { 
  console.log(err.message) });
*/

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

//start server
function startServer(): void {
  server.listen(port, function () {
    console.log('Server listening on port ' + port);
  }).on('error', function () {
    console.log(`Port ${port} is in use, trying with port ${port + 1}`);
    port++;
    startServer();
  });
}

startServer();

//export socket io
export { io };