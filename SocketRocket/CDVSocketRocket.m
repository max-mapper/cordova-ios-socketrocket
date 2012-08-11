#import "CDVSocketRocket.h"
#import <Cordova/JSONKit.h>
#import <Cordova/CDVAvailability.h>

// #define TWITTER_URL @"http://api.twitter.com/1/"

@implementation SocketRocketPlugin {
  SRWebSocket *_webSocket;
}

@synthesize openCallbackId;


- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
{
  NSLog(@"Received \"%@\"", message);
  // [super writeJavascript:[[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message] toSuccessCallbackString:callbackId]];
}

- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
  NSString *message = [options objectForKey:@"message"];
  NSLog(@"Sending \"%@\"", message);
  [_webSocket send:message];
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