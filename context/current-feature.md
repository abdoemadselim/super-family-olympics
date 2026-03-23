# Current Feature

## Status

In Progress

## Goals

Add fun, childish sound effects using the Web Audio API (no audio files needed):

- **Correct answer** - Happy ascending arpeggio (C-E-G)
- **Wrong answer** - Descending sad/funny notes
- **Joker activated** - Magical sparkle sweep
- **Timer start** - Short click
- **Timer warning (≤10s)** - Urgent tick on each second
- **Timer end** - Buzzer/alarm sound
- **Category complete** - Triumphant fanfare
- **Next round / team added** - Whoosh/pop sounds
- **Game start** - Rising excitement sweep

## Notes

- Using Web Audio API oscillators — no external audio files
- Create `src/hooks/useSound.ts` custom hook
- Wire up sounds in: QuestionCard, Timer, JokerButton, GameRound, CategoryResult, SetupScreen

## History

<!-- Keep this updated. Earliest to latest -->
