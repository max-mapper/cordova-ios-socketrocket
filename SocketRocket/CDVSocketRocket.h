#import "SRWebSocket.h"
#import <Cordova/CDVPlugin.h>

@interface SocketRocketPlugin : CDVPlugin <SRWebSocketDelegate>{
  NSString* openCallbackId;
}
@property (nonatomic, copy) NSString* openCallbackId;
- (void) webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) connect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end