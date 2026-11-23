import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import type { week as Week } from '@/data/today';
import { color } from '@/theme/tokens';

/** Cincin yang "bernapas" di hari ini, mengajak user menutup streak. */
function TodayPulse() {
  const reduceMotion = useReducedMotion();
  const t = useSharedValue(0);
  useEffect(() => {
    if (!reduceMotion) t.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }), -1, false);
  }, [reduceMotion, t]);
  const style = useAnimatedStyle(() => ({
    opacity: 0.6 * (1 - t.value),
    transform: [{ scale: 1 + t.value * 0.6 }],
  }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        { position: 'absolute', width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: color.accent },
        style,
      ]}
    />
  );
}

export function WeekStreak({ days, streak }: { days: typeof Week; streak: number }) {
  return (
    <View className="rounded-[24px] border border-field-line bg-field p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="fire" size={26} color={color.accent} />
          <Text className="ml-1.5 font-display text-[26px] text-ink">{streak} hari beruntun</Text>
        </View>
        <Text className="font-bodyMedium text-[13px] text-ink-muted">Rekor: 15</Text>
      </View>

      <View className="flex-row justify-between">
        {days.map((d) => (
          <View key={d.day} className="items-center">
            <View className="h-10 w-10 items-center justify-center">
              {d.today && <TodayPulse />}
              <View
                className={`h-10 w-10 items-center justify-center rounded-full ${
                  d.done ? 'bg-accent' : 'border-2 border-accent bg-base'
                }`}>
                <MaterialCommunityIcons
                  name={d.done ? 'check-bold' : 'silverware-fork-knife'}
                  size={d.done ? 18 : 16}
                  color={d.done ? color.base : color.accent}
                />
              </View>
            </View>
            <Text className={`mt-1.5 font-bodySemi text-[12px] ${d.today ? 'text-accent-glow' : 'text-ink-muted'}`}>
              {d.today ? 'Hari ini' : d.day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
