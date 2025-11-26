# Complete MongoDB + Vercel Deployment Guide

This guide walks you through deploying your SDG website with MongoDB Atlas (cloud database) and Vercel (hosting platform) from scratch.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Local Development Setup](#local-development-setup)
4. [Backend API Development](#backend-api-development)
5. [Vercel Deployment](#vercel-deployment)
6. [Environment Variables](#environment-variables)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### What You Need:
- Node.js (v18 or later) installed
- Git installed
- VS Code (recommended code editor)
- MongoDB Atlas account (free tier available)
- Vercel account (free tier available)
- GitHub account

---

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" or "Sign Up"
3. Create account using:
   - Email and password, OR
   - Google account, OR
   - GitHub account

### Step 2: Create a New Cluster
1. After login, click "Build a Database"
2. Choose "M0 FREE" tier (512 MB storage, perfect for development)
3. Select cloud provider and region:
   - **Recommended**: AWS or Google Cloud
   - **Region**: Choose closest to your target audience (e.g., Singapore for Asia)
4. Cluster Name: Keep default or use `SDG-Website-Cluster`
5. Click "Create Cluster" (takes 3-7 minutes)

### Step 3: Configure Database Access
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `sdg_admin` (or your choice)
5. Password: Click "Autogenerate Secure Password" and **SAVE IT**
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Configure Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development:
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: In production, restrict to specific IPs
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js
5. Version: 5.5 or later
6. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace:
   - `<username>` with your database username
   - `<password>` with your database password
8. **SAVE THIS STRING SECURELY**

---

## Local Development Setup

### Step 1: Install Required VS Code Extensions
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
3. Install:
   - **MongoDB for VS Code** by MongoDB
   - **REST Client** by Huachao Mao (for API testing)
   - **ESLint** by Microsoft
   - **Prettier** by Prettier

### Step 2: Install Project Dependencies

```bash
# Navigate to your project folder
cd your-sdg-website

# Install mongoose for MongoDB
npm install mongoose

# Install additional backend dependencies
npm install express cors dotenv
npm install @types/express @types/cors --save-dev

# For API routes (if using Next.js API routes)
npm install mongodb
```

### Step 3: Create Environment File
Create `.env.local` in your project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://sdg_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sdg-website?retryWrites=true&w=majority

# App Configuration
NODE_ENV=development
PORT=3000

# Optional: JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: Google OAuth (if using)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**⚠️ IMPORTANT**: Add `.env.local` to your `.gitignore` file!

```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

---

## Backend API Development

### Project Structure
```
your-project/
├── api/                      # Vercel serverless functions
│   ├── news/
│   │   ├── articles.ts      # GET, POST articles
│   │   ├── [id].ts          # GET, PUT, DELETE specific article
│   │   └── videos.ts        # Video endpoints
│   ├── events.ts
│   ├── publications.ts
│   └── ...
├── lib/
│   ├── mongodb.ts           # MongoDB connection utility
│   └── models/              # Mongoose models
│       ├── Article.ts
│       ├── Video.ts
│       ├── Event.ts
│       └── ...
├── components/
├── .env.local
└── package.json
```

### Step 1: Create MongoDB Connection Utility

Create `lib/mongodb.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

### Step 2: Create Mongoose Models

Create `lib/models/Article.ts`:

```typescript
import mongoose, { Schema, Model } from 'mongoose';

export interface IArticle {
  title: string;
  description: string;
  excerpt: string;
  image: string;
  date: Date;
  category: string;
  author: string;
  readTime: string;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
```

Create `lib/models/Video.ts`:

```typescript
import mongoose, { Schema, Model } from 'mongoose';

export interface IVideo {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    views: { type: String, default: '0' },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;
```

### Step 3: Create API Routes (Vercel Serverless Functions)

Create `api/news/articles.ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../../lib/mongodb';
import Article from '../../lib/models/Article';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get all articles
      const articles = await Article.find().sort({ date: -1 });
      return res.status(200).json({ success: true, articles });
    }

    if (req.method === 'POST') {
      // Create new article
      const article = await Article.create(req.body);
      return res.status(201).json({ success: true, article });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
```

Create `api/news/articles/[id].ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../../../lib/mongodb';
import Article from '../../../lib/models/Article';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    await connectDB();
    const { id } = req.query;

    if (req.method === 'GET') {
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      return res.status(200).json({ success: true, article });
    }

    if (req.method === 'PUT') {
      const article = await Article.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      return res.status(200).json({ success: true, article });
    }

    if (req.method === 'DELETE') {
      const article = await Article.findByIdAndDelete(id);
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      return res.status(200).json({ success: true, message: 'Article deleted' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
```

### Step 4: Update Frontend to Use API

Update `components/dashboard/DashboardNews.tsx`:

```typescript
// Replace the fetchArticles function
const fetchArticles = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/news/articles');
    const data = await response.json();
    if (data.success) {
      setArticles(data.articles);
      // Also sync to localStorage as backup
      localStorage.setItem('newsArticles', JSON.stringify(data.articles));
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Fallback to localStorage
    const saved = localStorage.getItem('newsArticles');
    if (saved) setArticles(JSON.parse(saved));
    toast.error('Using offline data');
  } finally {
    setLoading(false);
  }
};

// Replace handleSaveArticle
const handleSaveArticle = async () => {
  if (!editingArticle) return;
  
  try {
    const isNew = editingArticle.id === 0;
    const url = isNew ? '/api/news/articles' : `/api/news/articles/${editingArticle.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingArticle),
    });

    const data = await response.json();
    if (data.success) {
      await fetchArticles(); // Refresh list
      toast.success(`Article ${isNew ? 'created' : 'updated'} successfully!`);
      setEditingArticle(null);
    } else {
      toast.error(data.error || 'Failed to save article');
    }
  } catch (error) {
    console.error('Error saving article:', error);
    toast.error('Failed to save article');
  }
};
```

---

## Vercel Deployment

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SDG Website with MongoDB"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Website
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In" (use GitHub account)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Detect automatically (or select React/Next.js)
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist` or `.next` (auto-detected)
6. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? sdg-website (or your choice)
# - Directory? ./ (default)
# - Override settings? No

