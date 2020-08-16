console.log(require("dotenv").config());
const { PubSub } = require(`@google-cloud/pubsub`);

const pubsub = new PubSub();

("use strict");
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const bodyParser = require("body-parser");
const path = require("path");
const SocketIO = require("socket.io");
var io;
const mensajesJ = [];
const mensajesP = [];
const mensajesC = [];
const usuarios = [];
const indexRouter_1 = __importDefault(require("./router/indexRouter"));

class Server {
  constructor() {
    this.app = express_1.default();
    this.config();
    this.router();
  }
  config() {
    this.app.set("port", process.env.PORT || 3000);
    //static files
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
    this.app.use(express_1.default.static(path.join(__dirname, "/public")));
    this.app.use(morgan_1.default("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
  router() {
    this.app.use("/", indexRouter_1.default);
    this.app.use("/chat", indexRouter_1.default);
  }
  start() {
    this.server = this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
    });
    this.configSocketServer();
  }
  configSocketServer() {
    io = SocketIO.listen(this.server);
    io.on("connection", (socket) => {
      console.log("Nueva conexion de socket ID: " + socket.id);
      socket.on("iniciar", function (data) {
        usuarios.push({
          user: data.nombre,
          foto: data.foto,
          id: socket.id,
          email: data.email,
          telf: data.telf,
        });
        io.emit("conectados", usuarios);
        // io.emit("entrada", mensajes);
        io.emit("juegos", mensajesJ);
        io.emit("peliculas", mensajesP);
        io.emit("comics", mensajesC);
      });
      socket.on("disconnect", function () {
        console.log("Se desconecto el usuario: " + socket.id);
        io.emit("desconexion", socket.id);
      });
      socket.on("mensajeEnviado", function (data) {
        //Subscriptor funciona
        // const topicName = data.cate;
        // let subscription;
        // pubsub.topic(topicName).createSubscription("juegosSubs454", (err, sub) => {
          
        //   subscription = sub;
        //   // Listen to and handle message and error events
        //   subscription.on("message", (message) => {
        //     console.log(`Received message ${message.id}:`);
        //     console.log(`Data: ${message.data}`);
        //     console.log(`tAttributes: ${message.attributes}`);

        //     // Ack the messae
        //     message.ack();
        //   });
        //   subscription.on("error", (err) => {
        //     logging.error(err);
        //   });
        //   console.log(`Listening to juegos with subscription "juegosSubs12"`);
        // });

        //PUB FUNCIONA
        const topicName = data.cate;
        const dataBuffer = Buffer.from(JSON.stringify(data));

        pubsub
          .topic(topicName)
          .publish(dataBuffer)
          .then((messageId) => {
            console.log(`Message ${messageId} published.`);
          })
          .catch((err) => {
            console.error("ERROR:", err);
          });

        // mensajes.push(data);
        // io.emit("entrada", mensajes);
      });
    });
  }
}


        let subscriptionJ;
        pubsub.topic("juegos").createSubscription("juegosS", (err, sub) => {
          
          subscriptionJ = sub;
          // Listen to and handle message and error events
          subscriptionJ.on("message", (message) => {
            console.log(`Received message ${message.id}:`);
            console.log(`Data: ${message.data}`);
            console.log(`tAttributes: ${message.attributes}`);
            var mes = JSON.parse(message.data);
            
            mensajesJ.push(mes);
            io.emit(mes.cate, mensajesJ);
            // Ack the messae
            message.ack();
          });
          subscriptionJ.on("error", (err) => {
            logging.error(err);
          });
          console.log(`Listening to juegos with subscription "juegosS"`);
        });

        let subscriptionC;
        pubsub.topic("comics").createSubscription("comicsS", (err, sub) => {
          
          subscriptionC = sub;
          // Listen to and handle message and error events
          subscriptionC.on("message", (message) => {
            console.log(`Received message ${message.id}:`);
            console.log(`Data: ${message.data}`);
            console.log(`tAttributes: ${message.attributes}`);
            var mes = JSON.parse(message.data);
            
            mensajesC.push(mes);
            io.emit(mes.cate, mensajesC);
            // Ack the messae
            message.ack();
          });
          subscriptionC.on("error", (err) => {
            logging.error(err);
          });
          console.log(`Listening to juegos with subscription "comicsS"`);
        });

        let subscriptionP;
        pubsub.topic("peliculas").createSubscription("peliculasS", (err, sub) => {
          
          subscriptionP = sub;
          // Listen to and handle message and error events
          subscriptionP.on("message", (message) => {
            console.log(`Received message ${message.id}:`);
            console.log(`Data: ${message.data}`);
            console.log(`tAttributes: ${message.attributes}`);
            var mes = JSON.parse(message.data);
            
            mensajesP.push(mes);
            io.emit(mes.cate, mensajesP);
            // Ack the messae
            message.ack();
          });
          subscriptionP.on("error", (err) => {
            logging.error(err);
          });
          console.log(`Listening to juegos with subscription "juegosS"`);
        });


const server = new Server();
server.start();
