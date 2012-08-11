#import "SRWebSocket.h"
#import <Cordova/CDVPlugin.h>

@interface SocketRocketPlugin : CDVPlugin <SRWebSocketDelegate>{
  NSString* openCallback;
}

@property (nonatomic, copy) NSString* openCallback;

- (void) webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) connect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end