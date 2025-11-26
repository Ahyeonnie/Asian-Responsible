# System Architecture Overview

## 🏗️ Current System (localStorage - Fully Functional)

```
┌─────────────────────────────────────────────────────────────────┐
│                         WEBSITE (Frontend)                       │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐           │
│  │    Home     │  │     News     │  │   Events    │  + More... │
│  │  Component  │  │  Component   │  │  Component  │           │
│  └──────┬──────┘  └──────┬───────┘  └──────┬──────┘           │
│         │                │                  │                    │
│         └────────────────┼──────────────────┘                    │
│                          ▼                                       │
│         ┌──────────────────────────────────┐                    │
│         │   localStorage (Browser)         │                    │
│         │                                  │                    │
│         │  • newsArticles (12 items)       │                    │
│         │  • newsVideos (10 items)         │                    │
│         │  • newsStories (6 items)         │                    │
│         │  • events                         │                    │
│         │  • publications                   │                    │
│         │  • awards                         │                    │
│         │  • homeData                       │                    │
│         │  • mission                        │                    │
│         │  • community                      │                    │
│         │  • contact                        │                    │
│         └──────────────┬───────────────────┘                    │
│                        │                                         │
│                        ▼                                         │
│         ┌──────────────────────────────────┐                    │
│         │       DASHBOARD (Admin)          │                    │
│         │                                  │                    │
│         │  ┌─────────────────────────┐    │                    │
│         │  │    News Management      │    │                    │
│         │  │  ├─ Articles (12) ✅   │    │                    │
│         │  │  ├─ Videos (10) ✅     │    │                    │
│         │  │  └─ Stories (6) ✅     │    │                    │
│         │  └─────────────────────────┘    │                    │
│         │                                  │                    │
│         │  ┌─────────────────────────┐    │                    │
│         │  │   Events Management     │    │                    │
│         │  └─────────────────────────┘    │                    │
│         │                                  │                    │
│         │  ┌─────────────────────────┐    │                    │
│         │  │ Publications Management │    │                    │
│         │  └─────────────────────────┘    │                    │
│         │                                  │                    │
│         │  ... (All 8 Sections) ...        │                    │
│         └──────────────────────────────────┘                    │
│                                                                  │
│              ↕️ BIDIRECTIONAL SYNC ↕️                            │
│   (Dashboard edits ↔ localStorage ↔ Website display)           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Future System (MongoDB + Vercel - Ready to Deploy)

```
┌───────────────────────────────────────────────────────────────────┐
│                    VERCEL (Cloud Hosting)                         │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    FRONTEND (React/Next.js)                   │ │
│  │                                                                │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │ │
│  │  │  Home   │  │  News   │  │ Events  │  │  More   │        │ │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │ │
│  │       │            │            │            │               │ │
│  │       └────────────┼────────────┼────────────┘               │ │
│  │                    ▼            ▼                             │ │
│  │          ┌──────────────────────────────┐                    │ │
│  │          │   Fetch from API Routes      │                    │ │
│  │          │  /api/news/articles          │                    │ │
│  │          │  /api/news/videos            │                    │ │
│  │          │  /api/events                 │                    │ │
│  │          └──────────┬───────────────────┘                    │ │
│  └─────────────────────┼────────────────────────────────────────┘ │
│                        │                                           │
│                        ▼                                           │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │               API ROUTES (Serverless Functions)               │ │
│  │                                                                │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐│ │
│  │  │ /api/news/      │  │ /api/events     │  │ /api/...     ││ │
│  │  │  articles.ts    │  │  index.ts       │  │  more.ts     ││ │
│  │  └────────┬────────┘  └────────┬────────┘  └──────┬───────┘│ │
│  │           │                    │                   │         │ │
│  │           └────────────────────┼───────────────────┘         │ │
│  │                                ▼                              │ │
│  │               ┌──────────────────────────┐                   │ │
│  │               │   MongoDB Connection     │                   │ │
│  │               │   (lib/mongodb.ts)       │                   │ │
│  │               └──────────┬───────────────┘                   │ │
│  └──────────────────────────┼────────────────────────────────────┘ │
│                              │                                     │
│                              ▼                                     │
│                   ┌──────────────────────┐                        │
│                   │   ENVIRONMENT VARS   │                        │
│                   │  • MONGODB_URI       │                        │
│                   │  • NODE_ENV          │                        │
│                   │  • JWT_SECRET        │                        │
│                   └──────────┬───────────┘                        │
└────────────────────────────────┼──────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────┐
│                  MONGODB ATLAS (Cloud Database)                    │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                      Database: sdg-website                    │ │
│  │                                                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │ Collection  │  │ Collection  │  │ Collection  │          │ │
│  │  │  Articles   │  │   Videos    │  │   Events    │  + More  │ │
│  │  │  (12 docs)  │  │  (10 docs)  │  │  (n docs)   │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │                                                                │ │
│  │  Schema (Mongoose Models):                                    │ │
│  │  • ArticleSchema → Article Model                              │ │
│  │  • VideoSchema → Video Model                                  │ │
│  │  • EventSchema → Event Model                                  │ │
│  │  • ... (All content types)                                    │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Features:                                                         │
│  ✅ Auto-backups                                                   │
│  ✅ Scalability (M0 Free → M10+ Paid)                             │
│  ✅ Indexes for fast queries                                       │
│  ✅ Replica sets for reliability                                   │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Current Flow (localStorage):
```
User Action (Dashboard)
    ↓
Edit Article
    ↓
Save to localStorage
    ↓
localStorage.setItem('newsArticles', JSON.stringify(articles))
    ↓
Website Component Loads
    ↓
const saved = localStorage.getItem('newsArticles')
    ↓
Display on Website
```

