var socket = io.connect('http://localhost:3000');
var nombre = "";
var foto = "";
var email = "";
var telf = "";
var categoria="";
var dato_nombre="";
var dato_mail="";
var dato_telefono="";
var dato_categoria="";
var dato_foto="";
const queryString = window.location.search;
var urlParams={};

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("aqui chill");
    console.log(queryString);
    urlParams = new URLSearchParams(queryString);
    dato_nombre= urlParams.get('user');
    dato_mail= urlParams.get('email');
    dato_telefono= urlParams.get('telf');
    dato_categoria= urlParams.get('categoria');
    dato_foto= urlParams.get('foto');
    console.log(dato_nombre);

    nombre = dato_nombre;
    foto = dato_foto;
    email = dato_mail;
    telf = dato_telefono;
    categoria=urlParams.get('categoria');
    socket.emit("iniciar", { nombre: nombre, foto: foto, email: email, telf: telf, categoria:categoria});
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
    socket.emit("mensajeEnviado", { author: nombre, text: mensaje, cate:categoria})
    document.getElementById("inputMsg").value = "";
}

function sinjQuery() {
    var e = document.getElementById('scroll');
    e.innerHTML += '<div class="chatMessage"></div>';
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
}