import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, Tag, Newspaper, Play, Eye, ChevronLeft, ChevronRight } from "lucide-react";
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

const defaultNews = [
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
      "Farmers in Laos are shifting to agroecology — reducing chemicals, protecting soil, and growing more resilient crops. Sustainable food starts in the soil. 🌊This isn't a distant scenario. Climate displacement is a present-day reality for thousands in the Pacific.",
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

const articles = [
  {
    id: 1,
    title: "Asia-Pacific Leads Global Green Energy Revolution",
    description: "New report reveals Asia-Pacific countries are accelerating renewable energy adoption, with solar and wind installations reaching historic highs. Investment in clean energy infrastructure has surpassed $500 billion, marking a significant shift towards sustainable power generation across the region.",
    excerpt: "Asia-Pacific leads the world in renewable energy investment with over $500 billion committed to clean infrastructure.",
    image: "https://images.unsplash.com/photo-1568238411977-73fdfc2cb4db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBhcnRpY2xlfGVufDF8fHx8MTc2MzM2MDU5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-11-15",
    category: "Clean Energy",
    author: "Dr. Sarah Chen",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "Sustainable Agriculture Summit Brings Global Leaders Together",
    description: "Over 50 nations convened to discuss innovative farming practices and food security solutions. The summit highlighted successful case studies of agroecology, regenerative agriculture, and climate-resilient crops that are transforming food systems across Southeast Asia.",
    excerpt: "Global leaders unite to discuss sustainable farming practices and innovative solutions for food security.",
    image: "https://images.unsplash.com/photo-1638699532230-1c7676c2a708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMG5ld3MlMjByZXBvcnR8ZW58MXx8fHwxNzYzMzYwNTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-11-12",
    category: "Zero Hunger",
    author: "Michael Torres",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 3,
    title: "Circular Economy Reduces Plastic Waste by 40% in Major Cities",
    description: "Innovative recycling programs and circular economy strategies have achieved remarkable results across Asian cities. The initiatives include comprehensive waste management systems, biodegradable alternatives, and public awareness campaigns that engage millions of citizens.",
    excerpt: "Circular economy initiatives achieve 40% reduction in plastic waste through innovative recycling programs.",
    image: "https://images.unsplash.com/photo-1592495169089-a37c0b5b96bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwYXJ0aWNsZXxlbnwxfHx8fDE3NjMzNjA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-11-10",
    category: "Responsible Production",
    author: "Emma Williams",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 4,
    title: "Climate Adaptation Strategies Show Promising Results",
    description: "Nature-based solutions including mangrove restoration, urban green spaces, and sustainable water management are significantly improving community resilience. Recent studies show these strategies reduce climate risks by up to 60% in vulnerable regions.",
    excerpt: "Nature-based climate solutions reduce risks by 60% in vulnerable communities across Asia.",
    image: "https://images.unsplash.com/photo-1616164942300-88c616eb444b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwbmV3c3xlbnwxfHx8fDE3NjMzNjA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-11-08",
    category: "Climate Action",
    author: "Dr. Lisa Zhang",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 5,
    title: "Green Technology Innovations Transform Manufacturing",
    description: "Breakthrough technologies in green manufacturing are revolutionizing production processes, reducing carbon emissions by 50% while improving efficiency. Industries across Asia are adopting AI-powered systems for energy optimization.",
    excerpt: "Revolutionary green tech cuts manufacturing emissions by 50% while boosting efficiency.",
    image: "https://images.unsplash.com/photo-1758614351900-6398341d5b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc2MzI5MzM2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-11-06",
    category: "Responsible Production",
    author: "James Park",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 6,
    title: "Clean Water Access Expands to 10 Million People",
    description: "Groundbreaking water purification systems and infrastructure projects have provided clean drinking water access to over 10 million people in rural communities. Solar-powered filtration technology makes water treatment affordable and sustainable.",
    excerpt: "New water systems bring clean drinking water to 10 million people in rural areas.",
    image: "https://images.unsplash.com/photo-1688612273200-7a64a0af945e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwYWNjZXNzfGVufDF8fHx8MTc2MzM2MDk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-11-04",
    category: "Clean Water",
    author: "Priya Sharma",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 7,
    title: "Smart Cities Lead Urban Sustainability Movement",
    description: "Intelligent urban planning and IoT technologies are creating sustainable cities that reduce energy consumption by 35%. Smart grids, green buildings, and efficient public transportation systems are becoming the new standard.",
    excerpt: "Smart city technologies reduce urban energy use by 35% through innovative planning.",
    image: "https://images.unsplash.com/photo-1682890042999-53907226727d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN1c3RhaW5hYmlsaXR5JTIwY2l0eXxlbnwxfHx8fDE3NjMzNjA5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-11-02",
    category: "Sustainable Cities",
    author: "David Kim",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 8,
    title: "Wind Energy Capacity Doubles Across Southeast Asia",
    description: "Wind power installations have doubled in the past year, generating clean electricity for millions of homes. Offshore wind farms are proving particularly effective, with capacity factors exceeding 45%.",
    excerpt: "Southeast Asia doubles wind energy capacity with major offshore installations.",
    image: "https://images.unsplash.com/photo-1630450364945-0c1ec2c449cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjB3aW5kfGVufDF8fHx8MTc2MzM2MDk1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-10-30",
    category: "Clean Energy",
    author: "Maria Santos",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 9,
    title: "Education Programs Reach 5 Million Children in Remote Areas",
    description: "Digital learning platforms and mobile classrooms are bringing quality education to children in the most remote regions. Satellite internet and solar-powered devices enable access to world-class educational resources.",
    excerpt: "Digital education initiatives bring learning to 5 million children in remote communities.",
    image: "https://images.unsplash.com/photo-1760267973986-5370a55550f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2MzMzNTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-10-28",
    category: "Education",
    author: "Ahmad Hassan",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 10,
    title: "Women's Entrepreneurship Programs Create 50,000 Jobs",
    description: "Targeted support for women entrepreneurs has resulted in 50,000 new jobs across rural and urban areas. Microfinance initiatives, training programs, and mentorship networks are driving economic empowerment.",
    excerpt: "Women-led businesses create 50,000 jobs through entrepreneurship programs.",
    image: "https://images.unsplash.com/photo-1674115458346-c6925d68daef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW5kZXIlMjBlcXVhbGl0eSUyMHdvbWVufGVufDF8fHx8MTc2MzM2MDk1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-10-26",
    category: "Gender Equality",
    author: "Siti Rahman",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 11,
    title: "Biodiversity Conservation Protects 2 Million Hectares",
    description: "Collaborative conservation efforts have established protected areas covering 2 million hectares of critical habitats. Indigenous communities play key roles in managing these ecosystems sustainably.",
    excerpt: "Conservation programs protect 2 million hectares of critical wildlife habitats.",
    image: "https://images.unsplash.com/photo-1585871746932-e133d3fedf4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGRldmVsb3BtZW50JTIwbmV3c3xlbnwxfHx8fDE3NjMzNjA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-10-24",
    category: "Climate Action",
    author: "Dr. Wei Lin",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 12,
    title: "Sustainable Tourism Creates Economic Opportunities",
    description: "Eco-tourism initiatives are generating sustainable income for local communities while preserving natural and cultural heritage. Responsible travel practices are becoming mainstream across the region.",
    excerpt: "Eco-tourism generates sustainable income while protecting natural heritage.",
    image: "https://images.unsplash.com/photo-1623039405147-547794f92e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBhcnRpY2xlJTIwam91cm5hbGlzbXxlbnwxfHx8fDE3NjMzNjA1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2024-10-22",
    category: "Sustainable Cities",
    author: "Thomas Lee",
    readTime: "6 min read",
    featured: false
  }
];

const videos = [
  {
    id: 1,
    title: "Solar Revolution: Powering Rural Asia",
    description: "Explore how solar energy is transforming rural communities across Asia, bringing electricity to remote villages and powering sustainable development. This documentary follows solar installation projects in Bangladesh, Nepal, and Cambodia.",
    thumbnail: "https://images.unsplash.com/photo-1568238411977-73fdfc2cb4db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBhcnRpY2xlfGVufDF8fHx8MTc2MzM2MDU5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "12:34",
    views: "45K",
    date: "2024-11-14"
  },
  {
    id: 2,
    title: "Sustainable Farming: Growing the Future",
    description: "Meet farmers pioneering sustainable agriculture practices that increase yields while protecting soil health and biodiversity. Learn about innovative techniques combining traditional knowledge with modern technology for climate-resilient food production.",
    thumbnail: "https://images.unsplash.com/photo-1638699532230-1c7676c2a708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMG5ld3MlMjByZXBvcnR8ZW58MXx8fHwxNzYzMzYwNTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "18:45",
    views: "52K",
    date: "2024-11-11"
  },
  {
    id: 3,
    title: "Ocean Conservation: Protecting Marine Ecosystems",
    description: "Dive into innovative ocean conservation projects protecting coral reefs and marine biodiversity in Southeast Asia's waters. Witness restoration efforts and community-led initiatives safeguarding our oceans for future generations.",
    thumbnail: "https://images.unsplash.com/photo-1592495169089-a37c0b5b96bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwYXJ0aWNsZXxlbnwxfHx8fDE3NjMzNjA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "15:22",
    views: "38K",
    date: "2024-11-09"
  },
  {
    id: 4,
    title: "Zero Waste Cities: A Documentary",
    description: "Journey through cities achieving near-zero waste through comprehensive recycling programs and circular economy initiatives. Discover how urban planning, technology, and citizen engagement create sustainable waste management systems.",
    thumbnail: "https://images.unsplash.com/photo-1585871746932-e133d3fedf4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGRldmVsb3BtZW50JTIwbmV3c3xlbnwxfHx8fDE3NjMzNjA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "22:30",
    views: "67K",
    date: "2024-11-07"
  },
  {
    id: 5,
    title: "Green Buildings: Architecture for Tomorrow",
    description: "Tour cutting-edge sustainable buildings that combine beauty with environmental responsibility. See how architects and engineers create structures that produce more energy than they consume.",
    thumbnail: "https://images.unsplash.com/photo-1682890042999-53907226727d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN1c3RhaW5hYmlsaXR5JTIwY2l0eXxlbnwxfHx8fDE3NjMzNjA5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "14:20",
    views: "41K",
    date: "2024-11-05"
  },
  {
    id: 6,
    title: "Clean Water Innovation: Technology Meets Need",
    description: "Explore revolutionary water purification technologies bringing clean water to communities in need. From solar-powered filters to AI-monitored distribution systems.",
    thumbnail: "https://images.unsplash.com/photo-1688612273200-7a64a0af945e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwYWNjZXNzfGVufDF8fHx8MTc2MzM2MDk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "11:15",
    views: "34K",
    date: "2024-11-03"
  },
  {
    id: 7,
    title: "Wind Power: Harnessing Nature's Energy",
    description: "Follow the development of Asia's largest offshore wind farm from planning to operation. Understand how wind energy is becoming a cornerstone of renewable power generation.",
    thumbnail: "https://images.unsplash.com/photo-1630450364945-0c1ec2c449cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjB3aW5kfGVufDF8fHx8MTc2MzM2MDk1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "16:40",
    views: "56K",
    date: "2024-11-01"
  },
  {
    id: 8,
    title: "Education Revolution: Digital Learning in Rural Areas",
    description: "See how digital technology is bringing world-class education to remote villages. Mobile classrooms and satellite internet are bridging the education gap.",
    thumbnail: "https://images.unsplash.com/photo-1760267973986-5370a55550f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2MzMzNTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "13:25",
    views: "48K",
    date: "2024-10-29"
  },
  {
    id: 9,
    title: "Women Entrepreneurs: Building Sustainable Businesses",
    description: "Meet inspiring women entrepreneurs creating sustainable businesses that empower communities. Their stories of innovation and resilience are changing lives.",
    thumbnail: "https://images.unsplash.com/photo-1674115458346-c6925d68daef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW5kZXIlMjBlcXVhbGl0eSUyMHdvbWVufGVufDF8fHx8MTc2MzM2MDk1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "19:10",
    views: "62K",
    date: "2024-10-27"
  },
  {
    id: 10,
    title: "Biodiversity Hotspots: Preserving Nature's Treasures",
    description: "Journey through Asia's biodiversity hotspots and meet the people working to protect endangered species and critical ecosystems for future generations.",
    thumbnail: "https://images.unsplash.com/photo-1616164942300-88c616eb444b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwbmV3c3xlbnwxfHx8fDE3NjMzNjA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "20:55",
    views: "44K",
    date: "2024-10-25"
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] =
    React.useState("All News");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentArticlePage, setCurrentArticlePage] = React.useState(1);
  const [currentVideoPage, setCurrentVideoPage] = React.useState(1);
  const [currentStoryPage, setCurrentStoryPage] = React.useState(1);
  
  const articlesPerPage = 12; // Changed from 6 to 12 for recent updates
  const videosPerPage = 6;
  const storiesPerPage = 6; // Max 6 featured stories per page

  // Load news from localStorage or use defaults
  const [news, setNews] = React.useState(defaultNews);
  const [loadedArticles, setLoadedArticles] = React.useState(articles);
  const [loadedVideos, setLoadedVideos] = React.useState(videos);
  
  React.useEffect(() => {
    // Load featured stories
    const savedNews = localStorage.getItem('newsStories');
    if (savedNews) {
      try {
        const parsed = JSON.parse(savedNews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNews(parsed);
        }
      } catch (error) {
        console.error('Error loading news from localStorage:', error);
      }
    }

    // Load in-depth articles
    const savedArticles = localStorage.getItem('newsArticles');
    if (savedArticles) {
      try {
        const parsed = JSON.parse(savedArticles);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLoadedArticles(parsed);
        }
      } catch (error) {
        console.error('Error loading articles from localStorage:', error);
      }
    }

    // Load featured videos
    const savedVideos = localStorage.getItem('newsVideos');
    if (savedVideos) {
      try {
        const parsed = JSON.parse(savedVideos);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLoadedVideos(parsed);
        }
      } catch (error) {
        console.error('Error loading videos from localStorage:', error);
      }
    }
  }, []);

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

  const filteredArticles = loadedArticles.filter((article) => {
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

  const filteredVideos = loadedVideos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All News" ||
      video.category === selectedCategory;
    const matchesSearch =
      video.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      video.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedArticles = filteredArticles.slice(
    (currentArticlePage - 1) * articlesPerPage,
    currentArticlePage * articlesPerPage
  );

  const paginatedVideos = filteredVideos.slice(
    (currentVideoPage - 1) * videosPerPage,
    currentVideoPage * videosPerPage
  );

  const paginatedStories = featuredNews.slice(
    (currentStoryPage - 1) * storiesPerPage,
    currentStoryPage * storiesPerPage
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
                {paginatedStories.map((article, index) => (
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

              {/* Pagination for Stories */}
              {featuredNews.length > storiesPerPage && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-4 mt-12"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="group hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300"
                    onClick={() => setCurrentStoryPage(currentStoryPage - 1)}
                    disabled={currentStoryPage === 1}
                  >
                    <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(featuredNews.length / storiesPerPage) }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentStoryPage(i + 1)}
                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                          currentStoryPage === i + 1
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                            : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="group hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300"
                    onClick={() => setCurrentStoryPage(currentStoryPage + 1)}
                    disabled={currentStoryPage * storiesPerPage >= featuredNews.length}
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}
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
            Let's build a greener future together! 💚
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stay connected with the latest progress in
            sustainable development. From community projects to
            global breakthroughs, we're sharing stories that
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

        {/* Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              In-Depth Articles
            </h2>
          </div>
          
          {/* Magazine-Style Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className={`group cursor-pointer ${
                  article.featured && index === 0 
                    ? 'md:col-span-2 lg:col-span-2 md:row-span-2' 
                    : ''
                }`}
              >
                <Card className="h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Image Section */}
                  <div className={`relative overflow-hidden ${
                    article.featured && index === 0 
                      ? 'h-96' 
                      : 'h-56'
                  }`}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none shadow-lg">
                        {article.category}
                      </Badge>
                    </div>
                    
                    {/* Featured Badge */}
                    {article.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none shadow-lg">
                          ⭐ Featured
                        </Badge>
                      </div>
                    )}
                    
                    {/* Title Overlay on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className={`text-white mb-2 group-hover:text-blue-300 transition-colors duration-200 ${
                        article.featured && index === 0 
                          ? 'text-3xl' 
                          : 'text-xl'
                      }`}>
                        {article.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-xs text-white/80">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.author}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <CardContent className="p-6">
                    <p className={`text-gray-600 dark:text-gray-300 leading-relaxed mb-4 ${
                      article.featured && index === 0 
                        ? 'line-clamp-4 text-base' 
                        : 'line-clamp-3 text-sm'
                    }`}>
                      {article.excerpt}
                    </p>
                    
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group/btn w-full justify-between px-0"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </CardContent>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl" />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination for Articles */}
          {filteredArticles.length > articlesPerPage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                className="group hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300"
                onClick={() => setCurrentArticlePage(currentArticlePage - 1)}
                disabled={currentArticlePage === 1}
              >
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentArticlePage(i + 1)}
                    className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                      currentArticlePage === i + 1
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="lg"
                className="group hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300"
                onClick={() => setCurrentArticlePage(currentArticlePage + 1)}
                disabled={currentArticlePage * articlesPerPage >= filteredArticles.length}
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Videos Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Videos
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Video Thumbnail */}
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-90 transition-all duration-500"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300"
                      >
                        <Play className="w-10 h-10 text-purple-600 group-hover:text-white ml-1 transition-colors" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-black/70 backdrop-blur-sm text-white border-none">
                        {video.duration}
                      </Badge>
                    </div>
                    
                    {/* Views Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/70 backdrop-blur-sm text-white border-none">
                        <Eye className="w-3 h-3 mr-1" />
                        {video.views} views
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Video Content */}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(video.date).toLocaleDateString()}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {video.description}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                      <Button
                        variant="ghost"
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 w-full justify-center group/btn"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination for Videos */}
          {filteredVideos.length > videosPerPage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                className="group hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300"
                onClick={() => setCurrentVideoPage(currentVideoPage - 1)}
                disabled={currentVideoPage === 1}
              >
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.ceil(filteredVideos.length / videosPerPage) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentVideoPage(i + 1)}
                    className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                      currentVideoPage === i + 1
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="lg"
                className="group hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300"
                onClick={() => setCurrentVideoPage(currentVideoPage + 1)}
                disabled={currentVideoPage * videosPerPage >= filteredVideos.length}
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}