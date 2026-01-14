import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useOnboarding } from '@/lib/onboarding-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const { nextStep } = useOnboarding();

  const handleStart = () => {
    nextStep();
    router.push('./habit-profile');
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']} className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Logo / Brand Section */}
          <View className="items-center gap-4">
            <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center">
              <Text className="text-5xl font-bold text-primary">K</Text>
            </View>
            <Text className="text-4xl font-bold text-foreground text-center">Kørastor</Text>
            <Text className="text-lg text-muted text-center font-medium">
              The Nordic Anchor
            </Text>
          </View>

          {/* Tagline */}
          <View className="gap-3">
            <Text className="text-2xl font-bold text-foreground text-center">
              Your Contract with Yourself
            </Text>
            <Text className="text-base text-muted text-center leading-relaxed">
              A science-backed journey to nicotine freedom. Track your progress, celebrate your wins, and reclaim your health.
            </Text>
          </View>

          {/* Key Benefits */}
          <View className="gap-4">
            <BenefitCard
              icon="💰"
              title="Money Saved"
              description="Watch your savings grow in real-time"
            />
            <BenefitCard
              icon="❤️"
              title="Health Restored"
              description="See your body heal with clinical precision"
            />
            <BenefitCard
              icon="🎯"
              title="Craving Support"
              description="90-second science-backed interventions"
            />
          </View>

          {/* CTA Button */}
          <View className="gap-3 mt-4">
            <Pressable
              onPress={handleStart}
              style={({ pressed }) => [
                {
                  backgroundColor: '#0a7ea4',
                  paddingVertical: 16,
                  borderRadius: 12,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-center text-white font-bold text-lg">
                Begin Your Journey
              </Text>
            </Pressable>
            <Text className="text-xs text-muted text-center">
              Takes about 5 minutes
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View className="bg-surface rounded-xl p-4 flex-row gap-3 border border-border">
      <Text className="text-3xl">{icon}</Text>
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{title}</Text>
        <Text className="text-sm text-muted mt-1">{description}</Text>
      </View>
    </View>
  );
}
