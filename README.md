<<<<<<< HEAD
# Wall Calendar

A polished, interactive Next.js wall calendar component built to match the front-end engineering challenge.

## What it includes

- **Wall calendar aesthetic** with a hero image, month badge, and clean page layout
- **Day range selection** with start, end, and in-range states
- **Integrated notes area** with monthly and selected-range note persistence via `localStorage`
- **Responsive design**: desktop two-column layout and stacked mobile layout
- **Animations** using `framer-motion`
- **Image loading** optimized with `next/image` and Unsplash remote patterns

## Project structure

- `app/page.tsx` — landing page rendering the calendar
- `components/Calendar.tsx` — main calendar component
- `components/HeroImage.tsx` — monthly hero image card
- `components/CalendarHeader.tsx` — month navigation header
- `components/CalendarGrid.tsx` — interactive calendar grid
- `components/DateRangePicker.tsx` — selected range preview
- `components/NotesPanel.tsx` — notes UI and persistence
- `hooks/useDateRange.ts` — date-range selection state
- `hooks/useLocalStorage.ts` — localStorage persistence hook
- `utils/calendar.ts` — calendar day generation and range helpers

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notes

- This app is designed as a frontend-only interactive component.
- No backend is used; notes persist in client-side `localStorage`.

## Next steps for submission

- Push this folder to a GitHub repository
- Add a short demo video link and optional Vercel deployment link
=======
# wall-calendar
>>>>>>> 747ef33defe34329d0553fc81a609170c4c61342
