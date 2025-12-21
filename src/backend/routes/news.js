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
router.post('/article', async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-articles');
    const newArticle = new Article({ ...rest, image: url, cloudinaryId: publicId });
    const saved = await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add article', message: error.message });
  }
});

router.put('/article/:id', validateObjectId, async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-articles');
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { ...rest, image: url, cloudinaryId: publicId },
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
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (article.cloudinaryId) {
      await cloudinary.uploader.destroy(article.cloudinaryId);
    }

    await article.deleteOne();
    res.json({ message: 'Article deleted successfully', data: article });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article', message: error.message });
  }
});

// ========================================
// VIDEO CRUD
// ========================================
router.post('/video', async (req, res) => {
  try {
    const { thumbnail, ...rest } = req.body;
    const { url, publicId } = await ensureCloudinaryUrl(thumbnail, 'sdg-videos');
    const newVideo = new FeaturedVideo({ ...rest, thumbnail: url, cloudinaryId: publicId });
    const saved = await newVideo.save();
    res.status(201).json({ message: 'Video added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add video', message: error.message });
  }
});

router.put('/video/:id', validateObjectId, async (req, res) => {
  try {
    const { thumbnail, ...rest } = req.body;
    const { url, publicId } = await ensureCloudinaryUrl(thumbnail, 'sdg-videos');
    const updated = await FeaturedVideo.findByIdAndUpdate(
      req.params.id,
      { ...rest, thumbnail: url, cloudinaryId: publicId },
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
    const video = await FeaturedVideo.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    if (video.cloudinaryId) {
      await cloudinary.uploader.destroy(video.cloudinaryId);
    }

    await video.deleteOne();
    res.json({ message: 'Video deleted successfully', data: video });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video', message: error.message });
  }
});

// ========================================
// STORY CRUD
// ========================================
router.post('/story', async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-stories');
    const newStory = new FeaturedStory({ ...rest, image: url, cloudinaryId: publicId });
    const saved = await newStory.save();
    res.status(201).json({ message: 'Story added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add story', message: error.message });
  }
});

router.put('/story/:id', validateObjectId, async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const { url, publicId } = await ensureCloudinaryUrl(image, 'sdg-stories');
    const updated = await FeaturedStory.findByIdAndUpdate(
      req.params.id,
      { ...rest, image: url, cloudinaryId: publicId },
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

module.exports = router;
