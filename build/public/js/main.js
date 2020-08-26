
//Normal
var socket = io.connect("http://localhost:3000");
var nombre = "";
var foto = "";
var email = "";
var telf = "";
var categoria = "";
var dato_nombre = "";
var dato_mail = "";
var dato_telefono = "";
var dato_categoria = "";
var dato_foto = "";
const queryString = window.location.search;
var urlParams = {};



document.addEventListener("DOMContentLoaded", function (event) {
  console.log("aqui chill");
  console.log(queryString);
  urlParams = new URLSearchParams(queryString);
  dato_nombre = urlParams.get("user");
  dato_mail = urlParams.get("email");
  dato_telefono = urlParams.get("telf");
  dato_categoria = urlParams.get("categoria");
  dato_foto = urlParams.get("foto");
  console.log(dato_nombre);

  nombre = dato_nombre;
  foto = dato_foto;
  email = dato_mail;
  telf = dato_telefono;
  categoria = urlParams.get("categoria");
  socket.emit("iniciar", {
    nombre: nombre,
    foto: foto,
    email: email,
    telf: telf,
    categoria: categoria,
  });

  socket.on(categoria, (data) => {
    render(data);
  });

  


  //Subscriptor funciona
//   const pubsub = new PubSub();
//   console.log(pubsub);
//   console.log(categoria);
//   console.log(nombre);
//   const topicName = categoria;
//   pubsub.topic(topicName).createSubscription("prueba24",(err,sub)=>{
//       console.log(sub);
//       const subscription = sub;
//       // Listen to and handle message and error events
//       subscription.on('message', (message)=>{
//           console.log(`Received message ${message.id}:`);
//           console.log(`Data: ${message.data}`);
//           console.log(`tAttributes: ${message.attributes}`);
        
//           // Ack the messae
//           message.ack();
//         });
//       subscription.on('error', (err) =>{
//           logging.error(err);
//         });
//       console.log(`Listening to ${topicName} with subscription ${nombre}`);
//   });

});

socket.on("entrada", (data) => {
  render(data);
});

socket.on("conectados", (data) => {
  renderUsuarios(data);
});

socket.on("desconexion", (data) => {
  quitarUsuarios(data);
});

function render(data) {
    console.log(data);
  var html = data
    .map(function (elem, index) {
      return `<div class="w3-col w3-container m12 l9">
                     <strong>${elem.author}</strong>:
                     <p>${elem.text}</p>
                 </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
  var element = document.createElement("div");
  element.id = "foco";
  document.getElementById("messages").parentNode.append(element);
  sinjQuery();
}

function quitarUsuarios(data) {
  console.log(data);
  var objetivo = document.getElementById(data);
  objetivo.style.display = "none";
}

function renderUsuarios(data) {
  var html = data
    .map(function (elem, index) {
      return `
        <li class="list-group-item p-0 bordePersonalizado" id="${elem.id}">
        <div class="row">
            <div class="col-sm-4">
                <img src="${elem.foto}" class="rounded fotoUsuario" alt="Perfil">
            </div>
            <div class="col-sm-8 d-flex align-middle">
                <p class="text-justify centrado text-wrap">
                    ${elem.user}<br>
                    ${elem.email}<br>
                    ${elem.telf}<br>
                </p>
            </div>
        </div>
        </li>
        `;
    })
    .join("");
  document.getElementById("usuarios").innerHTML = html;
}

function enviarMensaje() {
  var mensaje = document.getElementById("inputMsg").value;
  if (mensaje != "") {
    socket.emit("mensajeEnviado", {
      author: nombre,
      text: mensaje,
      cate: categoria,
    });
    document.getElementById("inputMsg").value = "";
  }


}
$(document).on('click', '#enviar', function () {
    enviarMensaje();

});


function sinjQuery() {
  var e = document.getElementById("scroll");
  e.innerHTML += '<div class="chatMessage"></div>';
  var objDiv = document.getElementById("scroll");
  objDiv.scrollTop = objDiv.scrollHeight;
}
