var CordovaSocket = function() {
  this.messageCallback = false
}

CordovaSocket.prototype.connect = function(server, cb) {
  cordova.exec(cb, cb, "CordovaSocket", "connect", [{server: server}])
}

CordovaSocket.prototype.send = function(message) {
  cordova.exec(null, null, "CordovaSocket", "send", [{message: message}])
}

CordovaSocket.prototype.onMessage = function(cb) {
  this.messageCallback = cb
}

CordovaSocket.prototype.messageReceiver = function(message) {
  if (this.messageCallback) this.messageCallback(message)
}

cordova.addConstructor(function() {
  if (!window.plugins) window.plugins = {}
  window.plugins.CordovaSocket = new CordovaSocket()
})
