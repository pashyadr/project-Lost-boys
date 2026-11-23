# Product

<!-- impeccable:product-schema 1 -->

## Platform

android

## Stack
Mobile: React Native + Expo, TypeScript, NativeWind (Tailwind), Expo Router, Zustand, FlashList, Reanimated, expo-image, expo-sqlite + MMKV, expo-notifications.
Backend: Java + Spring Boot, PostgreSQL.
Android-first; iOS builds from the same code but follows the Android design language for now.

## Users
Everyone from age 15 (high school) to the elderly. The common situation: they want to eat healthier or reach a body goal (lose, gain or maintain weight, or simply live healthier), but they do not understand their own nutritional needs and have no meal guidance fitted to their condition and goal.

## Product Purpose
healthFlow (working name) gives each user a personal eating guide. It works out their calorie and macro needs from their profile, recommends what to reduce, swap or add, shows "now vs target" visually so they understand why, and keeps them consistent with meal-schedule reminders and a streak.

Success: the user understands their own needs and keeps a balanced eating pattern day after day.

## Positioning
Guidance personalised by goal + condition + activity, with age as a modifier (not one formula for everyone), built around Indonesian food and eating habits.

## Operating Context
Used daily on the user's own phone, often a mid- to low-end Android device, around meal times: checking the plan, logging a meal, answering a reminder, checking the streak.

## Capabilities and Constraints
MVP features:
1. Onboarding profile: height, weight, age, goal, condition, activity
2. Calorie and macro calculation (BMR/TDEE, adjusted by age)
3. Meal recommendations: what to reduce, swap or add
4. Visualisation: current vs target
5. Meal schedule + reminders (push notifications)
6. Streak system

Special conditions in the MVP: diabetes and hypertension only.
Deferred: AI chat, food photo scan, community, wearable integration.
Age rules: no aggressive calorie deficit for teens (15–18); higher protein, calcium and vitamin D focus for the elderly.
Hard requirement: zero lag on app startup and scrolling (offline-first reads from local SQLite, FlashList for long lists).
Undecided: official name, nutrition data source (TKPI / USDA / paid API), project deadline.

## Brand Commitments
Working name "healthFlow". Team "Lost Boys". The user asked for an energetic, motivating theme (gym and food references) with a three-colour 60/30/10 palette (60% base, 30% secondary, 10% eye-catching accent).

## Evidence on Hand
No real users, testimonials, food database or brand assets yet. Do not fabricate testimonials, user counts or clinical claims.

## Product Principles
1. Understand before you change: every recommendation shows why.
2. Personal, not generic: goal, condition, activity and age shape every number.
3. Safe by default: never push a teen or a medical-condition user into extreme targets; always defer to a doctor or nutritionist.
4. Consistency beats intensity: small daily wins (reminders, streaks) over drastic plans.
5. Instant: no screen may feel slow on a budget Android phone.

## Accessibility & Inclusion
Must work for elderly users: large readable text, high contrast (WCAG AA minimum), large touch targets, simple flows, minimal manual typing. Health disclaimer: not a replacement for a doctor or nutritionist. Users under 18 may need parental consent for health-data storage.
