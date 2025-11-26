# Quick Start: MongoDB + Vercel Deployment

**Get your SDG website live with MongoDB in under 30 minutes!**

---

## ⚡ Fast Track Steps

### 1️⃣ MongoDB Atlas (5 minutes)
```
1. Go to mongodb.com/cloud/atlas
2. Sign up (free)
3. Create M0 FREE cluster
4. Create database user:
   - Username: sdg_admin
   - Password: [save this!]
5. Allow all IPs (0.0.0.0/0)
6. Get connection string:
   mongodb+srv://sdg_admin:PASSWORD@cluster0.xxxxx.mongodb.net/
7. Copy and save it!
```

### 2️⃣ VS Code Setup (5 minutes)
```bash
# Install dependencies
npm install mongoose express cors dotenv
npm install mongodb @types/express @types/cors --save-dev

# Create .env.local file
echo "MONGODB_URI=your-connection-string-here" > .env.local
echo "NODE_ENV=development" >> .env.local

# Add to .gitignore
echo ".env.local" >> .gitignore
```

### 3️⃣ Add MongoDB Code (10 minutes)

**Create `lib/mongodb.ts`**:
```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => {
      console.log('✅ MongoDB connected');
      return m;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
```

**Create `lib/models/Article.ts`**:
```typescript
import mongoose, { Schema } from 'mongoose';

const ArticleSchema = new Schema({
  title: String,
  description: String,
  excerpt: String,
  image: String,
  date: Date,
  category: String,
  author: String,
  readTime: String,
  featured: Boolean,
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
```

**Create `api/news/articles.ts`**:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../../lib/mongodb';
import Article from '../../lib/models/Article';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const articles = await Article.find().sort({ date: -1 });
    return res.json({ success: true, articles });
  }

  if (req.method === 'POST') {
    const article = await Article.create(req.body);
    return res.json({ success: true, article });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
```

### 4️⃣ Test Locally (2 minutes)
```bash
# Start dev server
npm run dev

# Test API (in browser or Postman)
# GET http://localhost:3000/api/news/articles
```

### 5️⃣ Deploy to Vercel (5 minutes)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables:
# 1. Go to vercel.com → your project → Settings
# 2. Environment Variables → Add:
#    MONGODB_URI = your-connection-string
#    NODE_ENV = production
# 3. Redeploy:
vercel --prod
```

### 6️⃣ Verify (2 minutes)
```
1. Visit your-app.vercel.app/api/news/articles
2. Should see: {"success":true,"articles":[]}
3. ✅ Working!
```

---

## 🔄 Update Frontend to Use API

**In `components/dashboard/DashboardNews.tsx`**:

Replace this:
```typescript
const loadArticles = () => {
  const saved = localStorage.getItem('newsArticles');
  if (saved) setArticles(JSON.parse(saved));
};
```

With this:
```typescript
const loadArticles = async () => {
  try {
    const res = await fetch('/api/news/articles');
    const data = await res.json();
    if (data.success) {
      setArticles(data.articles);
      localStorage.setItem('newsArticles', JSON.stringify(data.articles));
    }
  } catch (error) {
    // Fallback to localStorage
    const saved = localStorage.getItem('newsArticles');
    if (saved) setArticles(JSON.parse(saved));
  }
};
```

Replace this:
```typescript
const saveArticles = (articles) => {
  localStorage.setItem('newsArticles', JSON.stringify(articles));
  setArticles(articles);
};
```

With this:
```typescript
const saveArticles = async (article) => {
  try {
    const res = await fetch('/api/news/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
    const data = await res.json();
    if (data.success) {
      await loadArticles(); // Refresh
      toast.success('Article saved!');
    }
  } catch (error) {
    // Fallback to localStorage
    const saved = JSON.parse(localStorage.getItem('newsArticles') || '[]');
    localStorage.setItem('newsArticles', JSON.stringify([...saved, article]));
    toast.error('Saved offline - will sync later');
  }
};
```

---

## 📦 Complete File Structure

```
your-project/
├── api/
│   └── news/
│       ├── articles.ts          ← API endpoints
│       └── videos.ts
├── lib/
│   ├── mongodb.ts               ← DB connection
│   └── models/
│       ├── Article.ts           ← Data schemas
│       └── Video.ts
├── components/
│   ├── News.tsx                 ← Website display
│   └── dashboard/
│       └── DashboardNews.tsx    ← Admin editor
├── .env.local                   ← Local config (DO NOT COMMIT!)
├── .gitignore                   ← Add .env.local here
└── package.json
```

---

## 🆘 Quick Troubleshooting

### MongoDB Won't Connect
```bash
# Check .env.local exists and has correct string
cat .env.local

# Test connection:
npx ts-node -e "
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('✅ Connected!'))
  .catch((e) => console.error('❌ Error:', e));
"
```

### Vercel Build Fails
```bash
# Check locally first
npm run build

# If works locally, check Vercel environment variables:
# vercel.com → Project → Settings → Environment Variables
```

### API Returns 404
```
Check file is at: /api/news/articles.ts (not .tsx)
Must export: export default async function handler(...)
```

---

## 🎯 Migration Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string saved
- [ ] `mongoose` installed
- [ ] `.env.local` created
- [ ] `lib/mongodb.ts` created
- [ ] Models created (`lib/models/`)
- [ ] API routes created (`api/`)
- [ ] Tested locally
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables added in Vercel
- [ ] API working on production
- [ ] Frontend updated to use API
- [ ] Tested create/edit/delete
- [ ] ✅ Done!

---

## 📚 Full Guides

- **Detailed Guide**: See `/MONGODB_VERCEL_DEPLOYMENT_GUIDE.md`
- **Sync Status**: See `/DASHBOARD_WEBSITE_SYNC_STATUS.md`

---

## 💬 Need Help?

Common issues:
1. **"Cannot find module mongoose"** → Run `npm install mongoose`
2. **"MONGODB_URI is not defined"** → Create `.env.local` file
3. **"Network error"** → Check MongoDB IP whitelist (allow 0.0.0.0/0)
4. **"404 on /api/..."** → Check file location and export
5. **Vercel build fails** → Check `npm run build` works locally first

---

**You're ready to go live with MongoDB! 🚀**

Remember:
- Development = localStorage (instant, offline)
- Production = MongoDB (persistent, scalable)
- Hybrid approach = Both (API with localStorage fallback)

Choose what works best for your needs!
