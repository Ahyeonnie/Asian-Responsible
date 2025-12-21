const mongoose = require('mongoose');

const featuredAwardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  sdg: { type: Number, min: 1, max: 17 },
  color: { type: String, default: 'from-yellow-400 to-yellow-600' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

featuredAwardSchema.index({ year: -1 });        // fast sorting/filtering by year
featuredAwardSchema.index({ category: 1 });     // fast filtering by category
featuredAwardSchema.index({ organization: 1 }); // fast filtering by organization
featuredAwardSchema.index({ sdg: 1 });          // fast filtering by SDG
featuredAwardSchema.index({ order: 1 });        // fast ordering in dashboards

module.exports = mongoose.model('FeaturedAward', featuredAwardSchema);
