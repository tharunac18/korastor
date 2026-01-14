/**
 * Shared types for Kørastor app
 */

export type HabitType = 'smoke' | 'vape' | 'snus';
export type NicotineStrength = 'high' | 'medium' | 'low';
export type NorthStar = 'wealth' | 'vitality' | 'legacy';
export type TriggerType = 'stress' | 'social' | 'alcohol' | 'boredom';
export type EmotionType = 'anxious' | 'guilty' | 'fine';

export interface HabitProfile {
  types: HabitType[];
  unitsPerDay: number;
  costPerUnit: number;
  nicotineStrength: NicotineStrength;
}

export interface UserProfile {
  habitProfile: HabitProfile;
  northStar: NorthStar;
  rewardVault: RewardVault;
  startDate: number; // timestamp
}

export interface RewardVault {
  itemName: string;
  targetPrice: number;
  imageUrl?: string;
}

export interface StreakData {
  lastConsumptionDate: number | null; // timestamp
  currentStreak: number; // in seconds
  totalDaysAbstinent: number;
  slipUps: SlipUp[];
}

export interface SlipUp {
  timestamp: number;
  trigger: TriggerType;
  emotion: EmotionType;
  unitsConsumed: number;
}

export interface HealthSystem {
  name: string;
  timeToRestoration: string; // e.g., "8 Hours", "1-9 Months"
  restorationMs: number; // milliseconds to full restoration
  progressPercent: number;
  currentStatus: string;
}

export interface CravingDampenerTask {
  id: string;
  type: 'find' | 'match' | 'breathe';
  instruction: string;
  duration: number; // in seconds
}

export interface KoraPoints {
  total: number;
  earnedToday: number;
  freezeStreakUsed: boolean; // tracks if used this month
}

export interface AppState {
  userProfile: UserProfile | null;
  streakData: StreakData;
  healthSystems: HealthSystem[];
  koraPoints: KoraPoints;
  moneySaved: number;
  lifeRegainedMs: number;
}
