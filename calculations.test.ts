import { describe, it, expect } from 'vitest';
import {
  calculateDaysAbstinent,
  calculateMoneySaved,
  calculateLifeRegained,
  calculateHealthProgress,
  formatCurrency,
  formatStreak,
  formatTimeRegained,
} from '../calculations';
import { HabitProfile, HealthSystem } from '../types';

describe('Calculations', () => {
  describe('calculateDaysAbstinent', () => {
    it('should calculate days abstinent correctly', () => {
      const startDate = Date.now() - 5 * 24 * 60 * 60 * 1000; // 5 days ago
      const lastConsumptionDate = null;
      const days = calculateDaysAbstinent(startDate, lastConsumptionDate);
      expect(days).toBe(5);
    });

    it('should reset to 0 if consumption happened today', () => {
      const startDate = Date.now() - 5 * 24 * 60 * 60 * 1000;
      const lastConsumptionDate = Date.now();
      const days = calculateDaysAbstinent(startDate, lastConsumptionDate);
      expect(days).toBe(0);
    });

    it('should calculate days since last consumption', () => {
      const startDate = Date.now() - 10 * 24 * 60 * 60 * 1000;
      const lastConsumptionDate = Date.now() - 3 * 24 * 60 * 60 * 1000;
      const days = calculateDaysAbstinent(startDate, lastConsumptionDate);
      expect(days).toBe(3);
    });
  });

  describe('calculateMoneySaved', () => {
    it('should calculate money saved correctly', () => {
      const habitProfile: HabitProfile = {
        types: ['smoke'],
        unitsPerDay: 20,
        costPerUnit: 0.5,
        nicotineStrength: 'high',
      };
      const daysAbstinent = 10;
      const slipUpCount = 0;

      const moneySaved = calculateMoneySaved(habitProfile, daysAbstinent, slipUpCount);
      expect(moneySaved).toBe(100); // 20 * 0.5 * 10
    });

    it('should deduct money for slip-ups', () => {
      const habitProfile: HabitProfile = {
        types: ['vape'],
        unitsPerDay: 5,
        costPerUnit: 2,
        nicotineStrength: 'medium',
      };
      const daysAbstinent = 10;
      const slipUpCount = 2;

      const moneySaved = calculateMoneySaved(habitProfile, daysAbstinent, slipUpCount);
      // 5 * 2 * 10 = 100, minus 2 slip-ups * 2 = 100 - 4 = 96
      expect(moneySaved).toBe(96);
    });
  });

  describe('calculateLifeRegained', () => {
    it('should calculate life regained in milliseconds', () => {
      const habitProfile: HabitProfile = {
        types: ['smoke'],
        unitsPerDay: 20,
        costPerUnit: 0.5,
        nicotineStrength: 'high',
      };
      const daysAbstinent = 1;

      const lifeRegained = calculateLifeRegained(habitProfile, daysAbstinent);
      // 20 units * 11 minutes per cigarette * 1 day * 60 * 1000 ms = 13,200,000 ms
      expect(lifeRegained).toBe(13200000);
    });
  });

  describe('calculateHealthProgress', () => {
    it('should calculate health system progress correctly', () => {
      const system: HealthSystem = {
        name: 'Blood Oxygen',
        timeToRestoration: '8 hours',
        restorationMs: 8 * 60 * 60 * 1000,
        progressPercent: 0,
        currentStatus: 'Recovering',
      };
      const timeSinceQuitMs = 4 * 60 * 60 * 1000; // 4 hours

      const progress = calculateHealthProgress(system, timeSinceQuitMs);
      expect(progress).toBe(50); // 4 hours out of 8 hours
    });

    it('should cap progress at 100%', () => {
      const system: HealthSystem = {
        name: 'Blood Oxygen',
        timeToRestoration: '8 hours',
        restorationMs: 8 * 60 * 60 * 1000,
        progressPercent: 0,
        currentStatus: 'Recovering',
      };
      const timeSinceQuitMs = 24 * 60 * 60 * 1000; // 24 hours (more than 8)

      const progress = calculateHealthProgress(system, timeSinceQuitMs);
      expect(progress).toBe(100);
    });
  });

  describe('Formatting functions', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(1234.5)).toBe('$1,234.50');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format streak correctly', () => {
      const ms = 5 * 24 * 60 * 60 * 1000; // 5 days
      expect(formatStreak(ms)).toContain('5');
    });

    it('should format time regained correctly', () => {
      const ms = 60 * 60 * 1000; // 1 hour
      const formatted = formatTimeRegained(ms);
      expect(formatted).toContain('1');
    });
  });
});
