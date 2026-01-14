import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useOnboarding } from '@/lib/onboarding-context';
import { NorthStar } from '@/lib/types';

interface MotivationOption {
  label: string;
  value: NorthStar;
  icon: string;
  description: string;
  details: string[];
}

export default function MotivationScreen() {
  const router = useRouter();
  const { setNorthStar, nextStep } = useOnboarding();

  const [selectedStar, setSelectedStar] = useState<NorthStar | null>(null);

  const motivationOptions: MotivationOption[] = [
    {
      label: 'Wealth',
      value: 'wealth',
      icon: '💰',
      description: 'Watch your money grow',
      details: [
        'Track daily savings',
        'Fund your dreams',
        'Financial freedom',
      ],
    },
    {
      label: 'Vitality',
      value: 'vitality',
      icon: '❤️',
      description: 'Reclaim your health',
      details: [
        'Better breathing',
        'Restored taste & smell',
        'Stronger heart',
      ],
    },
    {
      label: 'Legacy',
      value: 'legacy',
      icon: '👨‍👩‍👧‍👦',
      description: 'Be there for those you love',
      details: [
        'More time with family',
        'Set an example',
        'Healthier future',
      ],
    },
  ];

  const handleContinue = () => {
    if (!selectedStar) {
      alert('Please select your North Star');
      return;
    }

    setNorthStar(selectedStar);
    nextStep();
    router.push('./reward-vault');
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']} className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Your North Star</Text>
            <Text className="text-base text-muted mt-2">
              What motivates you most? This will guide your journey.
            </Text>
          </View>

          {/* Motivation Cards */}
          <View className="gap-3">
            {motivationOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => setSelectedStar(option.value)}
                style={({ pressed }) => [
                  {
                    borderWidth: 2,
                    borderColor:
                      selectedStar === option.value ? '#0a7ea4' : '#E5E7EB',
                    backgroundColor:
                      selectedStar === option.value ? '#0a7ea4' : '#ffffff',
                    borderRadius: 12,
                    padding: 16,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
              >
                <View className="gap-3">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-4xl">{option.icon}</Text>
                    <View className="flex-1">
                      <Text
                        className={`text-xl font-bold ${
                          selectedStar === option.value
                            ? 'text-white'
                            : 'text-foreground'
                        }`}
                      >
                        {option.label}
                      </Text>
                      <Text
                        className={`text-sm ${
                          selectedStar === option.value
                            ? 'text-white/80'
                            : 'text-muted'
                        }`}
                      >
                        {option.description}
                      </Text>
                    </View>
                  </View>

                  {/* Details */}
                  <View className="gap-1 pl-16">
                    {option.details.map((detail, idx) => (
                      <Text
                        key={idx}
                        className={`text-xs ${
                          selectedStar === option.value
                            ? 'text-white/70'
                            : 'text-muted'
                        }`}
                      >
                        • {detail}
                      </Text>
                    ))}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Navigation Buttons */}
          <View className="gap-3 mt-6">
            <Pressable
              onPress={handleContinue}
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
                Continue
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.back()}
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
