
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	res.send({ headlines: [{
			username: req.params.user,
			headline: 'Happy every day!'
	}]})
}

const putHeadline = (req, res) => {
	res.send({ headlines: [{
			username: 'sep1',
			headline: req.body.headline || 'you did not supply it'
	}]})
}

const getEmail = (req, res) => {
	res.send({ email: [{
			username: req.params.user,
			email: req.params.user + '@rice.edu'
	}]})
}

const putEmail = (req,res) => {
	res.send({ email: [{
			username: 'sep1',
			email: req.body.email || 'you did not supply it'
	}]})
}

const getZipcode = (req, res) => {
	res.send({ zipcode: [{
			username: req.params.user,
			zipcode: '77005'
	}]})
}

const putZipcode = (req,res) => {
	res.send({ zipcode: [{
			username: 'sep1',
			zipcode: req.body.zipcode || 'you did not supply it'
	}]})
}

const getAvatars = (req, res) => {
	res.send({ avatar: [{
			username: req.params.user,
			avatar: 'http://www.rice.edu/_images/rice-logo.jpg'
	}]})
}

const putAvatar = (req,res) => {
	res.send({ avatar: [{
			username: 'sep1',
			avatar: req.body.avatar || 'you did not supply it'
	}]})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
}
