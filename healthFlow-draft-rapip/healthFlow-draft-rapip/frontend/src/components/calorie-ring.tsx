import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { color } from '@/theme/tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const fmt = (n: number) => Math.round(n).toLocaleString('id-ID');

/** Angka yang menghitung naik saat pertama tampil. */
function useCountUp(to: number, duration = 1100, enabled = true) {
  const [value, setValue] = useState(enabled ? 0 : to);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      setValue(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, enabled]);
  return value;
}

type Props = { eaten: number; target: number; size?: number; stroke?: number };

export function CalorieRing({ eaten, target, size = 228, stroke = 18 }: Props) {
  const reduceMotion = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const ratio = Math.min(eaten / target, 1);
  const progress = useSharedValue(reduceMotion ? ratio : 0);
  const shown = useCountUp(eaten, 1100, !reduceMotion);

  useEffect(() => {
    progress.value = reduceMotion
      ? ratio
      : withDelay(200, withTiming(ratio, { duration: 1300, easing: Easing.out(Easing.exp) }));
  }, [ratio, reduceMotion, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c * (1 - progress.value),
  }));

  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center"
      accessible
      accessibilityLabel={`Kalori ${fmt(eaten)} dari ${fmt(target)} kilokalori, sisa ${fmt(target - eaten)}`}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <LinearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={color.accentGlow} />
            <Stop offset="1" stopColor={color.accent} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${c} ${c}`}
          animatedProps={animatedProps}
        />
      </Svg>

      <Text className="font-display text-[58px] leading-[60px] text-ink">{fmt(shown)}</Text>
      <Text className="font-bodyMedium text-[14px] text-ink-muted">dari {fmt(target)} kkal</Text>
      <View className="mt-2 rounded-full bg-accent/20 px-3 py-1">
        <Text className="font-bodySemi text-[13px] text-accent-glow">sisa {fmt(target - eaten)}</Text>
      </View>
    </View>
  );
}
