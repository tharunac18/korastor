import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useAppState } from '@/lib/app-state-context';
import { calculateDaysAbstinent, calculateHealthProgress, getHealthSystemStatus } from '@/lib/calculations';

export default function HealthScreen() {
  const { state, dispatch } = useAppState();

  // Calculate health progress
  useEffect(() => {
    if (!state.userProfile) return;

    const daysAbstinent = calculateDaysAbstinent(
      state.userProfile.startDate,
      state.streakData.lastConsumptionDate
    );
    const timeSinceQuitMs = daysAbstinent * 24 * 60 * 60 * 1000;

    const updatedSystems = state.healthSystems.map((system) => {
      const progress = calculateHealthProgress(system, timeSinceQuitMs);
      const status = getHealthSystemStatus(system.name, progress);
      return {
        ...system,
        progressPercent: progress,
        currentStatus: status,
      };
    });

    dispatch({ type: 'UPDATE_HEALTH_SYSTEMS', payload: updatedSystems });
  }, [state.userProfile, state.streakData.lastConsumptionDate]);

  if (!state.userProfile) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-lg text-muted">Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">
              Your Health Restoration
            </Text>
            <Text className="text-base text-muted mt-2">
              Watch your body heal with clinical precision
            </Text>
          </View>

          {/* Health Systems */}
          <View className="gap-4">
            {state.healthSystems.map((system) => (
              <HealthSystemCard key={system.name} system={system} />
            ))}
          </View>

          {/* Info Section */}
          <View className="bg-primary/10 rounded-lg p-4 gap-3 border border-primary/20">
            <Text className="text-sm font-semibold text-primary">
              💡 How This Works
            </Text>
            <Text className="text-xs text-foreground leading-relaxed">
              These timelines are based on clinical research. Your body is actively healing right now. Every day without nicotine brings you closer to full restoration.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function HealthSystemCard({
  system,
}: {
  system: {
    name: string;
    timeToRestoration: string;
    progressPercent: number;
    currentStatus: string;
  };
}) {
  const isRestored = system.progressPercent >= 100;

  return (
    <View className="bg-surface rounded-lg p-4 border border-border gap-3">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">
            {system.name}
          </Text>
          <Text className="text-xs text-muted mt-1">
            {system.timeToRestoration}
          </Text>
        </View>
        <Text
          className={`text-xs font-bold px-2 py-1 rounded ${
            isRestored
              ? 'bg-success/20 text-success'
              : 'bg-primary/20 text-primary'
          }`}
        >
          {Math.round(system.progressPercent)}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="h-3 bg-border rounded-full overflow-hidden">
        <View
          className={`h-full ${
            isRestored ? 'bg-success' : 'bg-primary'
          }`}
          style={{
            width: `${Math.min(system.progressPercent, 100)}%`,
          }}
        />
      </View>

      {/* Status */}
      <Text className="text-xs text-muted">
        {isRestored ? '✅ ' : '🔄 '}
        {system.currentStatus}
      </Text>
    </View>
  );
}
