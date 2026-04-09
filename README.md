# 📅 Interactive Wall Calendar Component

A polished, interactive **wall calendar UI** built with Next.js, inspired by a physical wall calendar layout. This project demonstrates strong frontend engineering skills including component architecture, state management, responsiveness, and UX design.

---

## 🎯 Project Overview

This application replicates the **look and feel of a real wall calendar**, combining a hero image with an interactive date grid and a notes section.

Users can:

* Select a **date range**
* Add **notes for the month or selected dates**
* Navigate across months
* Experience a smooth and responsive UI

---

## ✨ Features

### 🗓 Calendar UI

* Realistic **wall calendar aesthetic**
* Hero image synchronized with month view
* Clean layout with strong visual hierarchy

### 📅 Date Range Selection

* Select **start and end dates**
* Automatic highlighting of:

  * Start date
  * End date
  * Intermediate range
* Smart reset on new selection

### 📝 Notes System

* Add notes for:

  * Entire month
  * Selected date range
* Persistent storage using `localStorage`

### 📱 Responsive Design

* Desktop → Split layout (image + calendar + notes)
* Mobile → Fully stacked layout
* Touch-friendly interactions

### 🎨 UI/UX Enhancements

* Smooth animations using **Framer Motion**
* Hover and selection feedback
* Highlight for **current day**

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Date Handling:** date-fns
* **State Management:** React Hooks
* **Persistence:** localStorage

---

## 📦 How to Run This Project (Step-by-Step)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Krishna575/wall-calendar.git
cd wall-calendar
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Run the Development Server

```bash
npm run dev
```

---

### 4️⃣ Open in Browser

```bash
http://localhost:3000
```

---

## 📱 How to Open on Mobile

You can also test this project on your mobile device:

### Step 1: Ensure project is running on laptop

```bash
npm run dev
```

### Step 2: Find your system IP address

```bash
ipconfig
```

Look for:

```
IPv4 Address: 192.168.x.x
```

### Step 3: Open on mobile browser

```
http://YOUR-IP:3000
```

Example:

```
http://192.168.1.5:3000
```

⚠️ Make sure:

* Mobile and laptop are on same WiFi
* Server is running

---

## 🧱 Architecture

```
app/
  page.tsx

components/
  Calendar.tsx
  CalendarGrid.tsx
  CalendarHeader.tsx
  DateRangePicker.tsx
  NotesPanel.tsx
  HeroImage.tsx

hooks/
  useDateRange.ts
  useLocalStorage.ts

utils/
  calendar.ts
```

---

## ⚙️ How It Works

### Date Selection Logic

* First click → Start date
* Second click → End date
* Third click → Reset

### Notes Storage

* Uses browser `localStorage`
* Data persists even after refresh

---


## 💡 Key Highlights

* Clean and scalable architecture
* Real-world UI implementation
* Fully responsive design
* Smooth user experience

---

## 👨‍💻 Author

**Krishnakumar**
GitHub: https://github.com/Krishna575

---

## 🚀 Future Improvements

* Theme switching
* Drag-to-select dates
* Event/holiday markers
* Dark mode
