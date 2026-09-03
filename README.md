# ⚖️ LawTrack

**A clearer way to know your rights.**

LawTrack turns dense, confusing legal information into a personal briefing — built around your age and where you live. No account required to start; sign up when you want it to remember you.

### LawTrack homepage

![LawTrack homepage](<Screenshot 2026-09-03 at 2.20.53 PM.png>)



---

## 🧩 The Problem

Laws differ by age and by location, but almost nobody actually knows what applies to them. Can a 17-year-old sign a lease in their state? What changed in family law this month, and does it affect you? Legal databases exist, but they're written for lawyers — dense, unindexed, and impossible to skim under a deadline.

LawTrack closes that gap: tell it your age and location, and it builds a running brief of the laws, deadlines, and cases that actually apply to your life — in plain language, with sources.

---

## ✨ What LawTrack Does

- **📋 Personalized legal briefing** — LawTrack builds a jurisdiction-specific brief (e.g. *"Arizona housing & family law"*) summarizing the laws and deadlines that matter to you right now, each backed by an **evidence confidence score** and verified sources.
- **⏰ Deadline tracking** — Upcoming dates that affect you — like a lease review — surface automatically as "Next up" reminders, so nothing important slips by.
- **🤖 AI Legal Assistant** — Ask follow-up questions in plain English and get clear, conversational explanations instead of dense legal text. *(in progress)*
- **📰 Live Case Tracker** — A running list of major current court cases, surfaced by relevance to your age group and region. *(in progress)*
- **👤 Full account sign-up** — Create a profile with your name, birthday, city, and username so your brief and case feed stay personalized across visits.
- **🕶️ Incognito Mode** — Explore LawTrack anonymously from the homepage with a single click — same clarity, no account required.
- **🔒 Trust built in** — Every brief is labeled "General information only — never legal advice," and account creation includes real password-strength enforcement.

### Sign-up flow

![Sign-up flow](<Screenshot 2026-09-03 at 2.21.33 PM.png>)

---

## 🏗️ How It Works

1. **Land on your brief** — the homepage immediately shows a live example: a jurisdiction-specific card with confidence-scored, sourced legal information.
2. **Choose your path** — sign up with your name, birthday, and city to get a saved, personalized experience, or hit **Try Incognito** to explore anonymously first.
3. **Get your personalized feed** — LawTrack surfaces the laws, deadlines, and (soon) court cases most relevant to your profile.
4. **Ask the AI Assistant** *(in progress)* — get instant, plain-language answers to specific legal questions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Build tool | Vite |
| Linting | ESLint |
| AI Assistant | *TBD — LLM API integration in progress* |
| Data | Local/mock data (backend & live legal data source planned) |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/scarv347/LawTracker.git
cd LawTracker

# Install dependencies
npm install

# Run the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
npm run build      # Type-check and build for production
npm run lint        # Run ESLint
npm run preview     # Preview the production build locally
```



## 👥 Team

> Sarvesh Sathish, Scott Carver, Anand Prasad, Daksh Kalra, Yogansh Chandaluri

---

