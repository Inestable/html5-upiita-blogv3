/*1.- obtenemos un objeto que no permita usar la libreria express*/
var express = require("express");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
/* librerias para el chat */
var socketio = require("socket.io");
var sanitizer = require("sanitizer");
var http = require("http");

var app = express(); /* Servidor sencillo */
var servidor = http.createServer(app); /* Servidor http que es mas robusto */
servidor.listen(8010);

console.log("servidor levantado...");

/*configurar el sistema de templates*/
nunjucks.configure(__dirname + "/vistas",{
	express:app
});
console.log("sistema de templates configirado..");
/* usar body parser para recibir parametros del cliente */
app.use(bodyParser());

/*configurar rutas estaicas*/
app.use("/css", express.static(__dirname + "/css"));
app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/javascript", express.static(__dirname + "/javascript"));
app.use("/videos", express.static(__dirname + "/videos"));

console.log("rutas estaicas configuradas ..");

/*responder a peticiones get*/
/* http://127.0.0.1:8010/ */
app.get("/", function(request, response){
      response.render("index.html");
});
/* http://127.0.0.1:8010/ */
app.get("/home", function(request, response){
      response.render("index.html");
});
/* http://127.0.0.1:8010/ */
app.get("/galeria", function(request, response){
      response.render("galeria.html");
});
/* http://127.0.0.1:8010/ */
app.get("/contacto", function(request, response){
      response.render("contacto.html");
});
/* http://127.0.0.1:8010/ */
app.get("/chat", function(request, response){
      response.render("chat.html");
});


/*Responder a una peticion post */
app.post("/suscribir",function(request,response){
	var correo = request.body.email;
	console.log("Email "+ correo);
	response.render("suscribir.html",{
		email: correo,
		mensaje: "Hola Cliente"
	});
});

app.post("/contactar",function(request,response){
	var nombre = request.body.nombre;
	var email = request.body.email;
	var web = request.body.web;
	var edad = request.body.edad;
	var comentario = request.body.comentario;
	response.render("contactar.html",{
		nombreM: nombre,
		emailM: email,
		webM: web,
		edadM: edad,
		comentarioM: comentario
	});
});


/* Chat */
/* Obtener un socket para comunicarme con todos */

var io = socketio.listen(servidor);

/* escuchar peticiones de todos los clientes */
io.sockets.on("connection", function(socket){
	console.log("Prueba");
		socket.on("mensaje_al_servidor", function(datosCliente){
		var nombre = sanitizer.escape(datosCliente.nombre);
		var mensaje = sanitizer.escape(datosCliente.mensaje);
		console.log("Mensaje de: " + nombre + " el mensaje es: " + mensaje); 
		/* Envio datos a todos */
		io.sockets.emit("mensaje_al_cliente",{
			nombreCliente: nombre,
			mensajeCliente: mensaje
		});
	});
	/* socket representa al cliente que me envió un mensaje */
});















