'use strict'
const md5 = require('md5')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

var cookieKey = 'sid'
var db = []

function register(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400).send("username or password is missing")
		return
	}
	var salt = Math.random()*1000;
	var hash = md5(password + salt)
	db[username] = {salt, hash}
	res.send({username: username, status: "success"})
}

function login(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400).send("username or password is missing")
		return
	}
	if(!db[username]){
		res.sendStatus(401).send("Don't have this user in db")
	}
	var salt = db[username].salt;
	var hash = db[username].hash;
	var sid = Math.floor(Math.random()*1000);
	if(md5(password + salt) === hash){
		res.cookie(cookieKey, sid, {maxAge: 3600*1000, httpOnly: true})
		res.send({ username: username, result: 'success'})
	} else{
		res.sendStatus(401).send("incorrect password!")
	}

}

module.exports = app => {
	app.use(bodyParser.json());
	app.use(cookieParser());
    app.post('/register', register);
    app.post('/login', login);
}