import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useCraving } from '@/lib/craving-context';
import { useAppState } from '@/lib/app-state-context';
import * as Haptics from 'expo-haptics';

export default function CravingDampenerScreen() {
  const router = useRouter();
  const { currentTask, endCravingDampener } = useCraving();
  const { dispatch, state } = useAppState();

  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds total
  const [taskComplete, setTaskComplete] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Breathing animation
  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    breathingAnimation.start();
    return () => breathingAnimation.reset();
  }, [scaleAnim]);

  // Fade in animation
  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacityAnim]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTaskComplete(true);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Haptic feedback every 15 seconds (breathing rhythm)
  useEffect(() => {
    if (timeLeft > 0 && timeLeft % 15 === 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [timeLeft]);

  const handleComplete = async () => {
    // Award Køra-Points for resisting craving
    const newKoraPoints = {
      ...state.koraPoints,
      total: state.koraPoints.total + 1,
      earnedToday: state.koraPoints.earnedToday + 1,
    };
    dispatch({ type: 'UPDATE_KORA_POINTS', payload: newKoraPoints });

    endCravingDampener();
    router.back();
  };

  const handleExit = () => {
    endCravingDampener();
    router.back();
  };

  return (
    <View className="flex-1 bg-background justify-center items-center p-6">
      <Animated.View
        style={{
          opacity: opacityAnim,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Breathing Circle */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View className="w-48 h-48 rounded-full bg-primary/20 border-4 border-primary items-center justify-center">
            <Text className="text-6xl">💙</Text>
          </View>
        </Animated.View>

        {/* Timer */}
        <View className="mt-12 gap-4 items-center">
          <Text className="text-5xl font-bold text-foreground">
            {timeLeft}s
          </Text>
          <Text className="text-lg text-muted">
            {taskComplete ? 'You did it! 🎉' : 'Keep breathing...'}
          </Text>
        </View>

        {/* Task Description */}
        {currentTask && !taskComplete && (
          <View className="mt-8 bg-surface rounded-lg p-6 border border-border max-w-xs">
            <Text className="text-base font-semibold text-foreground text-center mb-2">
              {currentTask.type === 'breathe'
                ? 'Breathe with Me'
                : 'Micro-Task'}
            </Text>
            <Text className="text-sm text-muted text-center">
              {currentTask.instruction}
            </Text>
          </View>
        )}

        {/* Success Message */}
        {taskComplete && (
          <View className="mt-8 bg-success/10 rounded-lg p-6 border border-success max-w-xs">
            <Text className="text-base font-semibold text-success text-center mb-2">
              Craving Resisted! 💪
            </Text>
            <Text className="text-sm text-success/80 text-center">
              You earned 1 Køra-Point. Every moment of resistance is a victory.
            </Text>
          </View>
        )}

        {/* Buttons */}
        <View className="mt-12 gap-3 w-full max-w-xs">
          {taskComplete ? (
            <Pressable
              onPress={handleComplete}
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
                I'm Okay, Back to Dashboard
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleExit}
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
                Exit (Craving Still Present)
              </Text>
            </Pressable>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
