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

//Altas usuario
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
	res.render('index', { success: '' })
	
})

//Para cargar pagina de registro de usuarios
app.get('/registrarUsuario', (req, res) => {
	res.render('registro', { alta: '' })
	
})

app.get('/iniciarSesion', (req, res) => {
	res.render('inicioSesion', { alta: '' })
	
})
//Autorizar usuario (Verificar si tiene cuenta)
app.post('/autorizaUsuario', (req, res) => {

	let newUsuario = new usuario({
		correo: req.body.Email,
		contrasena: req.body.contrasenia
	});
	usuario.exists({ correo: req.body.Email }, function (err, doc) {
		const mail = req.body.Email;
		if (err) {
			console.log(err)
		} else {
			console.log("Estatus correo :", doc) // false
		}
		if (doc == true) {
			usuario.exists({ contrasena: newUsuario.contrasena }, function (err, doc) {
				console.log("Contraseña req.body :"+ req.body.Contrasenia);
				console.log("Contraseña newusuario :"+ newUsuario.contrasena);
				if (err) {
					console.log(err)
				} else {
					console.log("Esatus contraseña :", doc) // false
				}
				if (doc == true) {
					res.redirect('/consultaUno/'+req.body.Email);

				} else {
					console.log('No coincide la contraseña');
					res.render('karla', { success: 'false'})
				}
			});

		} else {
			console.log('No coincide el correo');
			res.render('karla', { success: 'false'})
		}
	});
	
})
//Metodo para verificar si existe el correo
app.get('/consultaUno/:id', (req, res) => {
	const { id } = req.params;
	console.log('Correo recibido: ' + id)
	usuario.findOne({correo: id}, function (err, usuarios) {
	console.log("valor del corre: " + id)
	console.log("UsarioEncontrado: " + usuarios); 
	res.render('index', { usuarios: usuarios, idUser: id }  )
})
})


app.listen(3000, function () {
	console.log("Servidor corriendo en el puerto 3000");
})