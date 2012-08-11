document.addEventListener('deviceready', doSocketMagic)

function doSocketMagic() {
  var messages = document.querySelector('.messages')
  window.plugins.SocketRocket.onMessage(function(message) {
    var htmlz = '<p class="status">' + message + '</p>'
    messages.innerHTML = messages.innerHTML + htmlz
  })
  window.plugins.SocketRocket.connect("ws://pizzacats.local:9000", function() {
    window.plugins.SocketRocket.send(JSON.stringify({'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}))
  })
}