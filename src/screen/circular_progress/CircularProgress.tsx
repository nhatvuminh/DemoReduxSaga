import colors from "../../colors";
import React, { memo, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedProps, withSpring, withTiming, useSharedValue } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import globalStyles from "../../globalStyles";

const IMAGE_SIZE = 70;
const strokeWidth = 2;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (IMAGE_SIZE - strokeWidth) / 2;
const cx = IMAGE_SIZE / 2;
const cy = IMAGE_SIZE / 2;
const circumference = r * 2 * PI;

interface CircularProgressProps {
  progress: Animated.SharedValue<number>;
}

const CircularProgress = memo(({ }: CircularProgressProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    let percent = 0;
    let id = setInterval(() => {
      percent += 1;
      console.log({ percent });
      progress.value = withTiming(percent / 10, { easing: Easing.linear });
      if (Math.round(percent) === 10 || Math.ceil(percent) === 10) {
        clearInterval(id);
        return;
      }
    }, 1000);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={globalStyles.fullFillCenter}>
      <Svg width={IMAGE_SIZE} height={IMAGE_SIZE} style={styles.container}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor={colors.primaryColor} />
            <Stop offset="1" stopColor="#ef9837" />
          </LinearGradient>
        </Defs>
        <Circle
          stroke={colors.gray_edecea}
          fill="none"
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
        <AnimatedCircle
          stroke={"url(#grad)"}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
      </Svg>
      <Image
        style={styles.image}
        source={{
          uri:
            'https://play-lh.googleusercontent.com/94nYd8ymtXZ0MM1KCKPWGNVXLu8y1RDEWzq57FSfjaYwyxjlXWAjDr0Aii8QNoxq6IE=w1866-h976-rw',
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: "270deg" }],
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    position: 'absolute',
  }
});

export default CircularProgress;
