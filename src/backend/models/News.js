const mongoose = require('mongoose');
// ========================================
// Article Schema
// ========================================
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String },
  description: { type: String, required: true },
  author: { type: String },
  date: { type: Date, required: true },
  imageFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }, // GridFS reference
  category: { type: String, required: true },
  tags: [String],
  sdg: { type: Number, min: 1, max: 17 },
  link: { type: String }
}, { timestamps: true });

// ========================================
// Featured Video Schema
// ========================================
const featuredVideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  videoUrl: { type: String },
  thumbnailFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }, // GridFS reference
  duration: { type: String },
  category: { type: String },
  link: { type: String }
}, { timestamps: true });

// ========================================
// Featured Story Schema
// ========================================
const featuredStorySchema = new mongoose.Schema({
  title: { type: String },
  excerpt: { type: String },
  date: { type: Date },
  readTime: { type: String },
  category: { type: String },
  sdg: { type: Number, min: 1, max: 17 },
  featured: { type: Boolean, default: false },
  imageFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }, // GridFS reference
  useCustomImage: { type: Boolean, default: false },
  link: { type: String }
}, { timestamps: true });

featuredStorySchema.index({ date: -1 });
featuredStorySchema.index({ category: 1 });
featuredStorySchema.index({ sdg: 1 });

// ========================================
// Models
// ========================================
const Article = mongoose.model('Article', articleSchema);
const FeaturedVideo = mongoose.model('FeaturedVideo', featuredVideoSchema);
const FeaturedStory = mongoose.model('FeaturedStory', featuredStorySchema);

module.exports = { Article, FeaturedVideo, FeaturedStory };
