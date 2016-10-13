var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200

     if(req.url == '/'){
          var payload = { 'hello': 'world' }
          res.end(JSON.stringify(payload) + '\n')
     }

     if(req.url == '/articles'){
          var articles = [{id : 1, author: 'Scott', body: 'A post1'},
                          {id : 2, author: 'Vivid', body: 'A post2'},
                          {id : 3, author: 'Ryan', body: 'A post3'}
                         ]
          var payload_article = { 'articles': articles}
          res.end(JSON.stringify(payload_article) + '\n')
     }

     if(req.url == '/logout' && req.method == 'PUT'){
          res.end('OK' + '\n')
     }

     if(req.url == '/login' && req.method == 'POST'){
          var body = JSON.parse(req.body)
          var payload_login = {'username': body.username, 'result': 'success'}
          res.end(JSON.stringify(payload_login) + '\n')
     }
}
