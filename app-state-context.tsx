import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, UserProfile, StreakData, KoraPoints, HealthSystem } from './types';

const STORAGE_KEY = 'korastor_app_state';
const HEALTH_SYSTEMS_KEY = 'korastor_health_systems';

interface AppStateContextType {
  state: AppState;
  dispatch: React.Dispatch<AppStateAction>;
  isLoading: boolean;
  saveState: () => Promise<void>;
}

export type AppStateAction =
  | { type: 'SET_USER_PROFILE'; payload: UserProfile }
  | { type: 'SET_STREAK_DATA'; payload: StreakData }
  | { type: 'UPDATE_MONEY_SAVED'; payload: number }
  | { type: 'UPDATE_LIFE_REGAINED'; payload: number }
  | { type: 'UPDATE_KORA_POINTS'; payload: KoraPoints }
  | { type: 'UPDATE_HEALTH_SYSTEMS'; payload: HealthSystem[] }
  | { type: 'LOAD_STATE'; payload: AppState };

const defaultHealthSystems: HealthSystem[] = [
  {
    name: 'Blood Oxygen',
    timeToRestoration: '8 Hours',
    restorationMs: 8 * 60 * 60 * 1000,
    progressPercent: 0,
    currentStatus: 'Improving',
  },
  {
    name: 'Taste/Smell',
    timeToRestoration: '48 Hours',
    restorationMs: 48 * 60 * 60 * 1000,
    progressPercent: 0,
    currentStatus: 'Nerves Reconnecting',
  },
  {
    name: 'Lungs',
    timeToRestoration: '1 - 9 Months',
    restorationMs: 9 * 30 * 24 * 60 * 60 * 1000,
    progressPercent: 0,
    currentStatus: 'Cilia Regeneration',
  },
  {
    name: 'Heart Risk',
    timeToRestoration: '1 Year',
    restorationMs: 365 * 24 * 60 * 60 * 1000,
    progressPercent: 0,
    currentStatus: 'Decreasing Load',
  },
];

const initialState: AppState = {
  userProfile: null,
  streakData: {
    lastConsumptionDate: null,
    currentStreak: 0,
    totalDaysAbstinent: 0,
    slipUps: [],
  },
  healthSystems: defaultHealthSystems,
  koraPoints: {
    total: 0,
    earnedToday: 0,
    freezeStreakUsed: false,
  },
  moneySaved: 0,
  lifeRegainedMs: 0,
};

function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload };
    case 'SET_STREAK_DATA':
      return { ...state, streakData: action.payload };
    case 'UPDATE_MONEY_SAVED':
      return { ...state, moneySaved: action.payload };
    case 'UPDATE_LIFE_REGAINED':
      return { ...state, lifeRegainedMs: action.payload };
    case 'UPDATE_KORA_POINTS':
      return { ...state, koraPoints: action.payload };
    case 'UPDATE_HEALTH_SYSTEMS':
      return { ...state, healthSystems: action.payload };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load state from AsyncStorage on mount
  useEffect(() => {
    loadState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveState();
    }
  }, [state]);

  async function loadState() {
    try {
      const savedState = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Failed to load app state:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveState() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save app state:', error);
    }
  }

  return (
    <AppStateContext.Provider value={{ state, dispatch, isLoading, saveState: saveState }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
