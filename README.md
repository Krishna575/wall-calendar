# 📅 Interactive Wall Calendar Component

A polished, interactive **wall calendar UI** built with Next.js, inspired by a physical wall calendar layout. This project demonstrates strong frontend engineering skills including component architecture, state management, responsiveness, and UX design.

---

## 🎯 Project Overview

This application replicates the **look and feel of a real wall calendar**, combining a hero image with an interactive date grid and a notes section.

Users can:
- Select a **date range**
- Add **notes for the month or selected dates**
- Navigate across months
- Experience a smooth and responsive UI

---

## ✨ Features

### 🗓 Calendar UI
- Realistic **wall calendar aesthetic**
- Hero image synchronized with month view
- Clean layout with strong visual hierarchy

### 📅 Date Range Selection
- Select **start and end dates**
- Automatic highlighting of:
  - Start date
  - End date
  - Intermediate range
- Smart reset on new selection

### 📝 Notes System
- Add notes for:
  - Entire month
  - Selected date range
- Persistent storage using `localStorage`

### 📱 Responsive Design
- Desktop → Split layout (image + calendar + notes)
- Mobile → Fully stacked layout
- Touch-friendly interactions

### 🎨 UI/UX Enhancements
- Smooth animations using **Framer Motion**
- Hover and selection feedback
- Highlight for **current day**
- Clean typography and spacing

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Date Handling:** date-fns
- **State Management:** React Hooks
- **Persistence:** localStorage

---

## 🧱 Architecture

The project follows a **modular component-based architecture**:

### Key Design Decisions
- Separation of UI and logic using custom hooks
- Reusable components for scalability
- Utility-based date handling for clarity and maintainability

---

## ⚙️ How It Works

### Date Range Logic
- First click → Start date  
- Second click → End date  
- Third click → Reset selection  

### State Handling
- `useDateRange` → manages selection logic  
- `useLocalStorage` → persists notes and state  

### Rendering
- Calendar grid dynamically generated per month  
- Conditional styling for range highlighting  

---

## 🚀 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
npm run dev
http://localhost:3000
