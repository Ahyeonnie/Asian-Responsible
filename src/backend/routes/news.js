// routes/news.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { validateObjectId } = require('../middleware/validation');
const { Article, FeaturedVideo, FeaturedStory } = require('../models/News');

// ========================================
// Multer + GridFS setup
// ========================================
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads' // default GridFS bucket
    };
  }
});
const upload = multer({ storage });

// ========================================
// GET ALL NEWS
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
router.post('/article', upload.single('image'), async (req, res) => {
  try {
    const newArticle = new Article({
      ...req.body,
      imageFileId: req.file.id // reference to GridFS file
    });
    const saved = await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add article', message: error.message });
  }
});

router.put('/article/:id', validateObjectId, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.imageFileId = req.file.id;
    const updated = await Article.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
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
router.post('/video', upload.single('thumbnail'), async (req, res) => {
  try {
    const newVideo = new FeaturedVideo({
      ...req.body,
      thumbnailFileId: req.file.id
    });
    const saved = await newVideo.save();
    res.status(201).json({ message: 'Video added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add video', message: error.message });
  }
});

router.put('/video/:id', validateObjectId, upload.single('thumbnail'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.thumbnailFileId = req.file.id;
    const updated = await FeaturedVideo.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
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
router.post('/story', upload.single('image'), async (req, res) => {
  try {
    const newStory = new FeaturedStory({
      ...req.body,
      imageFileId: req.file.id
    });
    const saved = await newStory.save();
    res.status(201).json({ message: 'Story added successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add story', message: error.message });
  }
});

router.put('/story/:id', validateObjectId, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.imageFileId = req.file.id;
    const updated = await FeaturedStory.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
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

module.exports = router;
