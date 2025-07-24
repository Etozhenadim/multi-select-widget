# Select Items Widget

A simple widget for selecting up to three items from a list with search and filter.

## Features

- Displays currently selected items (max 3).
- "Change my choice" opens a dialog with all available elements.
- Live search (substring match).
- Optional number filter: >10, >50, >100.
- Search and filter can be combined.
- Selected items are shown at the bottom with "X" to remove.
- When 3 items are selected, other checkboxes become disabled.
- "Save" applies the changes and closes the dialog.
- "Cancel" closes the dialog without saving.

## Tech Stack

- Next.js + React + TypeScript
- Tailwind CSS (class-based)
- MobX for state management

## Getting Started

```bash
npm install
npm run dev
```

## Improvements

### Lazy Loading / Pagination
If the element list grows to 1000+ items, consider:

- Displaying 50 elements at a time and loading more on scroll
- Or adding a "Load more" button at the end of the list