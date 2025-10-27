# Quick Demo Guide - Screen Recording Checklist

## 🎬 Before You Start Recording

### Checklist:
- [ ] Hosted website is live (or localhost running)
- [ ] Sample data imported into database
- [ ] VS Code open with code files ready
- [ ] pgAdmin/database viewer open
- [ ] GitHub repo open in browser
- [ ] Microphone ready and tested
- [ ] Screen recording software ready (Windows key + G, or OBS)

---

## 📝 Exact Demo Flow (Follow This!)

### 0:00 - 0:15 (15 sec): Introduction
**Say:** "Hi! This is the MGNREGA dashboard - making government data accessible to 12 crore rural Indians."

**Show:** Your website homepage

---

### 0:15 - 0:35 (20 sec): User Experience
**Say:** "Notice the large visuals and simple language - designed for low-literacy users."

**Do:**
1. Click "Use my location" → show auto-detection
2. Select a district (search "Mumbai" or another)
3. Point to the 3 colorful metric cards
4. Toggle to Hindi language
5. Click the speaker icon on a metric

**Say:** "Visual indicators, bilingual support, and voice narration - anyone can use this."

---

### 0:35 - 0:50 (15 sec): Features Demo
**Do:**
1. Click "Trends" tab → show 12-month chart
2. Click "Compare" tab → show month-over-month comparison

**Say:** "Users can see historical trends and track if their district is improving."

---

### 0:50 - 1:15 (25 sec): Backend Code
**Open:** `backend/controllers/districtController.js`

**Point to:**
- Line 15: `getDistrictSummary()` - "Latest month data"
- Line 51: `getDistrictHistory()` - "12 months historical trends"
- Line 84: `getDistrictComparison()` - "Month-over-month comparisons"

**Say:** "These API endpoints serve cached data for fast responses."

---

### 1:15 - 1:35 (20 sec): Database & Automation
**Show:** pgAdmin or database → `mgnrega_monthly` table

**Point out:**
- Sample rows of data
- District codes, months, people worked, etc.

**Say:** "We cache government API data locally in PostgreSQL for reliability."

**Open:** `.github/workflows/ingest-cron.yml`

**Point to:** Line 5 - `cron: "0 2 1 * *"`

**Say:** "GitHub Actions automatically fetches new data monthly - fully automated, no manual work."

---

### 1:35 - 2:00 (25 sec): Production Features
**Open:** `backend/server.js`

**Point to:**
- Line 14: `compression()` - "Gzip compression for fast load times"
- Line 20: `rateLimit()` - "Rate limiting for security"
- Line 13: `helmet()` - "Security headers"

**Say:** "Production-ready with security, performance optimization, and scalability - designed for millions of users."

**End with your hosted URL**

---

## 🎯 Key Points to Say (Memorize These!)

1. **"Designed for low-literacy users"** - visual indicators, simple language
2. **"Bilingual support"** - English and Hindi
3. **"Auto-detection"** - GPS location finds your district
4. **"Production-ready"** - security, caching, automation
5. **"Works even when government API is down"** - local database caching
6. **"Fully automated"** - GitHub Actions fetches data monthly
7. **"Scalable for millions"** - rate limiting, compression, optimization

---

## 📁 Files to Keep Open:

1. **Hosted website** - Your live app
2. **VS Code** - With these files open:
   - `backend/controllers/districtController.js`
   - `backend/server.js`
   - `.github/workflows/ingest-cron.yml`
3. **Database viewer** - Show `mgnrega_monthly` table
4. **GitHub** - Show repository

---

## 💡 Pro Tips:

1. **Practice once** before recording
2. **Use Alt+Tab** to switch between windows quickly
3. **Zoom in** (Ctrl + Plus) for code visibility
4. **Speak clearly** - don't rush
5. **Show, don't tell** - demonstrate features
6. **Keep to 2 minutes** - be concise
7. **End strong** - close with your hosted URL

---

## 🎥 Sample Dialogue:

**[Show website]**
"This is the MGNREGA dashboard. Notice the large, colorful visuals - designed for low-literacy users."

**[Click location]**
"Users can detect their district automatically via GPS location."

**[Toggle Hindi]**
"Fully bilingual - Hindi and English support with text-to-speech."

**[Show Trends tab]**
"Historical trends show if performance is improving over 12 months."

**[Show Compare tab]**
"Month-over-month comparisons with percentage changes."

**[Show backend code]**
"On the backend, I built three API endpoints for summary, history, and comparisons. Data is cached locally in PostgreSQL."

**[Show database]**
"This ensures 99.9% uptime even when government API is down."

**[Show GitHub Actions]**
"Automated monthly data ingestion via GitHub Actions - no manual intervention."

**[Show server.js]**
"Production-ready with rate limiting, compression, and security headers."

"This is scalable for millions of users across India. Thank you!"

---

**Good luck! 🚀**

