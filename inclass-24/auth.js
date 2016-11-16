'use strict';
//this is the stub for authentication
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cookieKey = 'sid'
var users = [];
const User = require('./model.js').User
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = 'I like to be a web developer!'
const redis = require('redis').createClient('redis://h:pebdu2c5imodt220kupckrm1sqo@ec2-54-225-80-250.compute-1.amazonaws.com:21249')
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
	const userObj = {username, salt, hash}
	new User(userObj).save(function (err, usr){
		if(err) return console.log(err)
	})
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

	User.find({username: username}).exec(function(err, users){
        if (users === null || users.length === 0){
            res.sendStatus(401)
            return
        }
        userObj = users[0]
		if(!userObj){
			res.sendStatus(401).send("Don't have this user in db")
		}
		var salt = userObj.salt;
		var hash = userObj.hash;

		if(md5(password + salt) === hash){
			var const sessionKey = md5(secret + new Date().getTime() + db[username])
			redis.hmset(sessionKey, userObj)
			res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
			res.send({ username: username, result: 'success'})
		} else{
			res.sendStatus(401).send("incorrect password!")
		}
	})
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
	var sessionKey = req.cookie[cookieKey]
	if (!sessionKey){
        return res.sendStatus(401)
    }
    redis.hgetall(sessionKey, function(err, userObj) {
    	if(err) {
    		console.log('${err} happen')
    	}
    	console.log(sessionKey + 'mapped to ' + userObj)
    	if(userObj){
    		username = userObj.username
			next()
		}
		else{
			res.redirect('/login')
		}
    })
	
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
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile', isLoggedIn, profile)
}
