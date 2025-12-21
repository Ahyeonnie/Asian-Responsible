const mongoose = require('mongoose');

// ========================================
// Article Schema
// ========================================
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String,  },
  description: { type: String, required: true }, // ✅ matches frontend
  author: { type: String,  },
  date: { type: Date, required: true }, // better as Date for sorting/filtering
  image: { type: String,  },
  category: { type: String, required: true },
  tags: [String],
  sdg: { type: Number, min: 1, max: 17 },
  link: { type: String }   // ✅ optional external link
}, { timestamps: true });

articleSchema.index({ date: -1 });        // fast sorting by date
articleSchema.index({ category: 1 });     // quick filtering by category
articleSchema.index({ sdg: 1 });          // useful if filtering by SDG
articleSchema.index({ author: 1 }); 

// ========================================
// Featured Video Schema
// ========================================
const featuredVideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: false },
  thumbnail: { type: String, required: true },
  duration: { type: String },
  category: { type: String },
  link: { type: String }   // ✅ optional external link
}, { timestamps: true });


featuredStorySchema.index({ date: -1 });
featuredStorySchema.index({ category: 1 });
featuredStorySchema.index({ sdg: 1 });
// ========================================
// Featured Story Schema
// ========================================
const featuredStorySchema = new mongoose.Schema({
  title: { type: String, },
  excerpt: { type: String, },
  date: { type: Date,  },
  readTime: { type: String, },
  category: { type: String, },
  sdg: { type: Number, min: 1, max: 17 },
  featured: { type: Boolean, default: false },
  image: { type: String },
  useCustomImage: { type: Boolean, default: false },
  link: { type: String }   // ✅ optional external link
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
