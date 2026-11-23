import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color } from '@/theme/tokens';

type Props = {
  title: string;
  body: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

/** Layar sementara untuk tab yang belum dibangun. */
export function PlaceholderScreen({ title, body, icon }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-base px-4" style={{ paddingTop: insets.top + 16 }}>
      <Text className="font-display text-[44px] uppercase text-ink">{title}</Text>
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-field">
          <MaterialCommunityIcons name={icon} size={44} color={color.accent} />
        </View>
        <Text className="mt-5 text-center font-body text-[16px] leading-[23px] text-ink-muted">{body}</Text>
      </View>
    </View>
  );
}
