import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import solarEnergySDG from "figma:asset/1ef5dfe8c4590c192be53bd9e3668b20c5142ca0.png";
import pacificIslandsSDG from "figma:asset/7f15fee7c44a2d32751d3f35cbc279b97e2aaa48.png";
import agroecologyLaosImage from "figma:asset/c6d98d0395dc5a078bf82b96fe6c7a900086d9ba.png";
import solarSchoolsImage from "figma:asset/dc443206b60e37fc159045a2c074777c40a091a2.png";
import textileRecyclingImage from "figma:asset/fca6af039a70008719f206c3407d56b463d560a3.png";
import safeWaterKiosksImage from "figma:asset/3352566dd78f3b2c84a9926297b72e410e0b5025.png";
import mangrovesForLifeImage from "figma:asset/3a732338ae23b9d07d162f852b57234c896e9566.png";
import nepalBiogasImage from "figma:asset/c5e5c0023147f34fd60bab003fcba4f1062d9217.png";

const news = [
  {
    id: 1,
    title: "Solar Schools - Powering Education With the Sun",
    excerpt:
      "Bright futures start with bright classrooms. Bangladesh is lighting up rural schools with solar panels boosting learning and reducing outages.",
    date: "2024-01-30",
    readTime: "5 min read",
    category: "Clean Energy",
    sdg: 7,
    featured: false,
    image: "solar schools bangladesh education",
    useCustomImage: true,
  },
  {
    id: 2,
    title:
      "Agroecology in Laos: Farming with Nature, Not Against It",
    excerpt:
      "Farmers in Laos are shifting to agroecology — reducing chemicals, protecting soil, and growing more resilient crops. Sustainable food starts in the soil. 🌊This isn’t a distant scenario. Climate displacement is a present-day reality for thousands in the Pacific.",
    date: "2024-02-01",
    readTime: "4 min read",
    category: "Zero Hunger",
    sdg: 2,
    featured: false,
    image: "agroecology farming laos sustainable",
    useCustomImage: true,
  },
  {
    id: 3,
    title: "Textile Recycling Hub - Turning Fashion Waste Into Opportunity",
    excerpt:
      "This recycling facility in India processes tons of textile waste into reusable materials — cutting landfill and creating jobs. Don't waste fashion — reinvent it.",
    date: "2024-01-25",
    readTime: "6 min read",
    category: "Responsible Production",
    sdg: 12,
    featured: false,
    image: "textile recycling india fashion",
    useCustomImage: true,
  },
  {
    id: 4,
    title: "Safe Water Kiosks - Clean Water on Tap in Remote Areas",
    excerpt:
      "Social enterprises in Cambodia are installing low-cost, solar-powered water kiosks in rural villages. Water is life and it's flowing again.",
    date: "2024-01-22",
    readTime: "5 min read",
    category: "Clean Water",
    sdg: 6,
    featured: false,
    image: "safe water kiosks cambodia",
    useCustomImage: true,
  },
  {
    id: 5,
    title: "Mangroves for Life - Restoring Coasts, Reviving Communities",
    excerpt:
      "Indonesia's mangrove reforestation efforts help protect coasts from storms, store carbon, and support fishing livelihoods. Nature-based solutions. Real climate impact.",
    date: "2024-01-20",
    readTime: "6 min read",
    category: "Climate Action",
    sdg: 13,
    featured: false,
    image: "mangroves indonesia restoration",
    useCustomImage: true,
  },
  {
    id: 6,
    title: "Bringing Biogas to Nepalese Villages - Turning Cow Dung Into Clean Energy",
    excerpt:
      "Nepal is scaling up biogas systems that convert animal waste into fuel, cutting emissions and improving health. Fuel the future with what you already have.",
    date: "2024-01-18",
    readTime: "5 min read",
    category: "Clean Energy",
    sdg: 7,
    featured: false,
    image: "nepal biogas villages energy",
    useCustomImage: true,
  },
];

