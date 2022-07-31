//
//  ModuleBridge.m
//  ReduxSagaExample
//
//  Created by Macbook Pro on 31/07/2022.
//

#import <Foundation/Foundation.h>
#import "ModuleBridge.h"
#import "AppDelegate.h"
#import <CoreLocation/CoreLocation.h>

@implementation ModuleBridge : NSObject
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(callFromJS,
                 data:(NSDictionary *)_data
                 resolve:(RCTPromiseResolveBlock)_resolve
                 reject:(RCTPromiseRejectBlock)_reject) {
  for (NSString* key in _data) {
    NSString *value = _data[key];
    NSLog(@"%@", key);
    NSLog(@"%@", value);
  }
  _resolve(@"");
}

@end