# Deploy to production
vercel --prod
```

### Step 3: Add Environment Variables in Vercel
1. Go to your project in Vercel Dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add each variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Production, Preview, Development (check all)
5. Click "Save"
6. Repeat for all environment variables:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = your secret key
   - etc.

### Step 4: Redeploy with Environment Variables
```bash
# Trigger redeployment
vercel --prod

# Or in Vercel Dashboard: Deployments → ... menu → Redeploy
```

---

## Environment Variables

### Development (.env.local)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sdg-dev
NODE_ENV=development
```

### Production (Vercel)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sdg-prod
NODE_ENV=production
VERCEL_URL=your-app.vercel.app
```

### Security Best Practices
1. ✅ Never commit `.env` files
2. ✅ Use different databases for dev/prod
3. ✅ Rotate passwords regularly
4. ✅ Use strong JWT secrets (32+ characters)
5. ✅ Enable MongoDB IP whitelisting in production
6. ✅ Use HTTPS only (Vercel provides free SSL)

---

## Testing

### Test MongoDB Connection Locally
Create `scripts/testDB.ts`:

```typescript
import connectDB from '../lib/mongodb';
import Article from '../lib/models/Article';

async function testConnection() {
  try {
    await connectDB();
    console.log('✅ MongoDB connected successfully');

    // Test creating an article
    const testArticle = await Article.create({
      title: 'Test Article',
      description: 'This is a test',
      excerpt: 'Test excerpt',
      image: 'https://example.com/image.jpg',
      date: new Date(),
      category: 'Test',
      author: 'Test Author',
      readTime: '1 min read',
      featured: false,
    });

    console.log('✅ Test article created:', testArticle);

    // Clean up
    await Article.findByIdAndDelete(testArticle._id);
    console.log('✅ Test article deleted');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testConnection();
```

Run test:
```bash
npx ts-node scripts/testDB.ts
```

### Test API Endpoints

Install REST Client extension in VS Code, then create `tests/api.http`:

```http
### Get all articles
GET http://localhost:3000/api/news/articles

### Create article
POST http://localhost:3000/api/news/articles
Content-Type: application/json

{
  "title": "New Article",
  "description": "Article description",
  "excerpt": "Brief summary",
  "image": "https://example.com/image.jpg",
  "date": "2024-11-23",
  "category": "Clean Energy",
  "author": "John Doe",
  "readTime": "5 min read",
  "featured": false
}

### Update article (replace :id with actual ID)
PUT http://localhost:3000/api/news/articles/:id
Content-Type: application/json

{
  "title": "Updated Title"
}

### Delete article
DELETE http://localhost:3000/api/news/articles/:id
```

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Fails
**Error**: `MongooseServerSelectionError`

**Solutions**:
- ✅ Check connection string is correct
- ✅ Verify username/password (no special characters or URL-encode them)
- ✅ Check IP whitelist in MongoDB Atlas
- ✅ Ensure cluster is running (not paused)

#### 2. Vercel Build Fails
**Error**: `Module not found` or `Type error`

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check

# Rebuild locally first
npm run build
```

#### 3. Environment Variables Not Working
**Error**: `undefined` when accessing `process.env`

**Solutions**:
- ✅ Restart dev server after changing `.env.local`
- ✅ In Vercel: Settings → Environment Variables → Redeploy
- ✅ Ensure variables are prefixed correctly (`NEXT_PUBLIC_` for client-side)

#### 4. API Routes 404 on Vercel
**Solutions**:
- ✅ Check file structure matches `/api/...` pattern
- ✅ Use TypeScript `.ts` or JavaScript `.js` (not `.tsx`)
- ✅ Export `default` function from each API route
- ✅ Check Vercel deployment logs for build errors

#### 5. CORS Errors
**Solutions**:
Add to API routes:
```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

---

## Migration from localStorage to MongoDB

### Step-by-Step Migration

1. **Export Current Data**
   ```javascript
   // Run in browser console
   const data = {
     articles: JSON.parse(localStorage.getItem('newsArticles') || '[]'),
     videos: JSON.parse(localStorage.getItem('newsVideos') || '[]'),
     stories: JSON.parse(localStorage.getItem('newsStories') || '[]'),
     events: JSON.parse(localStorage.getItem('events') || '[]'),
     // ... export all sections
   };
   console.log(JSON.stringify(data, null, 2));
   // Copy output to file
   ```

2. **Create Seed Script**
   ```typescript
   // scripts/seedDB.ts
   import connectDB from '../lib/mongodb';
   import Article from '../lib/models/Article';
   import data from './exported-data.json';

   async function seed() {
     await connectDB();
     
     // Clear existing data
     await Article.deleteMany({});
     
     // Insert data
     await Article.insertMany(data.articles);
     
     console.log('✅ Database seeded successfully');
     process.exit(0);
   }

   seed();
   ```

3. **Run Seed**
   ```bash
   npx ts-node scripts/seedDB.ts
   ```

4. **Update Components** - Replace localStorage with API calls (as shown above)

---

## Maintenance

### Backup Database
```bash
# Install MongoDB Database Tools
# Then run:
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/sdg-website"

# Restore
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/sdg-website" dump/
```

### Monitor Performance
1. MongoDB Atlas: Metrics tab
2. Vercel: Analytics dashboard
3. Set up alerts for downtime/errors

---

## Next Steps

1. ✅ Set up automated backups
2. ✅ Implement authentication (JWT + Google OAuth)
3. ✅ Add rate limiting to API
4. ✅ Set up monitoring (Sentry, LogRocket)
5. ✅ Optimize images (Cloudinary, Vercel Image Optimization)
6. ✅ Add API documentation (Swagger/OpenAPI)
7. ✅ Implement caching (Redis, Vercel Edge Cache)

---

## Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Test locally first
4. Check this guide's Troubleshooting section

---

**Your SDG website is now ready for production! 🎉**

Remember to:
- Keep dependencies updated
- Monitor performance metrics
- Back up your database regularly
- Review security settings periodically
