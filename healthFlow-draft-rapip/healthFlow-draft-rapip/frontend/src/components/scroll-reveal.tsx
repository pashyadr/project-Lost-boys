import type { ReactNode } from 'react';
import { Dimensions, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

const SCREEN_H = Dimensions.get('window').height;

type Props = {
  scrollY: SharedValue<number>;
  /** Isi biasa, atau fungsi yang menerima posisi atas elemen (untuk parallax di dalamnya). */
  children: ReactNode | ((top: SharedValue<number>) => ReactNode);
  /** Geser awal (px) sebelum elemen naik ke posisinya. */
  distance?: number;
  className?: string;
};

/**
 * Elemen muncul (fade + naik + sedikit membesar) saat masuk layar,
 * digerakkan langsung oleh posisi scroll di UI thread, jadi tetap 60fps.
 *
 * PENTING: pasang sebagai anak LANGSUNG dari ScrollView, karena posisi
 * diukur relatif terhadap induknya.
 */
export function ScrollReveal({ scrollY, children, distance = 48, className }: Props) {
  const reduceMotion = useReducedMotion();
  const top = useSharedValue(-1);
  const onLayout = (e: LayoutChangeEvent) => {
    top.value = e.nativeEvent.layout.y;
  };

  const style = useAnimatedStyle(() => {
    if (reduceMotion || top.value < 0) return { opacity: 1 };
    // 0 = baru menyentuh bawah layar, 1 = sudah 160px masuk.
    const p = interpolate(scrollY.value + SCREEN_H - top.value, [0, 160], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: p,
      transform: [{ translateY: (1 - p) * distance }, { scale: 0.94 + p * 0.06 }],
    };
  });

  return (
    // className dipasang di View biasa: NativeWind tidak meneruskannya ke Animated.View.
    <Animated.View onLayout={onLayout} style={style}>
      <View className={className}>{typeof children === 'function' ? children(top) : children}</View>
    </Animated.View>
  );
}
