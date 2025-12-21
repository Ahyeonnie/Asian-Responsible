const express = require('express');
const router = express.Router();
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
  if (!fileOrUrl) return { url: null, publicId: null };
  if (fileOrUrl.startsWith('http')) return { url: fileOrUrl, publicId: null };
  const result = await cloudinary.uploader.upload(fileOrUrl, { folder });
  return { url: result.secure_url, publicId: result.public_id };
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
router.get('/article', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles', message: error.message });
  }
});

router.post('/article', async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    let updateData = { ...rest };
    if (image) {
      const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-articles');
      updateData.image = url;
      updateData.cloudinaryId = publicId;
    }
    const newArticle = new Article(updateData);
    const saved = await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add article', message: error.message });
  }
});

router.put('/article/:id', validateObjectId, async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    let updateData = { ...rest };
    if (image) {
      const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-articles');
      updateData.image = url;
      updateData.cloudinaryId = publicId;
    }
    const updated = await Article.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article', message: error.message });
  }
});

router.delete('/article/:id', validateObjectId, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    if (article.cloudinaryId) await cloudinary.uploader.destroy(article.cloudinaryId);
    await article.deleteOne();
    res.json({ message: 'Article deleted successfully', data: article });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article', message: error.message });
  }
});

// ========================================
// VIDEO CRUD
// ========================================
router.get('/video', async (req, res) => {
  try {
    const videos = await FeaturedVideo.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos', message: error.message });
  }
});

router.post('/video', async (req, res) => {
  try {
    const { thumbnail, ...rest } = req.body;
    let updateData = { ...rest };
    if (thumbnail) {
      const { url, publicId } = await ensureCloudinaryUrl(thumbnail, 'sdg-videos');
      updateData.thumbnail = url;
      updateData.cloudinaryId = publicId;
    }
    const newVideo = new FeaturedVideo(updateData);
    const saved = await newVideo.save();
    res.status(201).json({ message: 'Video added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add video', message: error.message });
  }
});

router.put('/video/:id', validateObjectId, async (req, res) => {
  try {
    const { thumbnail, ...rest } = req.body;
    let updateData = { ...rest };
    if (thumbnail) {
      const { url, publicId } = await ensureCloudinaryUrl(thumbnail, 'sdg-videos');
      updateData.thumbnail = url;
      updateData.cloudinaryId = publicId;
    }
    const updated = await FeaturedVideo.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video', message: error.message });
  }
});

router.delete('/video/:id', validateObjectId, async (req, res) => {
  try {
    const video = await FeaturedVideo.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    if (video.cloudinaryId) await cloudinary.uploader.destroy(video.cloudinaryId);
    await video.deleteOne();
    res.json({ message: 'Video deleted successfully', data: video });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video', message: error.message });
  }
});

// ========================================
// STORY CRUD
// ========================================
router.get('/story', async (req, res) => {
  try {
    const stories = await FeaturedStory.find().sort({ date: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories', message: error.message });
  }
});

router.post('/story', async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    let updateData = { ...rest };
    if (image) {
      const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-stories');
      updateData.image = url;
      updateData.cloudinaryId = publicId;
    }
    const newStory = new FeaturedStory(updateData);
    const saved = await newStory.save();
    res.status(201).json({ message: 'Story added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add story', message: error.message });
  }
});

router.put('/story/:id', validateObjectId, async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    let updateData = { ...rest };
    if (image) {
      const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-stories');
      updateData.image = url;
      updateData.cloudinaryId = publicId;
    }
    const updated = await FeaturedStory.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Story not found' });
    res.json({ message: 'Story updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update story', message: error.message });
  }
});
router.delete('/story/:id', validateObjectId, async (req, res) => {
  try {
    const story = await FeaturedStory.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });

    if (story.cloudinaryId) {
      await cloudinary.uploader.destroy(story.cloudinaryId);
    }

    await story.deleteOne();
    res.json({ message: 'Story deleted successfully', data: story });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete story', message: error.message });
  }
});

// ========================================
// EXPORT ROUTER
// ========================================
module.exports = router;
