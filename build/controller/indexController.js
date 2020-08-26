console.log(require("dotenv").config());
const { PubSub } = require(`@google-cloud/pubsub`);

const pubsub = new PubSub();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class indexController {
    cargarIndex(req, res) {
    	//cambie index por registro
        res.render("registro");
    }
    cargarChat(req, res) {
        console.log("recibi la wea");
        const topicName = "juegos";
        const dataBuffer = Buffer.from(JSON.stringify({"author":"usuario1","text":"Me he conectado PRRRO","cate":"juegos"}));

        pubsub
          .topic(topicName)
          .publish(dataBuffer)
          .then((messageId) => {
            console.log(`Message ${messageId} published.`);
          })
          .catch((err) => {
            console.error("ERROR:", err);
          });
    	//cambie index por registro
    	console.log(req.body);
        res.render("index",{nombre : req.body.user , mail : req.body.email, telefono : req.body.telf});
    }
    
}
exports.default = new indexController();
