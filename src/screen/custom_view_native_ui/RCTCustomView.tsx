import {
  ImageSourcePropType,
  requireNativeComponent,
  ViewProps,
} from 'react-native';


export interface NativeEvent<E = {message: string}> {
  nativeEvent: E;
}
interface CustomViewProps extends ViewProps {
  /**
   * The image source (either a remote URL or a local file resource).
   *
   * This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments.
   * The native side will then choose the best uri to display based on the measured size of the image container.
   * A cache property can be added to control how networked request interacts with the local cache.
   *
   * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
   */
  source: ImageSourcePropType;
  /**
   * The title of text below image
   */
  title: string;
  onClickTestButton: (event: NativeEvent) => void;
}

/**
 * Composes `View`.
 *
 * - source: ImageSourcePropType
 * - title: string
 */

const RCTCustomView = requireNativeComponent<CustomViewProps>('RCTCustomView');

export default RCTCustomView;
