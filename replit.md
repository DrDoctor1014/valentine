# Valentine Surprise

## Overview

A romantic mobile app experience built with Expo and React Native, designed as a private Valentine's Day gift for a specific recipient. The app presents an interactive gift-unwrapping journey where the user opens three gift boxes in sequence, revealing a love note, gift card, and music video, culminating in a digital flower bouquet keepsake.

This is a single-user, no-authentication experience focused on emotional presentation rather than utility. The design follows a "soft romantic luxury" aesthetic with creamy pastels, elegant animations, and handwritten-style typography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Expo SDK 54 with React Native 0.81
- **Navigation**: React Navigation v7 with native stack navigator (stack-only, linear flow)
- **State Management**: React Query for server state, React hooks for local state
- **Animation**: React Native Reanimated for smooth gesture and transition animations
- **Styling**: Component-level StyleSheet with shared theme constants

### Screen Flow Pattern
The app uses a deliberate linear navigation pattern:
1. Welcome Screen → soft greeting
2. Gift Selection Screen → three shuffled gift boxes (hub)
3. Modal reveals (Love Note, Gift Card, Music Video) → dismiss back to hub
4. Final Bouquet Screen → full-screen takeover after all gifts opened

Gift boxes appear in random visual positions but reveal content in fixed order (love note → gift card → video) to create an emotionally paced experience.

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Pattern**: RESTful routes prefixed with `/api`
- **Database**: PostgreSQL with Drizzle ORM (schema defined in `shared/schema.ts`)
- **Build**: esbuild for server bundling, separate from Expo build

### Project Structure
- `client/` - React Native/Expo frontend code
- `server/` - Express backend
- `shared/` - Shared types and database schema
- `assets/` - Images and static resources
- `scripts/` - Build utilities

### Key Design Decisions
- **No authentication**: Single-user intimate experience, no login required
- **Valentine theme hardcoded**: Colors, fonts, and copy are all themed for the specific occasion
- **Haptic feedback**: Touch interactions include haptic responses for tactile feel
- **Modal presentations**: Gift reveals use iOS-style modal animations

## External Dependencies

### Third-Party Services
- **PostgreSQL Database**: Required for Drizzle ORM (DATABASE_URL environment variable)
- **Expo Services**: Build and development tools via Expo CLI

### Key Packages
- **expo-video**: Video playback for music video reveal
- **expo-haptics**: Tactile feedback on interactions
- **expo-linear-gradient**: Background gradients
- **expo-sharing / expo-media-library**: Save/share functionality for final bouquet
- **react-native-view-shot**: Capture bouquet as shareable image
- **react-native-reanimated**: Complex animations
- **@tanstack/react-query**: Server state management

### Fonts
- Satisfy (Google Fonts) - Display/romantic headings
- Lato (Google Fonts) - Body text

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `EXPO_PUBLIC_DOMAIN` - API server domain for client requests
- `REPLIT_DEV_DOMAIN` / `REPLIT_DOMAINS` - CORS configuration