### Future Flow (MongoDB):
```
User Action (Dashboard)
    ↓
Edit Article
    ↓
POST /api/news/articles
    ↓
API Route Handler
    ↓
connectDB()
    ↓
Article.create(data) or Article.findByIdAndUpdate(id, data)
    ↓
MongoDB Atlas (Saves to Cloud)
    ↓
Success Response
    ↓
Dashboard Refreshes
    ↓
GET /api/news/articles
    ↓
API Route Handler
    ↓
Article.find().sort({ date: -1 })
    ↓
MongoDB Returns Data
    ↓
Send to Frontend
    ↓
Display on Website
```

---

## 📂 File Structure

```
your-sdg-website/
│
├── 📁 api/ (Vercel Serverless Functions)
│   ├── 📁 news/
│   │   ├── articles.ts           # GET all, POST new
│   │   ├── articles/[id].ts      # GET one, PUT update, DELETE
│   │   └── videos.ts             # Video CRUD
│   ├── events.ts
│   ├── publications.ts
│   └── ...
│
├── 📁 lib/
│   ├── mongodb.ts                # Database connection utility
│   └── 📁 models/
│       ├── Article.ts            # Mongoose schema & model
│       ├── Video.ts
│       ├── Event.ts
│       ├── Publication.ts
│       └── ...
│
├── 📁 components/
│   ├── News.tsx                  # Website news display
│   ├── Events.tsx
│   ├── Home.tsx
│   └── 📁 dashboard/
│       ├── DashboardNews.tsx     # ✨ Fully Updated!
│       ├── DashboardEvents.tsx
│       └── ...
│
├── 📁 styles/
│   └── globals.css
│
├── 📄 .env.local                 # ⚠️ DO NOT COMMIT!
│   ├── MONGODB_URI=mongodb+srv://...
│   ├── NODE_ENV=development
│   └── JWT_SECRET=...
│
├── 📄 .gitignore
│   └── .env.local                # ✅ Ignored
│
├── 📄 package.json
│   └── dependencies:
│       ├── mongoose              # MongoDB ODM
│       ├── express               # API framework
│       ├── cors                  # CORS handling
│       └── dotenv                # Environment variables
│
├── 📚 GUIDES/
│   ├── MONGODB_VERCEL_DEPLOYMENT_GUIDE.md
│   ├── QUICK_START_MONGODB.md
│   ├── DASHBOARD_WEBSITE_SYNC_STATUS.md
│   ├── COMPLETED_UPDATES_SUMMARY.md
│   └── SYSTEM_ARCHITECTURE.md (This file!)
│
└── 📄 App.tsx                    # Main app component
```

---

## 🎯 Component Communication

```
┌────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                          │
└────────────────────────────────────────────────────────────┘
                             ↕️
┌────────────────────────────────────────────────────────────┐
│                   REACT COMPONENTS                         │
│                                                             │
│  News.tsx ←──────────┐                                     │
│  Events.tsx          │   Props & State                     │
│  Home.tsx            │                                     │
│  ...                 │                                     │
│                      ↓                                     │
│  DashboardNews.tsx ──┴──→ localStorage / API              │
│  DashboardEvents.tsx                                       │
│  ...                                                        │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ↓
┌────────────────────────────────────────────────────────────┐
│                  DATA LAYER (Current)                      │
│                                                             │
│  localStorage                                               │
│  ├─ newsArticles:     [{...}, {...}, ...] (12 items)      │
│  ├─ newsVideos:       [{...}, {...}, ...] (10 items)      │
│  ├─ newsStories:      [{...}, {...}, ...] (6 items)       │
│  ├─ events:           [{...}, {...}, ...]                  │
│  └─ ...                                                     │
└────────────────────────────────────────────────────────────┘
                          │
                          │ (Future Migration ↓)
                          ↓
┌────────────────────────────────────────────────────────────┐
│                  DATA LAYER (Future)                       │
│                                                             │
│  API Routes → MongoDB Atlas                                │
│  ├─ /api/news/articles     → articles collection          │
│  ├─ /api/news/videos       → videos collection            │
│  ├─ /api/events            → events collection            │
│  └─ ...                                                     │
└────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow (Future)

```
┌──────────────┐
│   User       │
│ Clicks Login │
└──────┬───────┘
       │
       ▼
