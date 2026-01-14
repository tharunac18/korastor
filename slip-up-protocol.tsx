import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAppState } from '@/lib/app-state-context';
import { TriggerType, EmotionType } from '@/lib/types';
import * as Haptics from 'expo-haptics';

type Step = 'trigger' | 'emotion' | 'advice' | 'complete';

const triggerAdvice: Record<TriggerType, string> = {
  stress:
    'Next time stress hits, try a 5-minute walk or call a friend. Movement and connection are powerful stress-breakers.',
  social:
    'When socializing, keep your hands busy with a cold drink or fidget toy. You\'ve got this.',
  alcohol:
    'Alcohol lowers your guard. Plan ahead: bring a non-alcoholic drink or have an exit strategy ready.',
  boredom:
    'Boredom is a trigger. Keep a list of quick activities: a podcast, a game, or a short workout.',
};

export default function SlipUpProtocolScreen() {
  const router = useRouter();
  const { state, dispatch } = useAppState();

  const [step, setStep] = useState<Step>('trigger');
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerType | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);

  const triggerOptions: { label: string; value: TriggerType; icon: string }[] = [
    { label: 'Stress', value: 'stress', icon: '😰' },
    { label: 'Social Pressure', value: 'social', icon: '👥' },
    { label: 'Alcohol', value: 'alcohol', icon: '🍺' },
    { label: 'Boredom', value: 'boredom', icon: '😑' },
  ];

  const emotionOptions: { label: string; value: EmotionType; icon: string }[] = [
    { label: 'Anxious', value: 'anxious', icon: '😟' },
    { label: 'Guilty', value: 'guilty', icon: '😔' },
    { label: 'Fine', value: 'fine', icon: '😌' },
  ];

  const handleTriggerSelect = (trigger: TriggerType) => {
    setSelectedTrigger(trigger);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep('emotion');
  };

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep('advice');
  };

  const handleComplete = () => {
    if (!selectedTrigger || !selectedEmotion || !state.userProfile) return;

    // Log slip-up
    const newSlipUp = {
      timestamp: Date.now(),
      trigger: selectedTrigger,
      emotion: selectedEmotion,
      unitsConsumed: 1, // Default to 1 unit
    };

    const updatedSlipUps = [...state.streakData.slipUps, newSlipUp];

    // Reset streak
    dispatch({
      type: 'SET_STREAK_DATA',
      payload: {
        lastConsumptionDate: Date.now(),
        currentStreak: 0,
        totalDaysAbstinent: state.streakData.totalDaysAbstinent,
        slipUps: updatedSlipUps,
      },
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    router.back();
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']} className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">
              No Judgment Zone
            </Text>
            <Text className="text-base text-muted mt-2">
              Let's understand what happened so we can help you next time.
            </Text>
          </View>

          {/* Trigger Selection */}
          {(step === 'trigger' || step === 'emotion' || step === 'advice') && (
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">
                What was the trigger?
              </Text>
              <View className="gap-2">
                {triggerOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => handleTriggerSelect(option.value)}
                    disabled={step !== 'trigger'}
                    style={({ pressed }) => [
                      {
                        borderWidth: 2,
                        borderColor:
                          selectedTrigger === option.value ? '#0a7ea4' : '#E5E7EB',
                        backgroundColor:
                          selectedTrigger === option.value ? '#0a7ea4' : '#ffffff',
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        opacity: pressed ? 0.8 : step !== 'trigger' ? 0.6 : 1,
                      },
                    ]}
                  >
                    <Text className="text-2xl">{option.icon}</Text>
                    <Text
                      className={`text-base font-medium ${
                        selectedTrigger === option.value
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
          )}

          {/* Emotion Selection */}
          {(step === 'emotion' || step === 'advice') && (
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">
                How do you feel?
              </Text>
              <View className="flex-row gap-2">
                {emotionOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => handleEmotionSelect(option.value)}
                    disabled={step !== 'emotion'}
                    style={({ pressed }) => [
                      {
                        flex: 1,
                        borderWidth: 2,
                        borderColor:
                          selectedEmotion === option.value ? '#0a7ea4' : '#E5E7EB',
                        backgroundColor:
                          selectedEmotion === option.value ? '#0a7ea4' : '#ffffff',
                        paddingVertical: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        gap: 4,
                        opacity: pressed ? 0.8 : step !== 'emotion' ? 0.6 : 1,
                      },
                    ]}
                  >
                    <Text className="text-2xl">{option.icon}</Text>
                    <Text
                      className={`text-xs font-medium text-center ${
                        selectedEmotion === option.value
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
          )}

          {/* Advice Section */}
          {step === 'advice' && selectedTrigger && (
            <View className="bg-primary/10 rounded-lg p-4 gap-3 border border-primary/20">
              <Text className="text-base font-semibold text-primary">
                💡 Actionable Advice
              </Text>
              <Text className="text-sm text-foreground leading-relaxed">
                {triggerAdvice[selectedTrigger]}
              </Text>
            </View>
          )}

          {/* Completion Message */}
          {step === 'advice' && (
            <View className="bg-warning/10 rounded-lg p-4 gap-2 border border-warning/20">
              <Text className="text-sm font-semibold text-warning">
                📊 What Happens Next
              </Text>
              <Text className="text-xs text-foreground">
                • Your streak resets (unless you use Køra-Points to freeze it)
              </Text>
              <Text className="text-xs text-foreground">
                • Your money ticker pauses briefly
              </Text>
              <Text className="text-xs text-foreground">
                • We learn from this to support you better
              </Text>
            </View>
          )}

          {/* Navigation Buttons */}
          <View className="gap-3 mt-6">
            {step === 'advice' && (
              <Pressable
                onPress={handleComplete}
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
                  I Understand, Continue
                </Text>
              </Pressable>
            )}
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
              <Text className="text-center text-foreground font-medium">
                {step === 'advice' ? 'Back' : 'Cancel'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
