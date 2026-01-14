import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAppState } from '@/lib/app-state-context';
import { formatCurrency, formatStreak, calculateDaysAbstinent, calculateMoneySaved, calculateLifeRegained, formatTimeRegained } from '@/lib/calculations';
import { useCraving } from '@/lib/craving-context';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const { state, isLoading, dispatch } = useAppState();
  const { startCravingDampener } = useCraving();
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const pressStartTime = useRef<number | null>(null);

  // Redirect to onboarding if no user profile
  useEffect(() => {
    if (!isLoading && !state.userProfile) {
      router.replace('/onboarding/welcome');
    }
  }, [isLoading, state.userProfile, router]);

  // Animate pulse button
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.reset();
  }, [pulseAnim]);

  if (isLoading || !state.userProfile) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-lg text-muted">Loading...</Text>
      </ScreenContainer>
    );
  }

  // Calculate metrics
  const daysAbstinent = calculateDaysAbstinent(
    state.userProfile.startDate,
    state.streakData.lastConsumptionDate
  );
  const moneySaved = calculateMoneySaved(
    state.userProfile.habitProfile,
    daysAbstinent,
    state.streakData.slipUps.length
  );
  const lifeRegained = calculateLifeRegained(
    state.userProfile.habitProfile,
    daysAbstinent
  );

  // Update metrics in state if changed
  useEffect(() => {
    if (state.moneySaved !== moneySaved) {
      dispatch({ type: 'UPDATE_MONEY_SAVED', payload: moneySaved });
    }
    if (state.lifeRegainedMs !== lifeRegained) {
      dispatch({ type: 'UPDATE_LIFE_REGAINED', payload: lifeRegained });
    }
  }, [moneySaved, lifeRegained]);

  const streakMs = state.streakData.currentStreak || 0;
  const isOnStreak = state.streakData.lastConsumptionDate === null;

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-8 pb-32">
          {/* Vessel Icon */}
          <View className="items-center gap-4">
            <View
              className={`w-32 h-32 rounded-full items-center justify-center border-4 ${
                isOnStreak
                  ? 'border-primary bg-primary/10'
                  : 'border-warning bg-warning/10'
              }`}
            >
              <Text className="text-5xl">
                {isOnStreak ? '✨' : '💨'}
              </Text>
            </View>
            <Text className="text-lg font-semibold text-foreground">
              {isOnStreak ? 'You\'re Strong' : 'Keep Going'}
            </Text>
          </View>

          {/* Metrics Cards */}
          <View className="gap-3">
            <MetricCard
              label="Money Saved"
              value={formatCurrency(moneySaved)}
              icon="💰"
              color="bg-primary"
            />
            <MetricCard
              label="Life Regained"
              value={formatTimeRegained(lifeRegained)}
              icon="⏰"
              color="bg-success"
            />
            <MetricCard
              label="Current Streak"
              value={formatStreak(streakMs)}
              icon="🔥"
              color="bg-warning"
            />
          </View>

          {/* Reward Progress */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-foreground">
                {state.userProfile.rewardVault.itemName}
              </Text>
              <Text className="text-sm text-muted">
                {formatCurrency(moneySaved)} / {formatCurrency(state.userProfile.rewardVault.targetPrice)}
              </Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View
                className="h-full bg-primary"
                style={{
                  width: `${Math.min(
                    (moneySaved / state.userProfile.rewardVault.targetPrice) * 100,
                    100
                  )}%`,
                }}
              />
            </View>
            <Text className="text-xs text-muted">
              {Math.round(
                (moneySaved / state.userProfile.rewardVault.targetPrice) * 100
              )}% of your goal
            </Text>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-2">
            <StatBox
              label="Days"
              value={daysAbstinent.toString()}
            />
            <StatBox
              label="Slip-ups"
              value={state.streakData.slipUps.length.toString()}
            />
            <StatBox
              label="Køra-Points"
              value={state.koraPoints.total.toString()}
            />
          </View>

          {/* Navigation to Other Tabs */}
          <View className="gap-2">
            <Text className="text-sm text-muted font-medium px-1">
              Explore
            </Text>
            <View className="flex-row gap-2">
              <NavButton
                label="Health"
                icon="❤️"
                onPress={() => {
                  // Navigate to health tab (will implement)
                }}
              />
              <NavButton
                label="Rewards"
                icon="🎁"
                onPress={() => {
                  // Navigate to rewards tab (will implement)
                }}
              />
              <NavButton
                label="Profile"
                icon="👤"
                onPress={() => {
                  // Navigate to profile tab (will implement)
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Center Pulse Button - Floating Action */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 100,
          alignSelf: 'center',
          transform: [{ scale: pulseAnim }],
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#0a7ea4',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            },
          ]}
          onPressIn={() => {
            pressStartTime.current = Date.now();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onPressOut={() => {
            if (!pressStartTime.current) return;
            const pressDuration = Date.now() - pressStartTime.current;
            pressStartTime.current = null;

            if (pressDuration >= 3000) {
              startCravingDampener();
              router.push('/craving-dampener');
            } else if (pressDuration >= 200) {
              router.push('/slip-up-protocol');
            }
          }}
        >
          <Text className="text-3xl">💙</Text>
        </Pressable>
      </Animated.View>
    </ScreenContainer>
  );
}

function MetricCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <View className={`${color} rounded-lg p-4 gap-1`}>
      <View className="flex-row items-center gap-2">
        <Text className="text-2xl">{icon}</Text>
        <Text className="text-sm font-medium text-white/80">{label}</Text>
      </View>
      <Text className="text-2xl font-bold text-white">{value}</Text>
    </View>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 bg-surface rounded-lg p-3 items-center gap-1 border border-border">
      <Text className="text-2xl font-bold text-foreground">{value}</Text>
      <Text className="text-xs text-muted">{label}</Text>
    </View>
  );
}

function NavButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flex: 1,
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: 'center',
          gap: 4,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text className="text-2xl">{icon}</Text>
      <Text className="text-xs font-medium text-foreground">{label}</Text>
    </Pressable>
  );
}
