import React, { useEffect } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useAppState } from '@/lib/app-state-context';
import { formatCurrency, calculateDaysAbstinent, calculateMoneySaved } from '@/lib/calculations';
import * as Haptics from 'expo-haptics';

export default function RewardsScreen() {
  const { state } = useAppState();

  if (!state.userProfile) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-lg text-muted">Loading...</Text>
      </ScreenContainer>
    );
  }

  const userProfile = state.userProfile;
  if (!userProfile) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-lg text-muted">Loading...</Text>
      </ScreenContainer>
    );
  }

  const daysAbstinent = calculateDaysAbstinent(
    userProfile.startDate,
    state.streakData.lastConsumptionDate
  );
  const moneySaved = calculateMoneySaved(
    userProfile.habitProfile,
    daysAbstinent,
    state.streakData.slipUps.length
  );
  const targetPrice = userProfile.rewardVault.targetPrice;
  const progressPercent = Math.min((moneySaved / targetPrice) * 100, 100);
  const amountRemaining = Math.max(0, targetPrice - moneySaved);

  const handlePurchase = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    alert(
      `🎉 Congratulations!\n\nYou\'ve saved enough for ${userProfile.rewardVault.itemName}!\n\nIn a real app, this would complete your purchase. You\'ve earned this victory!`
    );
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">
              Your Reward Vault
            </Text>
            <Text className="text-base text-muted mt-2">
              Every dollar saved brings you closer to your goal
            </Text>
          </View>

          {/* Reward Card */}
          <View className="bg-surface rounded-lg p-6 border border-border gap-4">
            {/* Reward Icon */}
            <View className="items-center">
              <View className="w-20 h-20 rounded-lg bg-primary/10 items-center justify-center mb-4">
                <Text className="text-4xl">🎁</Text>
              </View>
              <Text className="text-2xl font-bold text-foreground text-center">
                {userProfile.rewardVault.itemName}
              </Text>
            </View>

            {/* Progress Section */}
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-medium text-muted">Progress</Text>
                <Text className="text-sm font-bold text-primary">
                  {Math.round(progressPercent)}%
                </Text>
              </View>

              {/* Progress Bar */}
              <View className="h-4 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </View>

              {/* Amount Display */}
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-foreground">
                  <Text className="font-bold">{formatCurrency(moneySaved)}</Text>
                  {' '}saved
                </Text>
                <Text className="text-sm text-muted">
                  of {formatCurrency(targetPrice)}
                </Text>
              </View>
            </View>

            {/* Remaining Amount */}
            {amountRemaining > 0 ? (
              <View className="bg-warning/10 rounded-lg p-3 border border-warning/20">
                <Text className="text-sm text-warning text-center font-semibold">
                  {formatCurrency(amountRemaining)} to go!
                </Text>
                <Text className="text-xs text-warning/80 text-center mt-1">
                  Keep going, you\'re almost there
                </Text>
              </View>
            ) : (
              <View className="bg-success/10 rounded-lg p-3 border border-success/20">
                <Text className="text-sm text-success text-center font-semibold">
                  🎉 You\'ve reached your goal!
                </Text>
              </View>
            )}
          </View>

          {/* Milestones */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Milestones
            </Text>
            <MilestoneItem
              percent={25}
              label="25% of Goal"
              amount={formatCurrency(targetPrice * 0.25)}
              achieved={progressPercent >= 25}
            />
            <MilestoneItem
              percent={50}
              label="50% of Goal"
              amount={formatCurrency(targetPrice * 0.5)}
              achieved={progressPercent >= 50}
            />
            <MilestoneItem
              percent={75}
              label="75% of Goal"
              amount={formatCurrency(targetPrice * 0.75)}
              achieved={progressPercent >= 75}
            />
            <MilestoneItem
              percent={100}
              label="Complete Goal"
              amount={formatCurrency(targetPrice)}
              achieved={progressPercent >= 100}
            />
          </View>

          {/* Purchase Button */}
          {amountRemaining <= 0 && (
            <Pressable
              onPress={handlePurchase}
              style={({ pressed }) => [
                {
                  backgroundColor: '#22C55E',
                  paddingVertical: 14,
                  borderRadius: 8,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-center text-white font-bold text-base">
                Buy Now 🛍️
              </Text>
            </Pressable>
          )}

          {/* Info Section */}
          <View className="bg-primary/10 rounded-lg p-4 gap-2 border border-primary/20">
            <Text className="text-sm font-semibold text-primary">
              💡 Your North Star
            </Text>
            <Text className="text-xs text-foreground">
              You chose <Text className="font-bold capitalize">{userProfile.northStar}</Text> as your motivation. Every dollar saved is a step toward your goal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function MilestoneItem({
  percent,
  label,
  amount,
  achieved,
}: {
  percent: number;
  label: string;
  amount: string;
  achieved: boolean;
}) {
  return (
    <View
      className={`rounded-lg p-3 border flex-row items-center justify-between ${
        achieved
          ? 'bg-success/10 border-success/20'
          : 'bg-surface border-border'
      }`}
    >
      <View className="flex-1">
        <Text
          className={`text-sm font-semibold ${
            achieved ? 'text-success' : 'text-foreground'
          }`}
        >
          {label}
        </Text>
        <Text className="text-xs text-muted mt-1">{amount}</Text>
      </View>
      <Text className="text-xl">
        {achieved ? '✅' : '⭕'}
      </Text>
    </View>
  );
}
