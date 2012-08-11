#import "SRWebSocket.h"
#import <Cordova/CDVPlugin.h>

@interface SocketRocketPlugin : CDVPlugin <SRWebSocketDelegate>{
  NSString* openCallbackId;
  NSString* messageCallbackId;
}
@property (nonatomic, copy) NSString* openCallbackId;
@property (nonatomic, copy) NSString* messageCallbackId;
- (void) webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) connect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end