//
//  CustomViewManager.m
//  ReduxSagaExample
//
//  Created by Macbook Pro on 30/09/2022.
//

#import <Foundation/Foundation.h>
#import "CustomViewManager.h"

@implementation RCTCustomView

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(title, NSString)

- (UIView *) view
{
  
  UIView *parentView = [[UIView alloc]init];
  UITextView *lbTitle = [[UITextView alloc]init];

  UIView *squareChildView = [[UIView alloc]init];
  [squareChildView setTranslatesAutoresizingMaskIntoConstraints:NO];
  
  squareChildView.backgroundColor = [UIColor yellowColor];
  [parentView addSubview:squareChildView];
  
  [lbTitle setText:self.title];

  [lbTitle setTextColor:[UIColor blackColor]];
  [lbTitle sizeToFit];
  
  NSLayoutConstraint *centerX = [NSLayoutConstraint constraintWithItem:squareChildView attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:parentView attribute:NSLayoutAttributeCenterX multiplier:1 constant:0];
  NSLayoutConstraint *centerY = [NSLayoutConstraint constraintWithItem:squareChildView attribute:NSLayoutAttributeCenterY relatedBy:NSLayoutRelationEqual toItem:parentView attribute:NSLayoutAttributeCenterY multiplier:1 constant:0];

  NSLayoutConstraint *height = [NSLayoutConstraint constraintWithItem:squareChildView attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1 constant:200];

  NSLayoutConstraint *width = [NSLayoutConstraint constraintWithItem:squareChildView attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1 constant:200];

//  NSLayoutConstraint *top_lbTitle_squareChildView = [NSLayoutConstraint constraintWithItem:squareChildView attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:lbTitle attribute:NSLayoutAttributeBottom multiplier:1 constant:20];


  [parentView addConstraints:@[centerX, centerY]];
  [squareChildView addConstraints:@[height, width]];
  [squareChildView addSubview:lbTitle];

  
  return parentView;
}



@end
