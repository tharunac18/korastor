import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useOnboarding } from '@/lib/onboarding-context';

export default function RewardVaultScreen() {
  const router = useRouter();
  const { setRewardVault, nextStep } = useOnboarding();

  const [itemName, setItemName] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  const handleContinue = () => {
    if (!itemName || !targetPrice) {
      alert('Please fill in all fields');
      return;
    }

    setRewardVault({
      itemName,
      targetPrice: parseFloat(targetPrice),
    });

    nextStep();
    router.push('./confirmation');
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']} className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Your Reward Vault</Text>
            <Text className="text-base text-muted mt-2">
              What will you buy with your savings? Set a goal to stay motivated.
            </Text>
          </View>

          {/* Inspiration Section */}
          <View className="bg-primary/10 rounded-lg p-4 gap-2">
            <Text className="text-sm font-semibold text-primary">💡 Popular Rewards</Text>
            <Text className="text-xs text-muted">
              New tech • Travel • Fitness gear • Home upgrade • Experience
            </Text>
          </View>

          {/* Item Name */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              What do you want to buy?
            </Text>
            <TextInput
              placeholder="e.g., New Laptop, Trip to Japan"
              value={itemName}
              onChangeText={setItemName}
              className="border border-border rounded-lg px-4 py-3 text-foreground bg-surface"
              placeholderTextColor="#9BA1A6"
            />
            <Text className="text-xs text-muted">
              Be specific! This will be your visual goal.
            </Text>
          </View>

          {/* Target Price */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              Target price (USD)
            </Text>
            <TextInput
              placeholder="e.g., 500"
              value={targetPrice}
              onChangeText={setTargetPrice}
              keyboardType="decimal-pad"
              className="border border-border rounded-lg px-4 py-3 text-foreground bg-surface"
              placeholderTextColor="#9BA1A6"
            />
            <Text className="text-xs text-muted">
              How much will it cost?
            </Text>
          </View>

          {/* Motivation Message */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Your Goal
            </Text>
            {itemName && targetPrice ? (
              <Text className="text-base text-foreground">
                Save <Text className="font-bold">${targetPrice}</Text> for{' '}
                <Text className="font-bold">{itemName}</Text>
              </Text>
            ) : (
              <Text className="text-sm text-muted italic">
                Fill in the details above to see your goal
              </Text>
            )}
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
