# Loom Demo Script - MGNREGA Dashboard

## Duration: 2 minutes (120 seconds)

---

## SEGMENT 1: Introduction & Problem (0:00 - 0:20)

### What to Say:
"Hii everyone! I'm building 'Our Voice, Our Rights' - a dashboard that makes MGNREGA district performance data accessible to rural Indians. Currently, 12+ crore people benefit from this program, but the government's API data is technical and hard to understand."

### What to Show:
- Your GitHub repository
- Project README.md briefly

---

## SEGMENT 2: Demonstrate the Solution (0:20 - 1:00)

### What to Say:
"I built this with **low-literacy users in mind** - large visuals, colors, and simple language."

### What to Show:

**Part A: Search & Select District (0:20 - 0:35)**
- Open your hosted website (or localhost if not deployed yet)
- Show district search: "Search your district"
- Click "Use my location" button
- Show it auto-detects location (reverse geocoding feature)
- Select a district (e.g., "Mumbai")

**Part B: Overview Tab - Low-Literacy Features (0:35 - 0:45)**
- Show the 3 large metric cards with emojis:
  - 👷‍♂️ People Who Got Work: 1,50,000
  - 📅 Work Days Per Family: 85.3 days
  - 💰 Fast Payments: 78% 🟢
- Point out the visual indicators: 🟢 Green, 🟡 Yellow, 🔴 Red
- **Toggle language** to Hindi - show bilingual support
- Click speaker icon - demonstrate text-to-speech

**Part C: Trends Tab (0:45 - 0:50)**
- Click "📈 Trends" tab
- Show the 12-month line chart
- Point out trend arrows (up/down)
- Say: "You can see if your district's performance is improving or declining"

**Part D: Compare Tab (0:50 - 1:00)**
- Click "📊 Compare" tab
- Show month-over-month comparison
- Point out percentage changes (e.g., "+12.5% improvement in payments")
- Show the visual before/after comparison cards

---

## SEGMENT 3: Backend Architecture (1:00 - 1:40)

### What to Say:
"This is **production-ready** with proper security, caching, and automation."

### What to Show:

**Part A: Backend API (1:00 - 1:15)**
- Open your code editor → `backend/controllers/districtController.js`
- Show the 3 main API endpoints:
  ```javascript
  // Line 15: getDistrictSummary - Latest data
  // Line 51: getDistrictHistory - 12 months trends  
  // Line 84: getDistrictComparison - Month-over-month
  ```
- Point out: "These endpoints serve cached data - so the app works even if government API is down"

**Part B: Database & Caching (1:15 - 1:25)**
- Show pgAdmin or your database viewer
- Open `mgnrega_monthly` table
- Show the data: "We cache government API data locally in PostgreSQL"
- Point out: `district_code`, `year`, `month`, `total_individuals_worked`, etc.
- Say: "This ensures 99.9% uptime and fast response times"

**Part C: Automation (1:25 - 1:40)**
- Show `.github/workflows/ingest-cron.yml`
- Explain: "GitHub Actions automatically fetches new data monthly"
- Show the cron schedule: `"0 2 1 * *"` - runs 1st of every month
- **KEY POINT**: "No manual intervention needed - fully automated"

---

## SEGMENT 4: Production Readiness (1:40 - 2:00)

### What to Say:
"I designed this for **millions of users** with proper security and performance."

### What to Show:

**Part A: Security (1:40 - 1:50)**
- Open `backend/server.js`
- Point out:
  - `helmet()` - Security headers
  - `rateLimit()` - 100 requests per 15 minutes
  - `compression()` - Gzip compression
  - `cors()` - Cross-origin protection

**Part B: Frontend Components (1:50 - 2:00)**
- Open `frontend/src/components/SummaryTiles.jsx`
- Show the visual indicator logic:
  ```javascript
  const paymentIcon = paymentValue >= 80 ? "🟢" : ...
  ```
- Say: "Color-coded indicators help users understand at a glance"
- Open `frontend/src/components/TrendChart.jsx` - show Recharts integration
- Say: "Interactive charts for those who want detailed trends"

**Closing Statement (2:00)**
"This dashboard makes government data accessible to everyone - regardless of literacy level or technical knowledge. Thank you!"

---

## KEY HIGHLIGHTS TO EMPHASIZE:

✅ **Low-Literacy Design**: 
- Visual indicators (🟢🟡🔴) over text
- Large touch targets
- Simplified language
- Bilingual support
- Voice narration

✅ **Production-Ready**:
- Caching strategy (local PostgreSQL)
- Automation (GitHub Actions)
- Security (Helmet, rate limiting)
- Performance (compression, optimized queries)
- Error handling

✅ **Bonus Feature**:
- Auto-detection via GPS location
- Reverse geocoding to identify district
- Fallback to manual selection

---

## TIPS FOR RECORDING:

1. **Practice once** before recording
2. **Use browser zoom** (150%) - easier to read code
3. **Full-screen** - Alt+F11 for browser, F11 for terminal
4. **Clear audio** - use a microphone or headset
5. **Show, don't tell** - demonstrate features rather than just explaining
6. **Keep it at 2:00** - stay concise
7. **Test screen recording** - ensure screen capture is working
8. **Speak clearly** - enunciate well for clarity
9. **Use cursor** - highlight what you're talking about
10. **End with hosted URL** - show where people can access it

---

## FILES TO HAVE OPEN:

1. Your hosted website (or localhost:5173)
2. VS Code with:
   - `backend/controllers/districtController.js`
   - `backend/server.js`
   - `frontend/src/components/SummaryTiles.jsx`
   - `.github/workflows/ingest-cron.yml`
3. pgAdmin or database viewer with `mgnrega_monthly` table
4. GitHub repository (for showing automation)

---

## DEMO FLOW SUMMARY:

```
0:00 → Problem statement
0:20 → Working dashboard (search, select, overview)
0:35 → Low-literacy features (visual indicators, voice)
0:45 → Trends tab (chart)
0:50 → Compare tab (monthly changes)
1:00 → Backend code (API endpoints)
1:15 → Database (cached data)
1:25 → Automation (GitHub Actions)
1:40 → Security & performance
1:50 → Frontend components
2:00 → Closing
```

**Good luck with your submission! 🚀**

