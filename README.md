# NCERT Books — Class 9 to 12

An educational website built with **React + Vite** that provides free access to NCERT textbooks for Classes 9–12. Features **dark/light theme** and **English/Hindi** language toggle.

## Features

- 📚 NCERT books for Classes 9, 10, 11, 12 — all major subjects
- 🌙 Dark / ☀️ Light theme toggle (saved in localStorage)
- 🌐 English / हिन्दी language toggle (saved in localStorage)
- 📖 Subject-wise book listing with chapter details
- 🔗 Open books directly from official NCERT PDFs
- ⬇️ Download full book PDFs
- 📱 Fully responsive design

## Tech Stack

- React 18
- Vite 5
- Firebase Hosting (deployment)

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deploy to Firebase

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize project (if not already):
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to: `dist`
   - Configure as single-page app: **Yes**

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

Your site will be live at `https://your-project.web.app`

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Main app with view routing
├── index.css             # Global styles + theme variables
├── context/
│   ├── ThemeContext.jsx  # Dark/light theme provider
│   └── LanguageContext.jsx # Language provider (EN/HI)
├── data/
│   └── books.js          # All NCERT book data (classes 9-12)
└── components/
    ├── Header.jsx        # Top bar with toggles
    ├── Home.jsx          # Class selection grid
    ├── ClassView.jsx     # Subject selection grid
    ├── SubjectView.jsx   # Book list with Open/Download
    └── BookView.jsx      # Chapter list
```
