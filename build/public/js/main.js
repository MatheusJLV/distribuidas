var socket = io.connect('http://localhost:3000');
var nombre = "";
var foto = "";
var email = "";
var telf = "";

document.addEventListener("DOMContentLoaded", function(event) {
    nombre = prompt("Ingrese su nombre");
    foto = prompt("Link de foto", "https://www.creartuavatar.com/images/m7.svg");
    email = prompt("Ingrese su email(opcional)", "------@example.com");
    telf = prompt("Ingrese su Telefono(opcional)", "09-------");
    socket.emit("iniciar", { nombre: nombre, foto: foto, email: email, telf: telf });
});

socket.on('entrada', (data) => {
    render(data)
});

socket.on("conectados", (data) => {
    renderUsuarios(data)
});

function render(data) {
    var html = data.map(function (elem, index) {
        return (`<div class="w3-col w3-container m12 l9">
                     <strong>${elem.author}</strong>:
                     <p>${elem.text}</p>
                 </div>`)

    }).join(" ");
    document.getElementById('messages').innerHTML = html;
    var element = document.createElement("div");
    element.id = "foco";
    document.getElementById('messages').parentNode.append(element);
    sinjQuery();
}

function renderUsuarios(data) {
    var html = data.map(function (elem, index) {
        return (`
        <li class="list-group-item p-0 bordePersonalizado">
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
        `)
    }).join("");
    document.getElementById("usuarios").innerHTML = html;
}

function enviarMensaje() {
    var mensaje = document.getElementById("inputMsg").value;
    socket.emit("mensajeEnviado", { author: nombre, text: mensaje })
    document.getElementById("inputMsg").value = "";
}

function sinjQuery() {
    var e = document.getElementById('scroll');
    e.innerHTML += '<div class="chatMessage"></div>';
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
}