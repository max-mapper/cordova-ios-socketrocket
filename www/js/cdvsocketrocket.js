var SocketRocket = function() {
  this.messageCallback = false
}

SocketRocket.prototype.connect = function(server, cb) {
  cordova.exec(cb, null, "SocketRocketPlugin", "connect", [{server: server}])
}

SocketRocket.prototype.send = function(message) {
  cordova.exec(null, null, "SocketRocketPlugin", "send", [{message: message}])
}

SocketRocket.prototype.onMessage = function(cb) {
  this.messageCallback = cb
}

SocketRocket.prototype.messageReceiver = function(message) {
  if (this.messageCallback) this.messageCallback(message)
}

cordova.addConstructor(function() {
  if (!window.plugins) window.plugins = {}
  window.plugins.SocketRocket = new SocketRocket()
})
