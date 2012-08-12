#import "CDVSocketRocket.h"

@implementation SocketRocketPlugin {
  SRWebSocket *_webSocket;
}

@synthesize openCallback;

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message; {
  NSString *jsStatement = [NSString stringWithFormat:@"window.plugins.SocketRocket.messageReceiver(%@);", message];
  [self writeJavascript:jsStatement];
}

- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
  NSString *message = [options objectForKey:@"message"];
  [_webSocket send:message];
}

- (void) connect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
  self.openCallback = [arguments objectAtIndex:0];
  NSString *server = [options objectForKey:@"server"];

  _webSocket.delegate = nil;
  [_webSocket close];
  // NSLog(@"Connecting \"%@\"", server);
  
  _webSocket = [[SRWebSocket alloc] initWithURLRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:server]]];
  _webSocket.delegate = self;
  [_webSocket open];
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket; {
  [super writeJavascript:[[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] toSuccessCallbackString:self.openCallback]];
}

@end