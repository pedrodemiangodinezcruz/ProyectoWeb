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


app.listen(3000, function () {
	console.log("Servidor corriendo en el puerto 3000");
})

app.use(express.static(path.join(__dirname, 'public_html')));



//Altas trabajador
app.post("/trabajadores", function (req, res) {
	console.log("Alta exitosa");
	var cipher = crypto.createCipher(algorithm, key); 
	var codigo = req.body.codigo;
	console.log(codigo);
	if(codigo == '989'){
	let newTrabajador = new trabajador({
		nombre: req.body.Nombre,
		apellido: req.body.Apellido,
		correo: req.body.Email,
		contrasena: cipher.update(req.body.contrasenia, 'utf8', 'hex') + cipher.final('hex'),
		tipo: req.body.Profesion
	});
	res.render('Registro', { alta: 'true' })
	newTrabajador.save();}
	else{
		res.render('Registro', { alta: 'false' })
	}
})

app.get("/", function (req, res) {
	res.render('index', { success: '' })
	
})