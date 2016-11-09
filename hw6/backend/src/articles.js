'use strict';
//this is the stub for article

let articles = [
        {id: 1, text:"text1", author:"jr58", date:new Date(), comment:[]},
        {id: 2, text:"text2", author:"jy56", date:new Date(), comment:[]},
        {id: 3, text:"text3", author:"mz22", date:new Date(), comment:[]}
]

let nextID = 4

const getArticle = (req, res) => {
    if(req.params.id) {
        let target = articles.filter((item)=>{return item.id == req.params.id })
        if(target.length ===0)
            res.send([])
    	res.status(200).send({articles: target})
    }
    else{
        res.status(200).send({articles: articles})
    }
}

const updateArticle = (req, res) => {
    if (!req.params.id || req.params.id > nextID) {
    	res.sendStatus(400).send('invalid ID!')
    } else {
    	let target = articles.filter((item)=>{
            if(item.id == req.params.id) {
                item.text = req.body.text
                return item.id == req.params.id
            }
        })
        res.status(200).send({articles: target});
    }
}

const postArticle = (req, res) => {
	if(!req.body.text){
    	res.status(400).send("text is missing");
    	return;
    }
    var payload_new = {id: nextID, text:req.body.text, author:'Ryan', date:new Date(), comment:[]}
    articles.push(payload_new)
    res.status(200).send({articles: [payload_new]})
    nextID++;
}


module.exports = (app) => {
    app.get('/articles/:id?', getArticle)
    app.put('/articles/:id', updateArticle)
    app.post('/article', postArticle)
}