import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAppState } from '@/lib/app-state-context';
import { formatCurrency, calculateDaysAbstinent, calculateMoneySaved, calculateLifeRegained, formatTimeRegained } from '@/lib/calculations';

export default function ProfileScreen() {
  const router = useRouter();
  const { state, dispatch } = useAppState();

  if (!state.userProfile) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-lg text-muted">Loading...</Text>
      </ScreenContainer>
    );
  }

  const userProfile = state.userProfile;
  const daysAbstinent = calculateDaysAbstinent(
    userProfile.startDate,
    state.streakData.lastConsumptionDate
  );
  const moneySaved = calculateMoneySaved(
    userProfile.habitProfile,
    daysAbstinent,
    state.streakData.slipUps.length
  );
  const lifeRegained = calculateLifeRegained(
    userProfile.habitProfile,
    daysAbstinent
  );

  const handleResetJourney = () => {
    const confirmed = confirm(
      'Are you sure? This will reset your progress and return you to onboarding.'
    );
    if (confirmed) {
      dispatch({ type: 'SET_USER_PROFILE', payload: null as any });
      router.replace('/onboarding/welcome');
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">
              Your Profile
            </Text>
            <Text className="text-base text-muted mt-2">
              Your journey, your stats, your victory
            </Text>
          </View>

          {/* Stats Overview */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Your Stats
            </Text>
            <StatCard
              icon="📅"
              label="Days Abstinent"
              value={daysAbstinent.toString()}
            />
            <StatCard
              icon="💰"
              label="Money Saved"
              value={formatCurrency(moneySaved)}
            />
            <StatCard
              icon="⏰"
              label="Life Regained"
              value={formatTimeRegained(lifeRegained)}
            />
            <StatCard
              icon="😔"
              label="Slip-ups Logged"
              value={state.streakData.slipUps.length.toString()}
            />
            <StatCard
              icon="🏆"
              label="Køra-Points"
              value={state.koraPoints.total.toString()}
            />
          </View>

          {/* Habit Profile */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Your Habit Profile
            </Text>
            <InfoCard
              label="Type(s)"
              value={userProfile.habitProfile.types.join(', ')}
            />
            <InfoCard
              label="Units Per Day"
              value={userProfile.habitProfile.unitsPerDay.toString()}
            />
            <InfoCard
              label="Cost Per Unit"
              value={`$${userProfile.habitProfile.costPerUnit}`}
            />
            <InfoCard
              label="Nicotine Strength"
              value={userProfile.habitProfile.nicotineStrength}
            />
          </View>

          {/* Motivations */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Your Motivations
            </Text>
            <InfoCard
              label="North Star"
              value={userProfile.northStar}
            />
            <InfoCard
              label="Reward Goal"
              value={userProfile.rewardVault.itemName}
            />
            <InfoCard
              label="Target Price"
              value={formatCurrency(userProfile.rewardVault.targetPrice)}
            />
          </View>

          {/* Milestones Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Milestones
            </Text>
            <MilestoneCard
              icon="🥉"
              title="Bronze Shield"
              description="3 Days Abstinent"
              achieved={daysAbstinent >= 3}
            />
            <MilestoneCard
              icon="🥈"
              title="Silver Shield"
              description="3 Weeks Abstinent"
              achieved={daysAbstinent >= 21}
            />
            <MilestoneCard
              icon="🥇"
              title="Gold Shield"
              description="3 Months Abstinent"
              achieved={daysAbstinent >= 90}
            />
          </View>

          {/* Actions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Actions
            </Text>
            <Pressable
              onPress={handleResetJourney}
              style={({ pressed }) => [
                {
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: '#EF4444',
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text className="text-center text-error font-medium">
                Reset Journey
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="bg-primary/10 rounded-lg p-4 gap-2 border border-primary/20">
            <Text className="text-sm font-semibold text-primary">
              💪 You\'re Doing Amazing
            </Text>
            <Text className="text-xs text-foreground leading-relaxed">
              Every day without nicotine is a victory. You\'re not just quitting—you\'re reclaiming your health, your time, and your freedom. Keep going!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
      <View className="flex-row items-center gap-3 flex-1">
        <Text className="text-2xl">{icon}</Text>
        <Text className="text-sm text-muted">{label}</Text>
      </View>
      <Text className="text-lg font-bold text-foreground">{value}</Text>
    </View>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="text-sm font-semibold text-foreground capitalize">
        {value}
      </Text>
    </View>
  );
}

function MilestoneCard({
  icon,
  title,
  description,
  achieved,
}: {
  icon: string;
  title: string;
  description: string;
  achieved: boolean;
}) {
  return (
    <View
      className={`rounded-lg p-4 border flex-row items-center gap-3 ${
        achieved
          ? 'bg-success/10 border-success/20'
          : 'bg-surface border-border opacity-50'
      }`}
    >
      <Text className="text-3xl">{icon}</Text>
      <View className="flex-1">
        <Text className={`text-sm font-semibold ${
          achieved ? 'text-success' : 'text-muted'
        }`}>
          {title}
        </Text>
        <Text className="text-xs text-muted mt-1">{description}</Text>
      </View>
      <Text className="text-lg">
        {achieved ? '✅' : '⭕'}
      </Text>
    </View>
  );
}
