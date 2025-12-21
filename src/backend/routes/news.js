// ========================================
// NEWS API ROUTES (Articles, Videos, Stories)
// ========================================

const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware/validation');
const { Article, FeaturedVideo, FeaturedStory } = require('../models/News');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');

// Multer setup (temp storage)
const upload = multer({ dest: "uploads/", limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ========================================
// UPLOAD ENDPOINTS
// ========================================

// Upload image
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "sdg-images"
    });
    fs.unlinkSync(req.file.path);

    res.json({ imageUrl: result.secure_url, publicId: result.public_id });
  } catch (error) {
    res.status(500).json({ error: "Image upload failed", message: error.message });
  }
});

// Upload video thumbnail
router.post("/upload-thumbnail", upload.single("thumbnail"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No thumbnail file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "sdg-videos"
    });
    fs.unlinkSync(req.file.path);

    res.json({ thumbnailUrl: result.secure_url, publicId: result.public_id });
  } catch (error) {
    res.status(500).json({ error: "Thumbnail upload failed", message: error.message });
  }
});

// Upload video file
router.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No video file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "sdg-videos"
    });
    fs.unlinkSync(req.file.path);

    res.json({ videoUrl: result.secure_url, publicId: result.public_id });
  } catch (error) {
    res.status(500).json({ error: "Video upload failed", message: error.message });
  }
});

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
    res.status(500).json({ error: 'Failed to fetch news', message: error.message });
  }
});

// ========================================
// ARTICLE CRUD
// ========================================
router.get('/article', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json({ data: articles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles', message: error.message });
  }
});

router.post('/article', async (req, res) => {
  try {
    const newArticle = new Article(req.body); // req.body.image should already be a Cloudinary URL
    const saved = await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add article', message: error.message });
  }
});

router.put('/article/:id', validateObjectId, async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
    res.json({ data: videos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos', message: error.message });
  }
});

router.post('/video', async (req, res) => {
  try {
    const newVideo = new FeaturedVideo(req.body); // req.body.thumbnail should already be a Cloudinary URL
    const saved = await newVideo.save();
    res.status(201).json({ message: 'Video added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add video', message: error.message });
  }
});

router.put('/video/:id', validateObjectId, async (req, res) => {
  try {
    const updated = await FeaturedVideo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
    res.json({ data: stories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories', message: error.message });
  }
});

router.post('/story', async (req, res) => {
  try {
    const newStory = new FeaturedStory(req.body); // req.body.image should already be a Cloudinary URL
    const saved = await newStory.save();
    res.status(201).json({ message: 'Story added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add story', message: error.message });
  }
});

router.put('/story/:id', validateObjectId, async (req, res) => {
  try {
    const updated = await FeaturedStory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
    if (story.cloudinaryId) await cloudinary.uploader.destroy(story.cloudinaryId);
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
