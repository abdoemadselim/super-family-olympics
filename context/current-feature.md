# Current Feature

## Status

In Progress

## Goals

Add a dedicated full-screen leaderboard accessible from the main menu:

- New game phase `"leaderboard"`
- Full-screen leaderboard showing:
  - Teams ranked by total score
  - Per-category score breakdown for each team
  - Medals for top 3
  - Visual score bars per category
- Button on MenuScreen to navigate to leaderboard
- Back button to return to menu

## Notes

- New component: `src/components/screens/LeaderboardScreen.tsx`
- Add `"leaderboard"` to `GamePhase` type
- Add `showLeaderboard` / `hideLeaderboard` actions to game store
- Use existing theme/styling patterns (gradients, rounded cards, Arabic RTL)

## History

<!-- Keep this updated. Earliest to latest -->
- Sound effects feature (completed)
