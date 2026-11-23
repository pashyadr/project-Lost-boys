import { memo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

import type { Macro } from '@/data/today';
import { color } from '@/theme/tokens';

const CARD_W = Math.min(Dimensions.get('window').width * 0.42, 190);
const GAP = 12;
const STEP = CARD_W + GAP;

const MacroCard = memo(function MacroCard({ macro, index, scrollX }: { macro: Macro; index: number; scrollX: SharedValue<number> }) {
  const over = macro.isLimit && macro.eaten > macro.target;
  const ratio = Math.min(macro.eaten / macro.target, 1);
  const tint = over ? color.over : color.accent;

  // Kartu yang menjauh dari tepi kiri sedikit mengecil dan meredup.
  const style = useAnimatedStyle(() => {
    const d = (scrollX.value - index * STEP) / STEP;
    return {
      opacity: interpolate(d, [-2, 0, 1], [0.55, 1, 0.35], Extrapolation.CLAMP),
      transform: [
        { scale: interpolate(d, [-2, 0, 1], [0.92, 1, 0.9], Extrapolation.CLAMP) },
        { translateY: interpolate(d, [-2, 0], [10, 0], Extrapolation.CLAMP) },
      ],
    };
  });

  return (
    <Animated.View
      style={[{ width: CARD_W, marginRight: GAP }, style]}
      accessible
      accessibilityLabel={`${macro.label} ${macro.eaten} dari ${macro.target} ${macro.unit}. ${macro.hint}`}>
      <View
        className={`h-[188px] justify-between rounded-[24px] border p-4 ${
          over ? 'border-over/50 bg-over-dim' : 'border-field-line bg-field'
        }`}>
        <View className="flex-row items-center justify-between">
          <Text className="font-bodySemi text-[15px] text-ink">{macro.label}</Text>
          {over && (
            <View className="rounded-full bg-over px-2 py-0.5">
              <Text className="font-bodySemi text-[11px] text-base">LEWAT</Text>
            </View>
          )}
        </View>

        <View>
          <Text className="font-display text-[44px] leading-[46px] text-ink">
            {macro.eaten}
            <Text className="font-displaySemi text-[20px] text-ink-muted">
              /{macro.target}
              {macro.unit}
            </Text>
          </Text>
          <View className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <View className="h-2 rounded-full" style={{ width: `${ratio * 100}%`, backgroundColor: tint }} />
          </View>
          <Text
            numberOfLines={2}
            className={`mt-2 font-body text-[13px] leading-[17px] ${over ? 'text-over' : 'text-ink-muted'}`}>
            {macro.hint}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
});

export function MacroCarousel({ macros }: { macros: Macro[] }) {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      onScroll={onScroll}
      scrollEventThrottle={16}
      snapToInterval={STEP}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 16 + CARD_W }}>
      {macros.map((m, i) => (
        <MacroCard key={m.id} macro={m} index={i} scrollX={scrollX} />
      ))}
    </Animated.ScrollView>
  );
}
