import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="habit-profile" />
      <Stack.Screen name="motivation" />
      <Stack.Screen name="reward-vault" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
}
