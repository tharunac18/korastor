import { HabitProfile, HealthSystem } from './types';

/**
 * Calculate money saved based on habit profile and days abstinent
 */
export function calculateMoneySaved(
  habitProfile: HabitProfile,
  daysAbstinent: number,
  slipUpsCount: number = 0
): number {
  const dailyCost = habitProfile.unitsPerDay * habitProfile.costPerUnit;
  const baseSavings = dailyCost * daysAbstinent;
  const slipUpCost = slipUpsCount * habitProfile.costPerUnit;
  return Math.max(0, baseSavings - slipUpCost);
}

/**
 * Calculate life regained in milliseconds based on habit type and days abstinent
 * Uses clinical data estimates
 */
export function calculateLifeRegained(
  habitProfile: HabitProfile,
  daysAbstinent: number
): number {
  // Estimates based on clinical data:
  // Smoking: ~11 minutes per cigarette
  // Vaping: ~5 minutes per pod (lower nicotine exposure)
  // Snus: ~3 minutes per tin (lower tar exposure)

  let minutesPerUnit = 0;

  if (habitProfile.types.includes('smoke')) {
    minutesPerUnit += 11;
  }
  if (habitProfile.types.includes('vape')) {
    minutesPerUnit += 5;
  }
  if (habitProfile.types.includes('snus')) {
    minutesPerUnit += 3;
  }

  // Average if multiple types
  if (habitProfile.types.length > 1) {
    minutesPerUnit = minutesPerUnit / habitProfile.types.length;
  }

  const dailyMinutesRegained = minutesPerUnit * habitProfile.unitsPerDay;
  const totalMinutesRegained = dailyMinutesRegained * daysAbstinent;

  return totalMinutesRegained * 60 * 1000; // Convert to milliseconds
}

/**
 * Calculate health system progress based on time abstinent
 */
export function calculateHealthProgress(
  system: HealthSystem,
  timeSinceQuitMs: number
): number {
  const progress = (timeSinceQuitMs / system.restorationMs) * 100;
  return Math.min(100, progress); // Cap at 100%
}

/**
 * Update health system status based on progress
 */
export function getHealthSystemStatus(
  systemName: string,
  progressPercent: number
): string {
  if (progressPercent >= 100) {
    return 'RESTORED';
  }

  switch (systemName) {
    case 'Blood Oxygen':
      if (progressPercent >= 50) return 'Oxygen Levels Rising';
      return 'Improving';
    case 'Taste/Smell':
      if (progressPercent >= 50) return 'Taste Returning';
      return 'Nerves Reconnecting';
    case 'Lungs':
      if (progressPercent >= 50) return 'Lung Function Improving';
      return 'Cilia Regeneration';
    case 'Heart Risk':
      if (progressPercent >= 50) return 'Heart Health Improving';
      return 'Decreasing Load';
    default:
      return 'Healing';
  }
}

/**
 * Format milliseconds to human-readable time string
 */
export function formatTimeRegained(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);

  return parts.join(', ') || '0 minutes';
}

/**
 * Format streak duration to human-readable string
 */
export function formatStreak(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''}`;
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Calculate days abstinent from timestamp
 */
export function calculateDaysAbstinent(startDate: number, lastConsumptionDate: number | null): number {
  const now = Date.now();
  const referenceDate = lastConsumptionDate || startDate;
  const diffMs = now - referenceDate;
  return Math.floor(diffMs / (24 * 60 * 60 * 1000));
}
