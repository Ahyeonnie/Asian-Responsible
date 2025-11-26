# 🗄️ MongoDB Integration Guide

## Overview
All dashboard components are now ready for MongoDB integration. All database code is commented with `// TODO:` markers. Simply uncomment these sections when your MongoDB backend is ready.

---

## 📋 Required Backend API Endpoints

### Authentication Endpoints (Already documented in /components/AuthModal.tsx)
- `POST /auth/signup` - Create new admin account
- `POST /auth/signin` - Sign in with email/password
- `GET /auth/google` - Google OAuth redirect
- `GET /auth/google/callback` - Google OAuth callback

### News Section (`/components/dashboard/DashboardNews.tsx`) ✅ READY
- `GET /api/news/articles` - Fetch all articles
- `POST /api/news/articles` - Create new article
- `PUT /api/news/articles/:id` - Update article
- `DELETE /api/news/articles/:id` - Delete article
- `GET /api/news/videos` - Fetch all videos
- `POST /api/news/videos` - Create new video
- `PUT /api/news/videos/:id` - Update video
- `DELETE /api/news/videos/:id` - Delete video

### Events Section (`/components/dashboard/DashboardEvents.tsx`) 🔄 NEEDS UPDATE
- `GET /api/events` - Fetch all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/photos` - Upload event photo
- `DELETE /api/events/:id/photos/:photoId` - Delete event photo

### Publications Section (`/components/dashboard/DashboardPublications.tsx`) 🔄 NEEDS UPDATE
- `GET /api/publications` - Fetch all publications
- `POST /api/publications` - Create new publication
- `PUT /api/publications/:id` - Update publication
- `DELETE /api/publications/:id` - Delete publication

### Awards Section (`/components/dashboard/DashboardAwards.tsx`) 🔄 NEEDS UPDATE
- `GET /api/awards` - Fetch all awards
- `POST /api/awards` - Create new award
- `PUT /api/awards/:id` - Update award
- `DELETE /api/awards/:id` - Delete award

### Mission Section (`/components/dashboard/DashboardMission.tsx`) 🔄 NEEDS UPDATE
- `GET /api/mission` - Fetch mission data
- `PUT /api/mission` - Update mission data
- `POST /api/mission/objectives` - Add objective
- `DELETE /api/mission/objectives/:id` - Delete objective
- `POST /api/mission/benefits` - Add benefit
- `DELETE /api/mission/benefits/:id` - Delete benefit

### Home Section (`/components/dashboard/DashboardHome.tsx`) 🔄 NEEDS UPDATE
- `GET /api/home` - Fetch home page data
- `PUT /api/home/hero` - Update hero section
- `PUT /api/home/stats` - Update statistics

### Community Section (`/components/dashboard/DashboardCommunity.tsx`) 🔄 NEEDS UPDATE
- `GET /api/community/members` - Fetch community members
- `POST /api/community/members` - Add member
- `PUT /api/community/members/:id` - Update member
- `DELETE /api/community/members/:id` - Delete member

### Contact Section (`/components/dashboard/DashboardContact.tsx`) 🔄 NEEDS UPDATE
- `GET /api/contact` - Fetch contact information
- `PUT /api/contact` - Update contact information
- `GET /api/contact/faqs` - Fetch FAQs
- `POST /api/contact/faqs` - Add FAQ
- `PUT /api/contact/faqs/:id` - Update FAQ
- `DELETE /api/contact/faqs/:id` - Delete FAQ

---

## 🔧 MongoDB Schema Examples

### User Schema
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

### News Article Schema
```javascript
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  sdg: { type: Number, min: 1, max: 17 },
  image: { type: String },
  readTime: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewsArticle', articleSchema);
```

### News Video Schema
```javascript
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String },
  duration: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewsVideo', videoSchema);
```

### Event Schema
```javascript
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String },
  images: [{ type: String }],
  attendees: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
```

### Publication Schema
```javascript
const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String },
  coverImage: { type: String },
  description: { type: String },
  downloadUrl: { type: String },
  tableOfContents: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Publication', publicationSchema);
