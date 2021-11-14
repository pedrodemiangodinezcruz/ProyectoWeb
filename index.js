const express = require("express");
var path = require('path');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const methodOverride = require("method-override");
const exp = require("constants");
app.set('view engine', 'ejs');
var assert = require('assert');
var fs = require('fs');
require('dotenv/config');
app.use(bodyParser.urlencoded({ extender: true }));


app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));


mongoose.connect("mongodb+srv://Demian:57008345@cluster0.5lvxl.mongodb.net/ProyectoWeb?retryWrites=true&w=majority", { useNewUrlParser: true })

//Schema para usuario
const UsuarioSchema = {
	nombre: String,
	correo: String,
	contrasena: String
}
const usuario = mongoose.model('Usuarios', UsuarioSchema);

//Altas trabajador
app.post("/usuarios", function (req, res) {
	console.log("Alta exitosa");
	let newUsuario = new usuario({
		nombre: req.body.Nombre,
		correo: req.body.Email,
		contrasena: req.body.contrasenia
	});
	res.render('index', { alta: 'true' })
	newUsuario.save();
})
//Linea a cambiar para ver su pagina
app.get("/", function (req, res) {
	res.render('karla', { success: '' })
	
})

//Para cargar pagina de registro de usuarios
app.get('/registrarUsuario', (req, res) => {
	res.render('registro', { alta: '' })
	
})


app.listen(3000, function () {
	console.log("Servidor corriendo en el puerto 3000");
})