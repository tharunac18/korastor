import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useOnboarding } from '@/lib/onboarding-context';
import { HabitType, NicotineStrength } from '@/lib/types';

export default function HabitProfileScreen() {
  const router = useRouter();
  const { state, setHabitProfile, nextStep } = useOnboarding();

  const [selectedTypes, setSelectedTypes] = useState<HabitType[]>([]);
  const [unitsPerDay, setUnitsPerDay] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [nicotineStrength, setNicotineStrength] = useState<NicotineStrength>('medium');

  const habitOptions: { label: string; value: HabitType }[] = [
    { label: 'Cigarettes', value: 'smoke' },
    { label: 'Vape/E-cig', value: 'vape' },
    { label: 'Snus/Pouches', value: 'snus' },
  ];

  const nicotineOptions: { label: string; value: NicotineStrength }[] = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  const toggleHabitType = (type: HabitType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleContinue = () => {
    if (selectedTypes.length === 0 || !unitsPerDay || !costPerUnit) {
      alert('Please fill in all fields');
      return;
    }

    setHabitProfile({
      types: selectedTypes,
      unitsPerDay: parseFloat(unitsPerDay),
      costPerUnit: parseFloat(costPerUnit),
      nicotineStrength,
    });

    nextStep();
    router.push('./motivation');
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']} className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Your Habit Profile</Text>
            <Text className="text-base text-muted mt-2">
              Help us understand your journey so we can support you better.
            </Text>
          </View>

          {/* Habit Type Selection */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              What do you use? (Select all that apply)
            </Text>
            <View className="gap-2">
              {habitOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => toggleHabitType(option.value)}
                  style={({ pressed }) => [
                    {
                      borderWidth: 2,
                      borderColor: selectedTypes.includes(option.value) ? '#0a7ea4' : '#E5E7EB',
                      backgroundColor: selectedTypes.includes(option.value)
                        ? '#0a7ea4'
                        : '#ffffff',
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text
                    className={`text-base font-medium ${
                      selectedTypes.includes(option.value)
                        ? 'text-white'
                        : 'text-foreground'
                    }`}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Units Per Day */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              How many units per day?
            </Text>
            <TextInput
              placeholder="e.g., 15"
              value={unitsPerDay}
              onChangeText={setUnitsPerDay}
              keyboardType="decimal-pad"
              className="border border-border rounded-lg px-4 py-3 text-foreground bg-surface"
              placeholderTextColor="#9BA1A6"
            />
            <Text className="text-xs text-muted">
              Cigarettes, pods, or tins per day
            </Text>
          </View>

          {/* Cost Per Unit */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              Cost per unit (in USD)
            </Text>
            <TextInput
              placeholder="e.g., 1.50"
              value={costPerUnit}
              onChangeText={setCostPerUnit}
              keyboardType="decimal-pad"
              className="border border-border rounded-lg px-4 py-3 text-foreground bg-surface"
              placeholderTextColor="#9BA1A6"
            />
            <Text className="text-xs text-muted">
              Price of one cigarette, pod, or tin
            </Text>
          </View>

          {/* Nicotine Strength */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Nicotine strength
            </Text>
            <View className="flex-row gap-2">
              {nicotineOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => setNicotineStrength(option.value)}
                  style={({ pressed }) => [
                    {
                      flex: 1,
                      borderWidth: 2,
                      borderColor: nicotineStrength === option.value ? '#0a7ea4' : '#E5E7EB',
                      backgroundColor:
                        nicotineStrength === option.value ? '#0a7ea4' : '#ffffff',
                      paddingVertical: 10,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text
                    className={`text-center font-medium ${
                      nicotineStrength === option.value
                        ? 'text-white'
                        : 'text-foreground'
                    }`}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
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
