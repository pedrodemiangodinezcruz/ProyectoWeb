const express = require("express");
var path = require('path');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const methodOverride = require("method-override");
const exp = require("constants");
app.set('view engine', 'ejs');
var Cryptr = require('cryptr');
cryptr = new Cryptr('devnami');
var crypto = require('crypto');
var assert = require('assert');
var fs = require('fs');
require('dotenv/config');
app.use(bodyParser.urlencoded({ extender: true }));


app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));


mongoose.connect("mongodb+srv://Demian:57008345@cluster0.5lvxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })

//Schema para usuario
const UsuarioSchema = {
	nombre: String,
	correo: String,
	contrasena: String
}
const usuario = mongoose.model('Usuarios', UsuarioSchema);

//Altas trabajador
app.post("/trabajadores", function (req, res) {
	console.log("Alta exitosa");
	var cipher = crypto.createCipher(algorithm, key); 
	let newUsuario = new usuario({
		nombre: req.body.Nombre,
		correo: req.body.Email,
		contrasena: cipher.update(req.body.contrasenia, 'utf8', 'hex') + cipher.final('hex')
	});
	res.render('Registro', { alta: 'true' })
	newUsuario.save();
})

app.get("/", function (req, res) {
	res.render('index', { success: '' })
	
})

app.listen(3000, function () {
	console.log("Servidor corriendo en el puerto 3000");
})