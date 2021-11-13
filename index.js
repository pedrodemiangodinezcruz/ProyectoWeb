const express = require("express");
var path = require('path');
const app = express();
//const ejs = require('ejs');
//app.set('view engine', 'ejs');

app.listen(3000, function () {
	console.log("Servidor corriendo en el puerto 3000");
})

app.use(express.static(path.join(__dirname, 'public_html')));


app.get("/", function (req, res) {
	res.render('index', { success: '' })
	
})