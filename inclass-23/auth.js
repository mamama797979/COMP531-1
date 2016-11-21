'use strict';
//this is the stub for authentication
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cookieKey = 'sid'
var db = [];
var users = [];
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientID:'1205657472813475', 
	clientSecret:'3b4e1c0b74ea4ff17144aa15f09df86b', 
	callbackURL
}

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
	var salt = Math.random()*1000;
	var hash = md5(password + salt)
	db[username] = {salt, hash}
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

const logout_default = (req, res) => {
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

//use Facebook Strategy to login
passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	var user = users[id]
	done(null,user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null,profile);
		})
	}
))

function logout(req,res){
	req.logout();
	req.redirect('/')
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		next()
	}
	else{
		res.redirect('/login')
	}
}

function profile(req,res){
	res.send({'ok now what?':req.user})
}

module.exports = app => {
	app.use(cookieParser());
    app.post('/login', login);
    app.put('/logout', logout_default);
    app.post('/register', register);
    app.put('/password', newPassword);

    app.use(session({secret:'fjaksfjaldfuoiqrwe'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile', isLoggedIn, profile)
}