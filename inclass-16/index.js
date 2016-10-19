
const express = require('express')
const bodyParser = require('body-parser')

let articles = [{id : 1, author: 'Scott', text: 'A post1'},
                {id : 2, author: 'Vivid', text: 'A post2'},
                {id : 3, author: 'Max', text: 'A post3'}
                         ]
let id = 4;

const getArticle = (req, res) => {
	
    var payload_article = { 'articles': articles}
    res.send(payload_article)
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body.body)
     var payload_new = {'articles': [{id: id, author: 'Ryan', text: req.body.body}]}
     res.send(payload_new)
     articles.push({id: id, author: 'Ryan', text: req.body.body})
     id++;
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
