import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HabitProfile, NorthStar, RewardVault } from './types';

interface OnboardingState {
  habitProfile: HabitProfile | null;
  northStar: NorthStar | null;
  rewardVault: RewardVault | null;
  currentStep: number; // 0 = welcome, 1 = habit, 2 = motivation, 3 = reward, 4 = confirm
}

interface OnboardingContextType {
  state: OnboardingState;
  setHabitProfile: (profile: HabitProfile) => void;
  setNorthStar: (star: NorthStar) => void;
  setRewardVault: (vault: RewardVault) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
  isComplete: () => boolean;
}

const initialState: OnboardingState = {
  habitProfile: null,
  northStar: null,
  rewardVault: null,
  currentStep: 0,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState);

  const setHabitProfile = (profile: HabitProfile) => {
    setState((prev) => ({ ...prev, habitProfile: profile }));
  };

  const setNorthStar = (star: NorthStar) => {
    setState((prev) => ({ ...prev, northStar: star }));
  };

  const setRewardVault = (vault: RewardVault) => {
    setState((prev) => ({ ...prev, rewardVault: vault }));
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }));
  };

  const previousStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 0) }));
  };

  const reset = () => {
    setState(initialState);
  };

  const isComplete = () => {
    return (
      state.habitProfile !== null &&
      state.northStar !== null &&
      state.rewardVault !== null
    );
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setHabitProfile,
        setNorthStar,
        setRewardVault,
        nextStep,
        previousStep,
        reset,
        isComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
