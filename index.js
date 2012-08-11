var WebSocketServer = require('websocket').server
var http = require('http')
var ntwitter = require('ntwitter')
var events = require('events')

var tweets = new events.EventEmitter()
var currentStream

var twit = new ntwitter({
  consumer_key: process.env['TWITTER_CONSUMER_KEY'],
  consumer_secret: process.env['TWITTER_CONSUMER_SECRET'],
  access_token_key: process.env['TWITTER_ACCESS_TOKEN_KEY'],
  access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
})

var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url)
  response.writeHead(404)
  response.end()
})

function startStreaming(options) {
  twit.stream('statuses/filter', options, function(stream) {
    currentStream = stream
    stream.on('data', function (data) {
      console.log(data.text)
      tweets.emit('tweet', data.text)
    })
    stream.on('error', function(err) {
      tweets.emit('tweet', err)
    })
  })
}

server.listen(9000, function() {
  console.log((new Date()) + ' Server is listening on port 9000')
})

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

wsServer.on('request', function(request) {
  var connection = request.accept()
  console.log((new Date()) + ' Connection accepted.')
  tweets.on('tweet', function(tweet) {
    connection.sendUTF(JSON.stringify(tweet))
  })
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      if (!currentStream) {
        startStreaming(JSON.parse(message.utf8Data))
        connection.sendUTF(JSON.stringify("STREAMING HAS BEGUN"))
      }      
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
      connection.sendBytes(message.binaryData)
    }
  })
  connection.on('close', function(reasonCode, description) {
    if (currentStream) {
      currentStream.destroy()
      currentStream = false
    }
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
  })
})

