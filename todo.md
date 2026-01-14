# Kørastor - Project TODO

## Onboarding & Setup
- [x] Welcome screen with brand introduction
- [x] Habit Profile screen (type, units, cost, nicotine strength)
- [x] Motivation screen (North Star selection)
- [x] Reward Vault screen (item and target price input)
- [x] Onboarding confirmation and data persistence

## Dashboard (Core)
- [x] Vessel icon with streak/slip states
- [x] Money Saved ticker (rolling animation)
- [x] Life Regained display (time calculation)
- [x] Streak counter (days and hours)
- [x] Center Pulse button (multi-functional)
- [x] Tab bar navigation (Home, Health, Rewards, Profile)

## Center Pulse Interactions
- [x] Hold for 3s detection (craving trigger)
- [x] Single tap detection (slip-up log)
- [ ] Double tap detection (today's milestone)

## Craving Dampener
- [x] 90-second breathing animation (expand/contract)
- [x] Haptic vibration sync with breathing
- [x] Micro-task system (random cognitive distractors)
- [ ] Voice of Reason audio player (15-second clips)
- [x] Exit and return to dashboard

## Slip-Up Protocol
- [x] Trigger selection (Stress, Social, Alcohol, Boredom)
- [x] Emotion check-in (Anxious, Guilty, Fine)
- [x] Actionable advice generation
- [ ] Money ticker pause on slip
- [x] Streak reset logic

## Health Restoration Tab
- [x] System Status table display
- [x] Blood Oxygen progress (8 hours to restoration)
- [x] Taste/Smell progress (48 hours to restoration)
- [x] Lungs progress (1-9 months to restoration)
- [x] Heart Risk progress (1 year to restoration)
- [x] Progress bar animations

## Rewards Tab
- [x] Reward Vault display with target item
- [x] Progress bar (money saved vs. target)
- [ ] Image color/clarity gain as user saves
- [ ] Milestone notifications
- [x] Purchase button (when target reached)

## Milestones & Køra-Points
- [x] Bronze Shield achievement (3 days)
- [x] Silver Shield achievement (3 weeks)
- [x] Køra-Points counter
- [ ] Freeze Streak feature (use points to prevent reset)
- [ ] Milestone unlock animations

## Profile Tab
- [x] User stats display (total days, money saved, life regained)
- [ ] Settings screen (notifications, theme, reset journey)
- [ ] About screen (app info, support contact)

## Branding & Visual
- [ ] Custom app logo generation
- [x] Nordic Minimalist color palette implementation
- [x] Theme configuration (light/dark mode)
- [x] Icon mappings for tab bar
- [ ] Splash screen customization

## Testing
- [x] Unit tests for calculations (money saved, life regained, health progress)
- [x] Type definitions and validation
- [ ] Integration tests for onboarding flow
- [ ] Integration tests for craving dampener

## Data & Persistence
- [x] AsyncStorage setup for local data
- [x] Habit profile storage
- [ ] Streak and money tracking
- [ ] Slip-up history logging
- [ ] Reward Vault data persistence

## Testing & Polish
- [ ] End-to-end onboarding flow
- [ ] Dashboard metrics accuracy
- [ ] Craving Dampener interaction
- [ ] Slip-up protocol flow
- [ ] Health restoration calculations
- [ ] Reward progress tracking
- [ ] All buttons and navigation working
- [ ] No console errors (iOS, Android, Web)
