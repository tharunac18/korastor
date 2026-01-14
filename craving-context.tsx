import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CravingDampenerTask } from './types';

interface CravingContextType {
  isActive: boolean;
  currentTask: CravingDampenerTask | null;
  startCravingDampener: () => void;
  endCravingDampener: () => void;
  getRandomTask: () => CravingDampenerTask;
}

const tasks: CravingDampenerTask[] = [
  {
    id: 'find-blue',
    type: 'find',
    instruction: 'Find 3 blue things in your room',
    duration: 30,
  },
  {
    id: 'find-round',
    type: 'find',
    instruction: 'Find 5 round objects around you',
    duration: 30,
  },
  {
    id: 'find-soft',
    type: 'find',
    instruction: 'Touch 3 soft textures',
    duration: 30,
  },
  {
    id: 'count-breaths',
    type: 'breathe',
    instruction: 'Take 10 deep breaths with me',
    duration: 60,
  },
  {
    id: 'name-colors',
    type: 'find',
    instruction: 'Name 7 different colors you see',
    duration: 30,
  },
  {
    id: 'listen-sounds',
    type: 'find',
    instruction: 'Listen for 3 different sounds',
    duration: 30,
  },
];

const CravingContext = createContext<CravingContextType | undefined>(undefined);

export function CravingProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentTask, setCurrentTask] = useState<CravingDampenerTask | null>(null);

  const getRandomTask = (): CravingDampenerTask => {
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  const startCravingDampener = () => {
    setIsActive(true);
    setCurrentTask(getRandomTask());
  };

  const endCravingDampener = () => {
    setIsActive(false);
    setCurrentTask(null);
  };

  return (
    <CravingContext.Provider
      value={{
        isActive,
        currentTask,
        startCravingDampener,
        endCravingDampener,
        getRandomTask,
      }}
    >
      {children}
    </CravingContext.Provider>
  );
}

export function useCraving() {
  const context = useContext(CravingContext);
  if (!context) {
    throw new Error('useCraving must be used within CravingProvider');
  }
  return context;
}
