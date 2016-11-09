'use strict'
let articles = [{id : 1, author: 'Scott', text: 'A post1'},
                {id : 2, author: 'Vivid', text: 'A post2'},
                {id : 3, author: 'Max', text: 'A post3'}
                         ]
let id = 4;

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

const getArticles = (req, res) => {
	if(req.params.id){
		let target = articles.filter((item)=>{return item.id == req.params.id })
		if(target.length!==0){
			res.send({articles:target});
		}
		else{
			res.send({articles:[]})
		}
	}
	else{
		res.send({articles:articles});
	}
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body.text)
     var payload_new = {'articles': [{id: id, author: 'Ryan', text: req.body.text}]}
     res.send(payload_new)
     articles.push({id: id, author: 'Ryan', text: req.body.text})
     id++;
}



module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/articles/:id*?',getArticles)
     app.post('/article', addArticle)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
}
