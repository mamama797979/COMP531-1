'use strict';
//this is the stub for authentication
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cookieKey = 'sid'

const register = (req, res) => {
	var username = req.body.username;
	var email = req.body.email;
	var dob = req.body.dob;
	var zipcode = req.body.zipcode;
	var password = req.body.password;
	if (!username || !email || !dob || !zipcode || !password) {
		res.status(400).send({result: "all fields should be supplied"})
		return
	}
	//successfully register
	res.send({
		username: username,
		result: 'success'
	})
}

const login = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.status(400).send({result: "username or password is missing"})
		return
	}
	var sid = Math.floor(Math.random()*1000);
	res.cookie(cookieKey, sid, {maxAge: 3600*1000, httpOnly: true})
	//successfully login
	res.status(200).send({
		username: username,
		result: 'success'
	})
}

const logout = (req, res) => {
	res.status(200).send("OK")
}

const newPassword = (req, res) => {
	var newPassword = req.body.password;
	if (!newPassword) {
		res.status(400).send({result: "newPassword is missing"})
		return
	}
	//update the password
	res.status(200).send({
		username: 'jr58',
		status: 'password will not change'
	})
}

module.exports = app => {
	app.use(cookieParser());
    app.post('/login', login);
    app.put('/logout', logout);
    app.post('/register', register);
    app.put('/password', newPassword);
}