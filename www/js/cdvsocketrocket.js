var SocketRocket = function(){}

SocketRocket.prototype.connect = function(server, cb) {
  cordova.exec(cb, null, "SocketRocketPlugin", "connect", [{server: server}])
}

SocketRocket.prototype.send = function(message) {
  cordova.exec(null, null, "SocketRocketPlugin", "send", [{message: message}])
}

SocketRocket.prototype.onMessage = function(cb) {
  cordova.exec(cb, null, "SocketRocketPlugin", "onMessage", [])
}

cordova.addConstructor(function() {
  if (!window.plugins) window.plugins = {}
  window.plugins.SocketRocket = new SocketRocket()
})