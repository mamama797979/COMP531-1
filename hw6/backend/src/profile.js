'use strict';

// this is profile.js which contains all user profile 
// information except passwords which is in auth.js

const profiles = [
		{	username : 'jr58', 
			email : 'jr58@rice.edu',
			zipcode: 77030,
			avatar: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTas_QZbc3dYPh5zikUqlbtcu-gaLUyPYutG6Mw4z_T7NoUcWxNMDpyhV8',
			dob: Date.parse('1990-01-01'),
			headline: "jr58 headline"
		},
		{	username : 'mz22', 
			email : 'mz22@rice.edu',
			zipcode: 77031,
			avatar: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTas_QZbc3dYPh5zikUqlbtcu-gaLUyPYutG6Mw4z_T7NoUcWxNMDpyhV8',
			dob: Date.parse('1994-12-12'),
			headline: "mz22 headline"
		},
		{	username: 'loggedInUser',
			email : 'loggedInUser@rice.edu',
			zipcode: 77050,
			avatar: 'http://www.rice.edu/_images/rice-logo.jpg',
			dob: Date.parse('1990-02-02'),
			headline: "defalut headline"
		}
]

const getHeadlines = (req, res) => {
	if (!req.user) {
		req.user = 'loggedInUser'
	}
	const users = req.params.users ? req.params.users.split(',') : [req.user]
	var headlines = users.map(user => {
		let target = profiles.filter((item)=>{return item.username == user})
		return {username: user, headline: target[0].headline}
	})
	res.send({headlines})
}

const putHeadline = (req, res) => {
	const user = 'loggedInUser'
	const headline = req.body.headline
	if (!headline) {
		res.status(400).send('you did not supply headline')
	}
	let target = profiles.filter((item)=>{
		item.headline = headline
		return item.username == user
	})
	res.status(200).send({username: user, headline: target[0].headline})
}

const getEmail = (req, res) => {
	if (!req.user) {
		req.user = 'loggedInUser'
	}
	const user = req.params.user ? req.params.user : req.user
	let target = profiles.filter((item)=>{return item.username == user})
	res.status(200).send({username: user, email: target[0].email})
}

const putEmail = (req,res) => {
	const user = 'loggedInUser'
	const email = req.body.email
	if (!email) {
		res.status(400).send('you did not supply email')
	}
	let target = profiles.filter((item)=>{
		item.email = email
		return item.username == user
	})
	res.status(200).send({username: user, email: target[0].email})
}

const getZipcode = (req, res) => {
	if (!req.user) {
		req.user = 'loggedInUser'
	}
	const user = req.params.user ? req.params.user : req.user
	let target = profiles.filter((item)=>{return item.username == user})
	res.status(200).send({username: user, zipcode: target[0].zipcode})
}

const putZipcode = (req,res) => {
	const user = 'loggedInUser'
	const zipcode = req.body.zipcode
	if (!zipcode) {
		res.status(400).send('you did not supply zipcode')
	}
	let target = profiles.filter((item)=>{
		item.zipcode = zipcode
		return item.username == user
	})
	res.status(200).send({username: user, zipcode: target[0].zipcode})
}

const getAvatars = (req, res) => {
	if (!req.user) {
		req.user = 'loggedInUser'
	}
	const users = req.params.users ? req.params.users.split(',') : [req.user]
	var avatars = users.map(user => {
		let target = profiles.filter((item)=>{return item.username == user})
		return {username: user, avatar: target[0].avatar}
	})
	res.send({avatars})
}

const putAvatar = (req,res) => {
	const user = 'loggedInUser'
	const avatar = req.body.avatar
	if (!avatar) {
		res.status(400).send('you did not supply avatar')
	}
	let target = profiles.filter((item)=>{
		item.avatar = avatar
		return item.username == user
	})
	res.status(200).send({username: user, avatar: target[0].avatar})
}

const getDob = (req, res) => {
	if (!req.user) {
		req.user = 'loggedInUser'
	}
	const user = req.params.user ? req.params.user : req.user
	let target = profiles.filter((item)=>{return item.username == user})
	res.status(200).send({username: user, dob: target[0].dob})
}

module.exports = app => {
     app.get('/headlines/:users?', getHeadlines)
     app.put('/headline', putHeadline)

     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)

     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)

     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatar)

     app.get('/dob', getDob)
}
