import React from 'react';
import RCTCustomView, { NativeEvent } from './RCTCustomView';

const CustomViewScreen = () => {

  const onClickTestButton = (event: NativeEvent) => {
    console.log(event.nativeEvent.message);
  }

  return (
    <RCTCustomView
      style={{ flex: 1 }}
      title={'NhatVM'}
      onClickTestButton={onClickTestButton}
      source={{
        uri:
          'https://cdn.dribbble.com/users/1998175/screenshots/15865091/media/03d251f151d9cd7141f72450eb46bcf2.jpg?compress=1&resize=1600x1200&vertical=top',
      }}
    />
  );
};

export default CustomViewScreen;