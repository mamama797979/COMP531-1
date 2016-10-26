
let articles = [{id : 1, author: 'Scott', text: 'A post1'},
                {id : 2, author: 'Vivid', text: 'A post2'},
                {id : 3, author: 'Max', text: 'A post3'}
                         ]
let id = 4;

const getArticle = (req, res) => {
    
    var payload_article = { 'articles': articles}
    res.send(payload_article)
}

const getArticlesById = (req, res) => {
    if (req.params.id){
        res.send(articles.articles[req.params.id])
    }
    else{
        res.send(articles.articles)
    }
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body.body)
     var payload_new = {'articles': [{id: id, author: 'Ryan', text: req.body.body}]}
     res.send(payload_new)
     articles.push({id: id, author: 'Ryan', text: req.body.body})
     id++;
}


module.exports = (app) => {
    app.get('/articles', getArticles)
    app.get('/articles/:id?', getArticlesById)
    app.post('/article', addArticle)
}