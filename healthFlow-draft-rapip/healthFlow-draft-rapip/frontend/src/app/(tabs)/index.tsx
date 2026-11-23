import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Pressable, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CalorieRing } from '@/components/calorie-ring';
import { MacroCarousel } from '@/components/macro-carousel';
import { ScrollReveal } from '@/components/scroll-reveal';
import { WaterTracker } from '@/components/water-tracker';
import { WeekStreak } from '@/components/week-streak';
import {
  advice,
  calories,
  heroImage,
  macros,
  move,
  nextMeal,
  user,
  water,
  week,
  type Advice,
} from '@/data/today';
import { color } from '@/theme/tokens';

const HERO_H = 560;
const SCREEN_W = Dimensions.get('window').width;

/* ---------- Hero: foto gym parallax + cincin kalori ---------- */
function Hero({ scrollY }: { scrollY: SharedValue<number> }) {
  const insets = useSafeAreaInsets();
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

  // Foto bergerak setengah kecepatan scroll; ditarik ke bawah = membesar.
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(scrollY.value, [-HERO_H, 0, HERO_H], [-HERO_H / 2, 0, HERO_H * 0.5]) },
      { scale: interpolate(scrollY.value, [-HERO_H, 0], [2, 1], Extrapolation.CLAMP) },
    ],
  }));
  // Isi hero memudar, naik, dan mengecil saat discroll.
  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, HERO_H * 0.55], [1, 0], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(scrollY.value, [0, HERO_H], [0, -HERO_H * 0.25], Extrapolation.CLAMP) },
      { scale: interpolate(scrollY.value, [0, HERO_H * 0.6], [1, 0.86], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <View style={{ height: HERO_H }} className="overflow-hidden">
      <Animated.View style={[{ position: 'absolute', left: 0, right: 0, top: 0, height: HERO_H }, imageStyle]}>
        <Image source={heroImage} style={{ flex: 1 }} contentFit="cover" cachePolicy="memory-disk" priority="high" />
      </Animated.View>
      <LinearGradient
        colors={['rgba(11,19,16,0.55)', 'rgba(11,19,16,0.35)', 'rgba(11,19,16,0.85)', color.base]}
        locations={[0, 0.35, 0.75, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <Animated.View style={[{ flex: 1, paddingTop: insets.top + 16, paddingHorizontal: 16 }, contentStyle]}>
        <View className="flex-row items-center justify-between">
          <Text className="font-bodyMedium text-[15px] capitalize text-ink/80">{today}</Text>
          <View className="flex-row items-center rounded-full bg-black/40 px-3 py-1.5">
            <MaterialCommunityIcons name="fire" size={18} color={color.accent} />
            <Text className="ml-1 font-display text-[18px] text-ink">{user.streakDays}</Text>
          </View>
        </View>

        <Text className="mt-3 font-display text-[52px] uppercase leading-[50px] text-ink">
          Gas terus,{'\n'}
          <Text className="text-accent">{user.name}.</Text>
        </Text>
        <Text className="mt-2 font-body text-[16px] text-ink/80">Target: {user.goal.toLowerCase()}</Text>

        <View className="flex-1 items-center justify-end pb-6">
          <CalorieRing eaten={calories.eaten} target={calories.target} />
        </View>
      </Animated.View>
    </View>
  );
}

/* ---------- Header lengket yang muncul setelah hero lewat ---------- */
function StickyHeader({ scrollY }: { scrollY: SharedValue<number> }) {
  const insets = useSafeAreaInsets();
  const ratio = Math.min(calories.eaten / calories.target, 1);
  const style = useAnimatedStyle(() => {
    const p = interpolate(scrollY.value, [HERO_H - 220, HERO_H - 120], [0, 1], Extrapolation.CLAMP);
    return { opacity: p, transform: [{ translateY: (1 - p) * -16 }] };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', left: 0, right: 0, top: 0 }, style]}>
      <View className="border-b border-field-line" style={{ paddingTop: insets.top, backgroundColor: color.base }}>
      <View className="h-14 flex-row items-center justify-between px-4">
        <Text className="font-display text-[24px] uppercase text-ink">Hari ini</Text>
        <View className="flex-row items-center">
          <Text className="font-displaySemi text-[18px] text-ink">
            {calories.eaten.toLocaleString('id-ID')}
            <Text className="text-ink-muted">/{calories.target.toLocaleString('id-ID')} kkal</Text>
          </Text>
          <MaterialCommunityIcons name="fire" size={18} color={color.accent} style={{ marginLeft: 12 }} />
          <Text className="ml-0.5 font-display text-[18px] text-ink">{user.streakDays}</Text>
        </View>
      </View>
      <View className="h-[3px] bg-white/10">
        <View className="h-[3px] bg-accent" style={{ width: `${ratio * 100}%` }} />
      </View>
      </View>
    </Animated.View>
  );
}

/* ---------- Kartu makan berikutnya dengan foto parallax ---------- */
function NextMeal({ scrollY, top }: { scrollY: SharedValue<number>; top: SharedValue<number> }) {
  const imgStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(scrollY.value - top.value, [-800, 400], [-50, 50], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <View className="overflow-hidden rounded-[28px] bg-field">
      <View style={{ height: 230 }} className="overflow-hidden">
        <Animated.View style={[{ position: 'absolute', left: 0, right: 0, top: -60, bottom: -60 }, imgStyle]}>
          <Image source={nextMeal.image} style={{ flex: 1 }} contentFit="cover" cachePolicy="memory-disk" transition={250} />
        </Animated.View>
        <LinearGradient
          colors={['transparent', 'rgba(20,38,29,0.95)']}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 140 }}
        />
        <View className="absolute left-4 top-4 flex-row items-center rounded-full bg-accent px-3 py-1.5">
          <MaterialCommunityIcons name="timer-outline" size={16} color={color.base} />
          <Text className="ml-1 font-bodySemi text-[13px] text-base">{nextMeal.inMinutes} menit lagi</Text>
        </View>
        <View className="absolute bottom-3 left-4 right-4">
          <Text className="font-displaySemi text-[16px] uppercase tracking-[1px] text-accent-glow">
            {nextMeal.slot} · {nextMeal.time}
          </Text>
          <Text className="font-display text-[28px] leading-[30px] text-ink">{nextMeal.menu}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between px-4 pb-4 pt-3">
        <View className="flex-row gap-5">
          <View>
            <Text className="font-display text-[24px] text-ink">{nextMeal.kcal}</Text>
            <Text className="font-body text-[12px] text-ink-muted">kkal</Text>
          </View>
          <View>
            <Text className="font-display text-[24px] text-ink">{nextMeal.protein} g</Text>
            <Text className="font-body text-[12px] text-ink-muted">protein</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          className="h-12 flex-row items-center rounded-full bg-accent px-5 active:opacity-80">
          <MaterialCommunityIcons name="check-bold" size={18} color={color.base} />
          <Text className="ml-2 font-bodySemi text-[16px] text-base">Sudah makan</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ---------- Saran ---------- */
const KIND = {
  kurangi: { label: 'KURANGI', icon: 'arrow-down-bold', tint: color.over },
  ganti: { label: 'GANTI', icon: 'swap-horizontal-bold', tint: color.accentGlow },
  tambah: { label: 'TAMBAH', icon: 'plus-thick', tint: '#6FD3A0' },
} as const;

function AdviceCard({ item }: { item: Advice }) {
  const k = KIND[item.kind];
  return (
    <View className="mb-3 flex-row overflow-hidden rounded-[24px] border border-field-line bg-field">
      <Image source={item.image} style={{ width: 104 }} contentFit="cover" cachePolicy="memory-disk" />
      <View className="flex-1 p-4">
        <View className="mb-1 flex-row items-center">
          <MaterialCommunityIcons name={k.icon} size={14} color={k.tint} />
          <Text className="ml-1 font-displaySemi text-[14px] tracking-[1px]" style={{ color: k.tint }}>
            {k.label}
          </Text>
        </View>
        <Text className="font-bodySemi text-[17px] leading-[22px] text-ink">{item.title}</Text>
        <Text className="mt-1 font-body text-[14px] leading-[20px] text-ink-muted">{item.why}</Text>
      </View>
    </View>
  );
}

function Section({ title, action }: { title: string; action?: string }) {
  return (
    <View className="mb-3 mt-10 flex-row items-end justify-between px-4">
      <Text className="font-display text-[30px] uppercase leading-[32px] text-ink">{title}</Text>
      {action && <Text className="font-bodySemi text-[14px] text-accent-glow">{action}</Text>}
    </View>
  );
}

/* ---------- FAB yang menyusut saat scroll ke bawah ---------- */
function LogFab({ expanded }: { expanded: SharedValue<number> }) {
  const labelStyle = useAnimatedStyle(() => ({
    width: withTiming(expanded.value ? 104 : 0, { duration: 220 }),
    opacity: withTiming(expanded.value ? 1 : 0, { duration: 160 }),
  }));
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Catat makan"
      className="absolute bottom-4 right-4 h-14 flex-row items-center rounded-2xl bg-accent px-4 active:opacity-85"
      style={{ elevation: 6, shadowColor: color.accent, shadowOpacity: 0.45, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } }}>
      <MaterialCommunityIcons name="plus-thick" size={24} color={color.base} />
      <Animated.View style={[{ overflow: 'hidden' }, labelStyle]}>
        <Text numberOfLines={1} className="ml-2 font-bodySemi text-[16px] text-base">
          Catat makan
        </Text>
      </Animated.View>
    </Pressable>
  );
}

/* ---------- Layar ---------- */
export default function Home() {
  const scrollY = useSharedValue(0);
  const lastY = useSharedValue(0);
  const fabExpanded = useSharedValue(1);

  const onScroll = useAnimatedScrollHandler((e) => {
    const y = e.contentOffset.y;
    const dy = y - lastY.value;
    if (Math.abs(dy) > 6) fabExpanded.value = dy < 0 || y < 40 ? 1 : 0;
    lastY.value = y;
    scrollY.value = y;
  });

  return (
    <View className="flex-1 bg-base">
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <Hero scrollY={scrollY} />

        <Section title="Makro hari ini" action="Geser" />
        <MacroCarousel macros={macros} />

        <Section title="Makan berikutnya" />
        <ScrollReveal scrollY={scrollY} className="px-4">
          {(top) => <NextMeal scrollY={scrollY} top={top} />}
        </ScrollReveal>

        <Section title="Konsistensi" />
        <ScrollReveal scrollY={scrollY} className="px-4">
          <WeekStreak days={week} streak={user.streakDays} />
        </ScrollReveal>
        <ScrollReveal scrollY={scrollY} className="mt-3 px-4">
          <WaterTracker initial={water.glasses} target={water.target} />
        </ScrollReveal>

        <Section title="Saran buatmu" action="Lihat semua" />
        {advice.map((a) => (
          <ScrollReveal key={a.id} scrollY={scrollY} className="px-4">
            <AdviceCard item={a} />
          </ScrollReveal>
        ))}

        <Section title="Gerak hari ini" />
        <ScrollReveal scrollY={scrollY} className="px-4">
            <View className="overflow-hidden rounded-[28px]" style={{ height: SCREEN_W * 0.85 }}>
              <Image source={move.image} style={{ flex: 1 }} contentFit="cover" cachePolicy="memory-disk" />
              <LinearGradient
                colors={['transparent', 'rgba(7,12,10,0.75)', 'rgba(7,12,10,0.98)']}
                locations={[0, 0.45, 1]}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '25%' }}
              />
              <View className="absolute bottom-0 left-0 right-0 p-5">
                <Text className="font-display text-[72px] leading-[68px] text-accent">{move.minutes}</Text>
                <Text className="font-display text-[28px] uppercase leading-[28px] text-ink">menit</Text>
                <Text className="mt-2 font-bodySemi text-[17px] text-ink">{move.title}</Text>
                <Text className="mt-1 font-body text-[14px] leading-[20px] text-ink-muted">{move.detail}</Text>
              </View>
            </View>
        </ScrollReveal>

        <Text className="mx-4 mb-28 mt-8 font-body text-[13px] leading-[19px] text-ink-muted">
          healthFlow memberi panduan umum, bukan pengganti dokter atau ahli gizi. Konsultasikan bila kamu punya
          kondisi medis.
        </Text>
      </Animated.ScrollView>

      <StickyHeader scrollY={scrollY} />
      <LogFab expanded={fabExpanded} />
    </View>
  );
}