```

### Award Schema
```javascript
const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Award', awardSchema);
```

---

## 🚀 Backend Implementation Steps

### 1. Set up Express Server
```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken passport passport-google-oauth20
```

### 2. Create Server Structure
```
backend/
├── server.js
├── .env
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── NewsArticle.js
│   ├── NewsVideo.js
│   ├── Event.js
│   ├── Publication.js
│   └── Award.js
├── routes/
│   ├── auth.js
│   ├── news.js
│   ├── events.js
│   ├── publications.js
│   └── awards.js
└── middleware/
    └── auth.js
```

### 3. Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/areopc
JWT_SECRET=your-super-secret-jwt-key-change-this
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:3000
```

### 4. Database Connection (config/database.js)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 5. Auth Middleware (middleware/auth.js)
```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
```

### 6. News Routes Example (routes/news.js)
```javascript
const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle');
const NewsVideo = require('../models/NewsVideo');
const auth = require('../middleware/auth');

// Get all articles
router.get('/articles', auth, async (req, res) => {
  try {
    const articles = await NewsArticle.find().sort({ date: -1 });
    res.json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create article
router.post('/articles', auth, async (req, res) => {
  try {
    const article = new NewsArticle(req.body);
    await article.save();
    res.json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update article
router.put('/articles/:id', auth, async (req, res) => {
  try {
    const article = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete article
router.delete('/articles/:id', auth, async (req, res) => {
  try {
    await NewsArticle.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Similar routes for videos...

module.exports = router;
```

### 7. Main Server File (server.js)
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/news', require('./routes/news'));
app.use('/api/events', require('./routes/events'));
app.use('/api/publications', require('./routes/publications'));
app.use('/api/awards', require('./routes/awards'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## ✅ Frontend Integration Checklist

When your MongoDB backend is ready:

1. **Create `.env` file** in frontend root:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

2. **For each dashboard component**, uncomment the TODO sections:
   - ✅ `/components/AuthModal.tsx` - Already ready
   - ✅ `/components/dashboard/DashboardNews.tsx` - Already ready
   - 🔄 `/components/dashboard/DashboardEvents.tsx` - Needs update
   - 🔄 `/components/dashboard/DashboardPublications.tsx` - Needs update
   - 🔄 `/components/dashboard/DashboardAwards.tsx` - Needs update
   - 🔄 `/components/dashboard/DashboardMission.tsx` - Needs update
   - 🔄 `/components/dashboard/DashboardHome.tsx` - Needs update
   - 🔄 `/components/dashboard/DashboardCommunity.tsx` - Needs update
   - 🔄 `/components/dashboard/DashboardContact.tsx` - Needs update

3. **Remove the bypass mode** from AuthModal.tsx (lines 25-35)

4. **Test each endpoint** individually

---

## 🎯 Current Status

### ✅ Completed (MongoDB-Ready)
- Authentication system (Google OAuth + Email/Password)
- News Section (Articles + Videos)

### 🔄 Pending Updates
- All other dashboard sections need MongoDB integration code added

### 🚀 Next Steps
1. I'll now update all remaining dashboard components to be MongoDB-ready
2. All API calls will be commented with TODO markers
3. You can then uncomment them when your backend is ready

---

## 💡 Pro Tips

1. **Test with Postman** first before connecting frontend
2. **Use MongoDB Compass** to visualize your data
3. **Implement validation** on both frontend and backend
4. **Add image upload** functionality (AWS S3, Cloudinary, or local storage)
5. **Implement pagination** for large datasets
6. **Add search and filter** functionality
7. **Create backup scripts** for your MongoDB database

---

## 🔒 Security Best Practices

1. **Never commit** `.env` files to git
2. **Use strong** JWT secrets (minimum 32 characters)
3. **Implement rate limiting** to prevent abuse
4. **Validate all inputs** on the backend
5. **Use HTTPS** in production
6. **Set proper CORS** policies
7. **Hash passwords** with bcrypt (minimum 10 rounds)
8. **Implement refresh tokens** for better security

---

For more details, check the inline comments in each dashboard component file!
