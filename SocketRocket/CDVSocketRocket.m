#import "CDVSocketRocket.h"

@implementation SocketRocketPlugin {
  SRWebSocket *_webSocket;
}

@synthesize openCallbackId;
@synthesize messageCallbackId;

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
{
  if (messageCallbackId.length > 0) {
    [super writeJavascript:[[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message] toSuccessCallbackString:messageCallbackId]];
  }
}

- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
  NSString *message = [options objectForKey:@"message"];
  NSLog(@"Sending \"%@\"", message);
  [_webSocket send:message];
}

- (void) onMessage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
  self.messageCallbackId = [arguments objectAtIndex:0];
}

- (void) connect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
  self.openCallbackId = [arguments objectAtIndex:0];
  NSString *server = [options objectForKey:@"server"];

  _webSocket.delegate = nil;
  [_webSocket close];
  NSLog(@"Connecting \"%@\"", server);
  
  _webSocket = [[SRWebSocket alloc] initWithURLRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:server]]];
  _webSocket.delegate = self;
  [_webSocket open];
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket;
{
  [super writeJavascript:[[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] toSuccessCallbackString:self.openCallbackId]];
}

@end