import React from 'react';
import {Dimensions} from 'react-native';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

const {width, height} = Dimensions.get('window');

interface CTLoader {

}

function CTLoader(props : CTLoader) {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={60}
      viewBox={`0 0 ${width} ${60}`}
      backgroundColor={'#cccccc'}
      foregroundColor={'gray'}
      {...props}>
      <Circle x={40} y={25} r={25} />
      <Rect x={90} y={12} rx={3} ry={3} width={100} height={15} />
      <Rect x={240} y={12} rx={3} ry={3} width={30} height={15} />

      <Rect x={width - 80} y={10} rx={3} ry={3} width={25} height={20} />
    </ContentLoader>
  );
}

export default React.memo(CTLoader);