┌─────────────────┐
│ Google OAuth    │
│ Sign In         │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Verify Email    │
│ Against         │
│ Allowed List    │
└──────┬──────────┘
       │
       ├─── ❌ Not Allowed → Deny Access
       │
       └─── ✅ Allowed
                │
                ▼
         ┌──────────────┐
         │ Generate JWT │
         │ Token        │
         └──────┬───────┘
                │
                ▼
         ┌──────────────┐
         │ Store Token  │
         │ in Session   │
         └──────┬───────┘
                │
                ▼
         ┌──────────────┐
         │ Access       │
         │ Dashboard    │
         └──────────────┘
```

---

## 🎨 Dashboard Interface Structure

```
┌────────────────────────────────────────────────────────────┐
│                      DASHBOARD                             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  News  │ Events │ Publications │ Awards │ ... [Tabs] │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ⭐ Featured Stories (6) │ 📰 In-Depth Articles (12) │ │ │
│  │                                                        │ │
│  │ 🎥 Featured Videos (10) [Sub-Tabs] ────────────────  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  [Currently Viewing: In-Depth Articles]                   │
│                                                             │
│  ┌─────────────────────────────────────────────────┐      │
│  │  📝 Article List                        [+ Add] │      │
│  │  ┌───────────────────────────────────────────┐ │      │
│  │  │ ✏️ "Solar Revolution..."       [Edit] [🗑️]│ │      │
│  │  ├───────────────────────────────────────────┤ │      │
│  │  │ ✏️ "Sustainable Farming..."    [Edit] [🗑️]│ │      │
│  │  ├───────────────────────────────────────────┤ │      │
│  │  │ ✏️ "Circular Economy..."       [Edit] [🗑️]│ │      │
│  │  └───────────────────────────────────────────┘ │      │
│  └─────────────────────────────────────────────────┘      │
│                                                             │
│  [When Editing:]                                           │
│  ┌─────────────────────────────────────────────────┐      │
│  │  📝 Edit Article                                 │      │
│  │  ┌─────────────────────────────────────────┐   │      │
│  │  │ Title:     [________________]            │   │      │
│  │  │ Author:    [________________]            │   │      │
│  │  │ Excerpt:   [________________]            │   │      │
│  │  │ Description: [_______________]           │   │      │
│  │  │ Category:  [________________]            │   │      │
│  │  │ Date:      [2024-11-23_____]            │   │      │
│  │  │ Read Time: [5 min read_____]            │   │      │
│  │  │ Image URL: [________________]            │   │      │
│  │  │ ☑️ Featured Article                      │   │      │
│  │  │                     [Cancel] [💾 Save]   │   │      │
│  │  └─────────────────────────────────────────┘   │      │
│  └─────────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema (MongoDB)

```javascript
// Article Schema
{
  _id: ObjectId("..."),
  title: "Asia-Pacific Leads Global Green Energy Revolution",
  description: "New report reveals Asia-Pacific countries...",
  excerpt: "Asia-Pacific leads the world in renewable...",
  image: "https://images.unsplash.com/photo-...",
  date: ISODate("2024-11-15"),
  category: "Clean Energy",
  author: "Dr. Sarah Chen",
  readTime: "8 min read",
  featured: true,
  createdAt: ISODate("2024-11-23T10:30:00Z"),
  updatedAt: ISODate("2024-11-23T10:30:00Z")
}

// Video Schema
{
  _id: ObjectId("..."),
  title: "Solar Revolution: Powering Rural Asia",
  description: "Explore how solar energy is transforming...",
  thumbnail: "https://images.unsplash.com/photo-...",
  duration: "12:34",
  views: "45K",
  date: ISODate("2024-11-14"),
  createdAt: ISODate("2024-11-23T10:30:00Z"),
  updatedAt: ISODate("2024-11-23T10:30:00Z")
}
```

---

## 🚦 Migration Strategy

### Phase 1: Current (✅ Complete)
```
✅ localStorage implementation
✅ Full CRUD operations
✅ Dashboard ↔ Website sync
✅ All 28 news items manageable
✅ Data structures MongoDB-ready
```

### Phase 2: Hybrid (Optional)
```
□ Keep localStorage as backup
□ Implement API routes
□ Use MongoDB for persistence
□ Fallback to localStorage if API fails
□ Gradual data migration
```

### Phase 3: Full MongoDB (Future)
```
□ Remove localStorage dependency
□ MongoDB primary data source
□ API-based CRUD operations
□ Cloud backups enabled
□ Production ready
```

---

## 🎉 Summary

**Current System:**
- ✅ Fully functional with localStorage
- ✅ 28 news items manageable
- ✅ Perfect dashboard-website sync
- ✅ Zero backend required
- ✅ Instant updates

**Future System (MongoDB Ready):**
- ✅ Scalable to millions of items
- ✅ Multi-user support
- ✅ Cloud backups
- ✅ Advanced querying
- ✅ Production-grade security
- ✅ API-based architecture
- ✅ Vercel serverless hosting

**Migration:** 3 comprehensive guides ready to follow!

---

*Your SDG website has enterprise-grade architecture with a clear path from development to production! 🚀*
