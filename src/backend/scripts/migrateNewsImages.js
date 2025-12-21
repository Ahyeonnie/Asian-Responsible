require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const { Article, FeaturedVideo, FeaturedStory } = require('../models/News');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in .env');
  process.exit(1);
}

async function clearArticleImages() {
  const articles = await Article.find({ image: { $exists: true, $ne: null } });
  console.log(`Found ${articles.length} articles with images`);
  for (const a of articles) {
    try {
      a.image = null; // remove image only
      await a.save();
      console.log(`🗑️ Cleared image for Article ${a._id}`);
    } catch (err) {
      console.error(`❌ Article ${a._id} failed:`, err.message);
    }
  }
}

async function clearVideoThumbnails() {
  const videos = await FeaturedVideo.find({ thumbnail: { $exists: true, $ne: null } });
  console.log(`Found ${videos.length} videos with thumbnails`);
  for (const v of videos) {
    try {
      v.thumbnail = null; // remove thumbnail only
      await v.save();
      console.log(`🗑️ Cleared thumbnail for Video ${v._id}`);
    } catch (err) {
      console.error(`❌ Video ${v._id} failed:`, err.message);
    }
  }
}

async function clearStoryImages() {
  const stories = await FeaturedStory.find({ image: { $exists: true, $ne: null } });
  console.log(`Found ${stories.length} stories with images`);
  for (const s of stories) {
    try {
      s.image = null; // remove image only
      await s.save();
      console.log(`🗑️ Cleared image for Story ${s._id}`);
    } catch (err) {
      console.error(`❌ Story ${s._id} failed:`, err.message);
    }
  }
}

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await clearArticleImages();
    await clearVideoThumbnails();
    await clearStoryImages();

    console.log('🎉 Image fields cleared successfully');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
    process.exit(0);
  }
})();
