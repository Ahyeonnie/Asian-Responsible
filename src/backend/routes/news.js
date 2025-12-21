const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const { validateObjectId } = require('../middleware/validation');
const { Article, FeaturedVideo, FeaturedStory } = require('../models/News');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper: upload to Cloudinary if not already a URL
async function ensureCloudinaryUrl(fileOrUrl, folder) {
  if (!fileOrUrl) return null;
  if (fileOrUrl.startsWith('http')) return fileOrUrl; // already a URL
  const result = await cloudinary.uploader.upload(fileOrUrl, { folder });
  return result.secure_url;
}

// ========================================
// GET ALL NEWS (articles + videos + stories)
// ========================================
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    const videos = await FeaturedVideo.find().sort({ createdAt: -1 });
    const stories = await FeaturedStory.find().sort({ date: -1 });

    res.json({ articles, videos, stories });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news', message: error.message });
  }
});

// ========================================
// ARTICLE CRUD
// ========================================
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles', message: error.message });
  }
});

router.get('/article/:id', validateObjectId, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article', message: error.message });
  }
});

router.post('/article', async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const imageUrl = await ensureCloudinaryUrl(image, 'sdg-articles');
    const newArticle = new Article({ ...rest, image: imageUrl });
    const saved = await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add article', message: error.message });
  }
});

router.put('/article/:id', validateObjectId, async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const imageUrl = await ensureCloudinaryUrl(image, 'sdg-articles');
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { ...rest, image: imageUrl },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article', message: error.message });
  }
});

router.delete('/article/:id', validateObjectId, async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article', message: error.message });
  }
});

// ========================================
// VIDEO CRUD
// ========================================
router.get('/videos', async (req, res) => {
  try {
    const videos = await FeaturedVideo.find().sort({ createdAt: -1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos', message: error.message });
  }
});

router.get('/video/:id', validateObjectId, async (req, res) => {
  try {
    const video = await FeaturedVideo.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video', message: error.message });
  }
});

router.post('/video', async (req, res) => {
  try {
    const { thumbnail, ...rest } = req.body;
    const thumbUrl = await ensureCloudinaryUrl(thumbnail, 'sdg-videos');
    const newVideo = new FeaturedVideo({ ...rest, thumbnail: thumbUrl });
    const saved = await newVideo.save();
    res.status(201).json({ message: 'Video added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add video', message: error.message });
  }
});

router.put('/video/:id', validateObjectId, async (req, res) => {
  try {
    const { thumbnail, ...rest } = req.body;
    const thumbUrl = await ensureCloudinaryUrl(thumbnail, 'sdg-videos');
    const updated = await FeaturedVideo.findByIdAndUpdate(
      req.params.id,
      { ...rest, thumbnail: thumbUrl },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video', message: error.message });
  }
});

router.delete('/video/:id', validateObjectId, async (req, res) => {
  try {
    const deleted = await FeaturedVideo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video', message: error.message });
  }
});

// ========================================
// STORY CRUD
// ========================================
router.get('/stories', async (req, res) => {
  try {
    const stories = await FeaturedStory.find().sort({ date: -1 });
    res.json({ stories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories', message: error.message });
  }
});

router.get('/story/:id', validateObjectId, async (req, res) => {
  try {
    const story = await FeaturedStory.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story', message: error.message });
  }
});

router.post('/story', async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const imageUrl = await ensureCloudinaryUrl(image, 'sdg-stories');
    const newStory = new FeaturedStory({ ...rest, image: imageUrl });
    const saved = await newStory.save();
    res.status(201).json({ message: 'Story added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add story', message: error.message });
  }
});

router.put('/story/:id', validateObjectId, async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const imageUrl = await ensureCloudinaryUrl(image, 'sdg-stories');
    const updated = await FeaturedStory.findByIdAndUpdate(
      req.params.id,
      { ...rest, image: imageUrl },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Story not found' });
    res.json({ message: 'Story updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update story', message: error.message });
  }
});

router.delete('/story/:id', validateObjectId, async (req, res) => {
  try {
    const deleted = await FeaturedStory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Story not found' });
    res.json({ message: 'Story deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete story', message: error.message });
  }
});

// ========================================
// BULK UPDATE NEWS (articles + videos + stories)
// ========================================
router.put('/all', async (req, res) => {
  let { articles = [], videos = [], stories = [] } = req.body;
  const errors = {};

  // ✅ Sanitize _id fields before insert
  articles = articles.map(a => {
    if (!mongoose.isValidObjectId(a._id)) delete a._id;
    return a;
  });
  videos = videos.map(v => {
    if (!mongoose.isValidObjectId(v._id)) delete v._id;
    return v;
  });
  stories = stories.map(s => {
    if (!mongoose.isValidObjectId(s._id)) delete s._id;
    return s;
  });

  // Articles
  try {
    await Article.deleteMany({});
    if (articles.length) {
      const processed = [];
      for (const a of articles) {
        const imageUrl = await ensureCloudinaryUrl(a.image, 'sdg-articles');
        processed.push({ ...a, image: imageUrl });
      }
      await Article.insertMany(processed);
    }
  } catch (err) {
    console.error('Article insert failed:', err.message);
    errors.articles = err.message;
  }

  // Videos
  try {
    await FeaturedVideo.deleteMany({});
    if (videos.length) {
      const processed = [];
      for (const v of videos) {
        const thumbUrl = await ensureCloudinaryUrl(v.thumbnail, 'sdg-videos');
        processed.push({ ...v, thumbnail: thumbUrl });
      }
      await FeaturedVideo.insertMany(processed);
    }
  } catch (err) {
    console.error('Video insert failed:', err.message);
    errors.videos = err.message;
  }

  // Stories
  try {
    await FeaturedStory.deleteMany({});
    if (stories.length) {
      const processed = [];
      for (const s of stories) {
        const imageUrl = await ensureCloudinaryUrl(s.image, 'sdg-stories');
        processed.push({ ...s, image: imageUrl });
      }
      await FeaturedStory.insertMany(processed);
    }
  } catch (err) {
    console.error('Story insert failed:', err.message);
    errors.stories = err.message;
  }

  res.json({ message: 'News update attempted', errors });
});

module.exports = router;
