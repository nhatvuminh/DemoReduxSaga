//
//  ModuleBridge.h
//  ReduxSagaExample
//
//  Created by Macbook Pro on 31/07/2022.
//

#import <Foundation/Foundation.h>
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTLog.h"
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#endif

@interface ModuleBridge : NSObject<RCTBridgeModule>

@end