const categories = [
  "All News",
  "Climate Action",
  "Zero Hunger",
  "Education",
  "Gender Equality",
  "Clean Energy",
  "Clean Water",
  "Sustainable Cities",
  "Responsible Production",
];

export default function News() {
  const [selectedCategory, setSelectedCategory] =
    React.useState("All News");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredNews = news.filter((article) => {
    const matchesCategory =
      selectedCategory === "All News" ||
      article.category === selectedCategory;
    const matchesSearch =
      article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      article.excerpt
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = news.filter(
    (article) => article.featured,
  );
  const regularNews = news.filter(
    (article) => !article.featured,
  );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Latest News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-white">
            Stay updated on the latest developments,
            breakthroughs, and progress in sustainable
            development around the world.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured News */}
        {featuredNews.length > 0 &&
          selectedCategory === "All News" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 dark:text-white mb-8">
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredNews.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={
                            article.useCustomImage &&
                            article.image ===
                              "agroecology farming laos sustainable"
                              ? agroecologyLaosImage
                              : article.useCustomImage &&
                                  article.image ===
                                    "solar schools bangladesh education"
                                ? solarSchoolsImage
                                : article.useCustomImage &&
                                    article.image ===
                                      "textile recycling india fashion"
                                  ? textileRecyclingImage
                                  : article.useCustomImage &&
                                      article.image ===
                                        "safe water kiosks cambodia"
                                    ? safeWaterKiosksImage
                                    : article.useCustomImage &&
                                        article.image ===
                                          "mangroves indonesia restoration"
                                      ? mangrovesForLifeImage
                                      : article.useCustomImage &&
                                          article.image ===
                                            "nepal biogas villages energy"
                                        ? nepalBiogasImage
                                        : `https://images.unsplash.com/800x400?${article.image}`
                          }
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-none">
                            Featured
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="secondary"
                            className="bg-black/50 text-white border-none"
                          >
                            SDG {article.sdg}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              article.date,
                            ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                          {article.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="text-xs dark:text-black mb-8"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {article.category}
                          </Badge>
                          <a
                            href="https://www.facebook.com/photo.php?fbid=634697399602562&set=pb.100091869217858.-2207520000&type=3"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Read More
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        {/* All News */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {selectedCategory === "All News"
              ? "Recent Updates"
              : `${selectedCategory} News`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={
                        article.useCustomImage &&
                        article.image ===
                          "agroecology farming laos sustainable"
                          ? agroecologyLaosImage
                          : article.useCustomImage &&
                              article.image ===
                                "solar energy asia pacific bangladesh"
                            ? solarEnergySDG
                            : article.useCustomImage &&
                                article.image ===
                                  "pacific islands climate change"
                              ? pacificIslandsSDG
                              : article.useCustomImage &&
                                  article.image ===
                                    "solar schools bangladesh education"
                                ? solarSchoolsImage
                                : article.useCustomImage &&
                                    article.image ===
                                      "textile recycling india fashion"
                                  ? textileRecyclingImage
                                  : article.useCustomImage &&
                                      article.image ===
                                        "safe water kiosks cambodia"
                                    ? safeWaterKiosksImage
                                    : article.useCustomImage &&
                                        article.image ===
                                          "mangroves indonesia restoration"
                                      ? mangrovesForLifeImage
                                      : article.useCustomImage &&
                                          article.image ===
                                            "nepal biogas villages energy"
                                        ? nepalBiogasImage
                                        : `https://images.unsplash.com/600x300?${article.image}`
                      }
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="bg-black/50 text-white border-none text-xs"
                      >
                        SDG {article.sdg}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(
                          article.date,
                        ).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="text-xs dark:text-black"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {article.category}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 text-xs"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Let’s build a greener future together! 💚
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stay connected with the latest progress in
            sustainable development. From community projects to
            global breakthroughs, we’re sharing stories that
            matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center justify-center">
            <a
              href="https://www.facebook.com/climateneutralawards"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-xl text-center">
                Embark With Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}