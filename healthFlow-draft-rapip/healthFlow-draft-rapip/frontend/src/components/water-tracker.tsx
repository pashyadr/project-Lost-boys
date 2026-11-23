import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { memo, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';


const Glass = memo(function Glass({ filled, onPress, index }: { filled: boolean; onPress: () => void; index: number }) {
  const fill = useAnimatedStyle(() => ({
    transform: [{ scaleY: withSpring(filled ? 1 : 0, { damping: 14, stiffness: 160 }) }],
  }));
  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={`Gelas ${index + 1}${filled ? ', sudah diminum' : ''}`}
      className="h-12 w-8 overflow-hidden rounded-b-[10px] rounded-t-[4px] border-2 border-field-line active:opacity-70">
      <Animated.View
        style={[
          { position: 'absolute', left: 0, right: 0, bottom: 0, top: 6, backgroundColor: '#4FB3FF', transformOrigin: 'bottom' },
          fill,
        ]}
      />
    </Pressable>
  );
});

export function WaterTracker({ initial, target }: { initial: number; target: number }) {
  const [count, setCount] = useState(initial);
  const tap = (i: number) => {
    if (Platform.OS !== 'web') Haptics.selectionAsync();
    setCount(i + 1 === count ? i : i + 1);
  };

  return (
    <View className="rounded-[24px] border border-field-line bg-field p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="water" size={24} color="#4FB3FF" />
          <Text className="ml-1.5 font-bodySemi text-[17px] text-ink">Air minum</Text>
        </View>
        <Text className="font-display text-[24px] text-ink">
          {count}
          <Text className="font-displaySemi text-[16px] text-ink-muted">/{target} gelas</Text>
        </Text>
      </View>
      <View className="flex-row justify-between">
        {Array.from({ length: target }, (_, i) => (
          <Glass key={i} index={i} filled={i < count} onPress={() => tap(i)} />
        ))}
      </View>
      <Text className="mt-3 font-body text-[13px] text-ink-muted">Ketuk gelas untuk mencatat.</Text>
    </View>
  );
}

