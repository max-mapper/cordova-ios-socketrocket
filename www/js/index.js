document.addEventListener('deviceready', doSocketMagic)

function doSocketMagic() {
  var messages = document.querySelector('.messages')
  // window.plugins.CordovaSocket.onMessage(function(message) {
  //   var htmlz = '<p class="status">' + message + '</p>'
  //   messages.innerHTML = messages.innerHTML + htmlz
  //   window.scrollTo(0, document.body.scrollHeight)
  // })
  navigator.geolocation.getCurrentPosition(
    function(position) {
      window.plugins.CordovaSocket.connect("ws://smalldata.org:9000", function(message) {
        var lat = parseFloat(position.coords.latitude);
        var lon = parseFloat(position.coords.longitude);
        var bbox = [lon - 0.5, lat - 0.5, lon + 0.5, lat + 0.5]
        window.plugins.CordovaSocket.send(JSON.stringify({'locations': bbox.join(',')}))
      })
    },
    function(error) {
      messages.innerHTML = "Not allowed to read your location, sorry!"
    }
  )
}