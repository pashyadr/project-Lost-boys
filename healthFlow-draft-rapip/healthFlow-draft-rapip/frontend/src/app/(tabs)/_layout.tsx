import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

import { color } from '@/theme/tokens';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

/** Ikon tab gaya Material 3: pil indikator di belakang ikon aktif. */
function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return (
    <View className={`h-8 w-14 items-center justify-center rounded-full ${focused ? 'bg-accent/20' : ''}`}>
      <MaterialCommunityIcons name={name} size={24} color={focused ? color.accent : color.inkMuted} />
    </View>
  );
}

const tabs: { name: string; title: string; icon: IconName; iconActive: IconName }[] = [
  { name: 'index', title: 'Beranda', icon: 'home-outline', iconActive: 'home' },
  { name: 'catat', title: 'Catat', icon: 'notebook-outline', iconActive: 'notebook' },
  { name: 'rencana', title: 'Rencana', icon: 'calendar-blank-outline', iconActive: 'calendar-check' },
  { name: 'progres', title: 'Progres', icon: 'chart-line', iconActive: 'chart-line' },
  { name: 'profil', title: 'Profil', icon: 'account-outline', iconActive: 'account' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.ink,
        tabBarInactiveTintColor: color.inkMuted,
        tabBarStyle: {
          backgroundColor: color.baseDeep,
          borderTopWidth: 1,
          borderTopColor: color.fieldLine,
          height: 80,
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontFamily: 'Barlow_600SemiBold', fontSize: 12, marginTop: 4 },
      }}>
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ focused }) => <TabIcon name={focused ? t.iconActive : t.icon} focused={focused} />,
          }}
        />
      ))}
    </Tabs>
  );
}
