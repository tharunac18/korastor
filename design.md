# Kørastor - Mobile App Interface Design

## Brand Identity
**Name:** Kørastor (Kora = Choose/Select, Stor = Great/Strong)  
**Design Language:** Nordic Minimalist with high contrast, white space, and organic rounded shapes  
**Primary Interaction:** The "Center Pulse" — a single multi-functional button at the bottom center

---

## Screen List

### 1. **Onboarding Flow**
- **Welcome Screen** — Brand introduction, "Contract with Yourself" messaging
- **Habit Profile Screen** — Select type (Smoke/Vape/Snus), daily units, cost per unit, nicotine strength
- **Motivation Screen** — Select "North Star" (Wealth/Vitality/Legacy)
- **Reward Vault Screen** — Input desired reward item and target price
- **Confirmation Screen** — Review all inputs, start journey

### 2. **Dashboard (Main Screen)**
- **Vessel Icon** — Semi-transparent circle representing user's body (clear/glowing on streak, cloudy on slip)
- **Live Metrics** — Money Saved (rolling ticker), Life Regained (time added), Streak (days/hours)
- **Center Pulse Button** — Multi-functional: hold 3s (craving), single tap (log slip), double tap (today's milestone)
- **Quick Navigation** — Tab bar with Home, Health, Rewards, Profile

### 3. **Craving Dampener Screen**
- **Tactile Breathing** — Expanding/contracting screen animation with haptic feedback
- **Micro-Task** — Random cognitive distractor (find items, swipe-to-match game)
- **Voice of Reason** — 15-second audio clip from former quitter or health pro
- **Exit Button** — "I'm okay" to return to dashboard

### 4. **Slip-Up Protocol Screen**
- **Trigger Question** — "What was the trigger?" (Stress/Social/Alcohol/Boredom)
- **Emotion Check-in** — "How do you feel?" (Anxious/Guilty/Fine)
- **Actionable Advice** — Context-specific guidance based on trigger
- **Data Adjustment** — Money ticker pauses, streak tracked
- **Continue Button** — Return to dashboard

### 5. **Health Restoration Tab**
- **System Status Table** — Shows restoration progress for Blood Oxygen, Taste/Smell, Lungs, Heart Risk
- **Progress Bars** — Visual indicators for each system's healing timeline
- **Current Status Labels** — "RESTORED", "Nerves Reconnecting", "Cilia Regeneration", etc.

### 6. **Rewards Tab**
- **Reward Vault Display** — Shows target item with image (gains color/clarity as user saves)
- **Progress Bar** — Linked to money saved vs. target price
- **Milestone Notifications** — "You've saved 15% of your [New Tech]. $75 away!"
- **Purchase Button** — "Buy Now" when target reached

### 7. **Milestones & Køra-Points Tab**
- **Shield Achievements** — Bronze Shield (3 days), Silver Shield (3 weeks), etc.
- **Køra-Points Display** — Points earned for resisting cravings
- **Freeze Streak Option** — Use points to prevent streak reset on slip-up (once per month)

### 8. **Profile Tab**
- **User Stats** — Total days, total money saved, total life regained
- **Settings** — Notifications, theme, reset journey
- **About** — App info, contact support

---

## Primary Content & Functionality

### Dashboard (Home)
- **Vessel Icon:** Animated semi-transparent circle (clear on streak, cloudy on slip)
- **Metrics Display:**
  - Money Saved: `$142.53` (rolling ticker, updates every few seconds)
  - Life Regained: `12 hours 34 minutes` (calculated from clinical data)
  - Streak: `7 days, 14 hours` (updates in real-time)
- **Center Pulse Button:** Positioned at bottom center, large tap target
  - Hold 3s → Craving Dampener
  - Single Tap → Slip-Up Protocol
  - Double Tap → Today's Health Milestone

### Craving Dampener
- **Breathing Animation:** Screen expands/contracts over 90 seconds
- **Haptic Feedback:** Vibrations sync with breathing rhythm
- **Micro-Task:** Randomly selected from pool (find 3 blue things, swipe-to-match game, etc.)
- **Audio Player:** 15-second clip with play/pause controls

### Health Restoration
- **Table Format:**
  | System | Time to Restoration | Progress | Status |
  | Blood Oxygen | 8 Hours | 100% | RESTORED |
  | Taste/Smell | 48 Hours | 85% | Nerves Reconnecting |
  | Lungs | 1-9 Months | 15% | Cilia Regeneration |
  | Heart Risk | 1 Year | 2% | Decreasing Load |

---

## Key User Flows

### Flow 1: Onboarding (First Time)
1. User opens app → Welcome screen
2. Taps "Start Journey" → Habit Profile (select type, units, cost, nicotine strength)
3. Confirms → Motivation screen (select North Star)
4. Confirms → Reward Vault (input desired item and price)
5. Reviews summary → Confirmation screen
6. Taps "Begin" → Dashboard

### Flow 2: Resisting a Craving
1. User feels craving → Holds Center Pulse for 3 seconds
2. Haptic feedback triggers → Craving Dampener screen opens
3. Screen expands/contracts (breathing animation)
4. Micro-task appears (e.g., "Find 3 blue things")
5. Audio clip plays (15 seconds)
6. User completes task → "I'm okay" button
7. Returns to dashboard → Streak intact, Køra-Points +1

### Flow 3: Logging a Slip-Up
1. User slips → Single taps Center Pulse
2. Slip-Up Protocol screen opens
3. Selects trigger (Stress/Social/Alcohol/Boredom)
4. Selects emotion (Anxious/Guilty/Fine)
5. Receives actionable advice
6. Taps "Continue"
7. Money ticker pauses, streak resets (unless Køra-Points used to freeze)
8. Returns to dashboard

### Flow 4: Viewing Health Progress
1. User opens Health tab
2. Sees System Status table with progress bars
3. Taps on a system to see more details
4. Returns to tab view

### Flow 5: Tracking Reward Progress
1. User opens Rewards tab
2. Sees target item with progress bar
3. Progress bar fills as money accumulates
4. When target reached, "Buy Now" button activates
5. User can confirm purchase (simulated or linked to external service)

---

## Color Choices

### Nordic Minimalist Palette
- **Primary (Tint):** `#0a7ea4` — Cool Nordic blue (trust, calm, health)
- **Background:** `#ffffff` (light), `#151718` (dark) — Clean, minimal
- **Surface:** `#f5f5f5` (light), `#1e2022` (dark) — Elevated cards
- **Foreground (Text):** `#11181C` (light), `#ECEDEE` (dark) — High contrast
- **Muted (Secondary Text):** `#687076` (light), `#9BA1A6` (dark) — Subtle
- **Border:** `#E5E7EB` (light), `#334155` (dark) — Dividers
- **Success:** `#22C55E` (light), `#4ADE80` (dark) — Positive actions
- **Warning:** `#F59E0B` (light), `#FBBF24` (dark) — Caution states
- **Error:** `#EF4444` (light), `#F87171` (dark) — Slip-up states

### Vessel States
- **Clear/Glowing (Streak):** Gradient from `#0a7ea4` to `#4dd0e1` with subtle glow
- **Cloudy (Slip):** Muted `#9BA1A6` with reduced opacity

---

## Layout Principles

### Mobile Portrait (9:16) & One-Handed Usage
- **Center Pulse Button:** Positioned at bottom center for easy thumb reach
- **Metrics Display:** Top half of screen (eye level, no scrolling needed)
- **Tab Bar:** Bottom, with 4-5 tabs for quick navigation
- **Safe Area:** Respects notch and home indicator
- **Spacing:** Generous white space (Nordic aesthetic)
- **Typography:** Large, readable fonts (minimum 16px for body text)

---

## Interaction Patterns

### Button Feedback
- **Center Pulse:** Scale + haptic on press, visual state change
- **Tab Navigation:** Opacity change, haptic on selection
- **Cards:** Subtle scale or opacity on press

### Animations
- **Vessel Icon:** Subtle pulse when on streak, slight shake on slip
- **Breathing Animation:** 90-second cycle (expand/contract)
- **Reward Progress:** Smooth bar fill animation
- **Metric Tickers:** Smooth number transitions

### Haptics
- **Craving Resistance:** Success notification (light impact)
- **Slip-Up Logged:** Medium impact (acknowledgment, no judgment)
- **Milestone Unlocked:** Success notification (celebration)

---

## Data Persistence
- **Local Storage:** AsyncStorage for habit profile, streak, money saved, life regained
- **Reward Vault:** Image URL stored locally
- **Slip-Up History:** Logged locally with timestamps and triggers
- **Køra-Points:** Tracked locally

---

## Accessibility
- **High Contrast:** All text meets WCAG AA standards
- **Large Touch Targets:** Minimum 44x44pt for interactive elements
- **Clear Labels:** All buttons and icons have descriptive labels
- **Haptic Feedback:** Provides non-visual feedback for interactions
- **Readable Typography:** Minimum 16px body text, clear hierarchy
