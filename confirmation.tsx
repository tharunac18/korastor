import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useOnboarding } from '@/lib/onboarding-context';
import { useAppState } from '@/lib/app-state-context';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { state: onboardingState, reset: resetOnboarding } = useOnboarding();
  const { dispatch } = useAppState();

  const handleBegin = async () => {
    if (!onboardingState.habitProfile || !onboardingState.northStar || !onboardingState.rewardVault) {
      alert('Missing information. Please go back and complete all steps.');
      return;
    }

    // Create user profile and save to app state
    const userProfile = {
      habitProfile: onboardingState.habitProfile,
      northStar: onboardingState.northStar,
      rewardVault: onboardingState.rewardVault,
      startDate: Date.now(),
    };

    dispatch({ type: 'SET_USER_PROFILE', payload: userProfile });

    // Initialize streak data
    dispatch({
      type: 'SET_STREAK_DATA',
      payload: {
        lastConsumptionDate: null,
        currentStreak: 0,
        totalDaysAbstinent: 0,
        slipUps: [],
      },
    });

    resetOnboarding();
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']} className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Your Contract</Text>
            <Text className="text-base text-muted mt-2">
              Review your journey before you begin.
            </Text>
          </View>

          {/* Summary Cards */}
          <View className="gap-3">
            {/* Habit Profile */}
            <SummaryCard
              icon="🚭"
              title="Your Habit"
              items={[
                `Types: ${onboardingState.habitProfile?.types.join(', ') || 'N/A'}`,
                `${onboardingState.habitProfile?.unitsPerDay || 0} units/day`,
                `$${onboardingState.habitProfile?.costPerUnit || 0}/unit`,
                `Strength: ${onboardingState.habitProfile?.nicotineStrength || 'N/A'}`,
              ]}
            />

            {/* North Star */}
            <SummaryCard
              icon={
                onboardingState.northStar === 'wealth'
                  ? '💰'
                  : onboardingState.northStar === 'vitality'
                    ? '❤️'
                    : '👨‍👩‍👧‍👦'
              }
              title="Your North Star"
              items={[
                onboardingState.northStar
                  ? onboardingState.northStar.charAt(0).toUpperCase() +
                    onboardingState.northStar.slice(1)
                  : 'N/A',
              ]}
            />

            {/* Reward Vault */}
            <SummaryCard
              icon="🎁"
              title="Your Reward"
              items={[
                onboardingState.rewardVault?.itemName || 'N/A',
                `$${onboardingState.rewardVault?.targetPrice || 0}`,
              ]}
            />
          </View>

          {/* Commitment Message */}
          <View className="bg-primary/10 rounded-lg p-4 gap-2 border border-primary/20">
            <Text className="text-sm font-semibold text-primary">
              🤝 Your Commitment
            </Text>
            <Text className="text-sm text-foreground leading-relaxed">
              I commit to my journey. I understand that cravings will come, but I have the tools to overcome them. Every moment of resistance is a victory.
            </Text>
          </View>

          {/* Navigation Buttons */}
          <View className="gap-3 mt-6">
            <Pressable
              onPress={handleBegin}
              style={({ pressed }) => [
                {
                  backgroundColor: '#0a7ea4',
                  paddingVertical: 14,
                  borderRadius: 8,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-center text-white font-bold text-base">
                Begin My Journey
              </Text>
            </Pressable>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                {
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text className="text-center text-foreground font-medium">Back</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function SummaryCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <View className="bg-surface rounded-lg p-4 border border-border gap-2">
      <View className="flex-row items-center gap-2">
        <Text className="text-2xl">{icon}</Text>
        <Text className="text-base font-semibold text-foreground">{title}</Text>
      </View>
      <View className="gap-1 pl-8">
        {items.map((item, idx) => (
          <Text key={idx} className="text-sm text-muted">
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}
