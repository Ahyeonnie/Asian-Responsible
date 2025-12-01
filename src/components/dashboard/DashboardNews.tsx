import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Save, Plus, Trash2, Upload, Edit, Video, Eye, Star, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { FileUpload } from './FileUpload';
import { ConfirmDialog } from '../ui/confirm-dialog';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  featured: boolean;
}

interface NewsVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: string;
}

interface FeaturedStory {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  sdg: number;
  featured: boolean;
  image: string;
  useCustomImage: boolean;
}

// Default in-depth articles
const defaultArticles: NewsArticle[] = [
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

// Default featured videos
const defaultVideos: NewsVideo[] = [
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

// Default featured stories
const defaultStories: FeaturedStory[] = [
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

export default function DashboardNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [videos, setVideos] = useState<NewsVideo[]>([]);
  const [featuredStories, setFeaturedStories] = useState<FeaturedStory[]>([]);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [editingVideo, setEditingVideo] = useState<NewsVideo | null>(null);
  const [editingStory, setEditingStory] = useState<FeaturedStory | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Confirmation dialog states
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "default" | "destructive";
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
    variant: 'default'
  });

  // Load data on component mount - sync with website
  useEffect(() => {
    loadArticles();
    loadVideos();
    loadFeaturedStories();
  }, []);

  const loadArticles = () => {
    const saved = localStorage.getItem('newsArticles');
    if (saved) {
      try {
        setArticles(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading articles:', error);
        setArticles(defaultArticles);
        localStorage.setItem('newsArticles', JSON.stringify(defaultArticles));
      }
    } else {
      setArticles(defaultArticles);
      localStorage.setItem('newsArticles', JSON.stringify(defaultArticles));
    }
  };

  const loadVideos = () => {
    const saved = localStorage.getItem('newsVideos');
    if (saved) {
      try {
        setVideos(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading videos:', error);
        setVideos(defaultVideos);
        localStorage.setItem('newsVideos', JSON.stringify(defaultVideos));
      }
    } else {
      setVideos(defaultVideos);
      localStorage.setItem('newsVideos', JSON.stringify(defaultVideos));
    }
  };

  const loadFeaturedStories = () => {
    const saved = localStorage.getItem('newsStories');
    if (saved) {
      try {
        setFeaturedStories(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading featured stories:', error);
      }
    } else {
      setFeaturedStories(defaultStories);
      localStorage.setItem('newsStories', JSON.stringify(defaultStories));
    }
  };

  const saveArticles = (updatedArticles: NewsArticle[]) => {
    localStorage.setItem('newsArticles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  };

  const saveVideos = (updatedVideos: NewsVideo[]) => {
    localStorage.setItem('newsVideos', JSON.stringify(updatedVideos));
    setVideos(updatedVideos);
  };

  const saveFeaturedStories = (updatedStories: FeaturedStory[]) => {
    localStorage.setItem('newsStories', JSON.stringify(updatedStories));
    setFeaturedStories(updatedStories);
  };

  // Article CRUD operations
  const handleSaveArticle = () => {
    if (editingArticle) {
      const action = editingArticle.id === 0 ? 'create' : 'update';
      setConfirmDialog({
        open: true,
        title: action === 'create' ? 'Create Article' : 'Update Article',
        description: action === 'create' 
          ? 'Are you sure you want to create this article? It will be immediately visible on the website.'
          : 'Are you sure you want to save these changes? The article will be updated on the website.',
        onConfirm: () => {
          if (editingArticle.id === 0) {
            const newArticle = { ...editingArticle, id: Date.now() };
            saveArticles([...articles, newArticle]);
            toast.success('Article created successfully!');
          } else {
            saveArticles(articles.map(a => a.id === editingArticle.id ? editingArticle : a));
            toast.success('Article updated successfully!');
          }
          setEditingArticle(null);
        },
        variant: 'default'
      });
    }
  };

  const handleDeleteArticle = (id: number) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Article',
      description: 'Are you sure you want to delete this article?',
      onConfirm: () => {
        saveArticles(articles.filter(a => a.id !== id));
        toast.success('Article deleted successfully!');
      },
      variant: 'destructive'
    });
  };

  // Video CRUD operations
  const handleSaveVideo = () => {
    if (editingVideo) {
      if (editingVideo.id === 0) {
        const newVideo = { ...editingVideo, id: Date.now() };
        saveVideos([...videos, newVideo]);
        toast.success('Video created successfully!');
      } else {
        saveVideos(videos.map(v => v.id === editingVideo.id ? editingVideo : v));
        toast.success('Video updated successfully!');
      }
      setEditingVideo(null);
    }
  };

  const handleDeleteVideo = (id: number) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Video',
      description: 'Are you sure you want to delete this video?',
      onConfirm: () => {
        saveVideos(videos.filter(v => v.id !== id));
        toast.success('Video deleted successfully!');
      },
      variant: 'destructive'
    });
  };

  // Featured Story CRUD operations
  const handleSaveStory = () => {
    if (editingStory) {
      if (editingStory.id === 0) {
        const newStory = { ...editingStory, id: Date.now() };
        saveFeaturedStories([...featuredStories, newStory]);
        toast.success('Featured story created successfully!');
      } else {
        saveFeaturedStories(featuredStories.map(s => s.id === editingStory.id ? editingStory : s));
        toast.success('Featured story updated successfully!');
      }
      setEditingStory(null);
    }
  };

  const handleDeleteStory = (id: number) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Featured Story',
      description: 'Are you sure you want to delete this featured story?',
      onConfirm: () => {
        saveFeaturedStories(featuredStories.filter(s => s.id !== id));
        toast.success('Featured story deleted successfully!');
      },
      variant: 'destructive'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            News Management
          </h1>
          <p className="text-gray-500 mt-1">Manage all news content - articles, videos, and featured stories</p>
        </div>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="articles">
            <Eye className="h-4 w-4 mr-2" />
            In-Depth Articles ({articles.length})
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Featured Videos ({videos.length})
          </TabsTrigger>
          <TabsTrigger value="stories">
            <Star className="h-4 w-4 mr-2" />
            Featured Stories ({featuredStories.length})
          </TabsTrigger>
        </TabsList>

        {/* In-Depth Articles Tab */}
        <TabsContent value="articles" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Magazine-style articles displayed in the News section
            </p>
            <Button
              onClick={() => setEditingArticle({
                id: 0,
                title: '',
                description: '',
                excerpt: '',
                image: '',
                date: new Date().toISOString().split('T')[0],
                category: 'Clean Energy',
                author: '',
                readTime: '5 min read',
                featured: false
              })}
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </div>

          <div className="grid gap-4">
            {articles.map((article) => (
              <Card key={article.id} className={article.featured ? "border-yellow-400 border-2" : ""}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {article.image && (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-32 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg">{article.title}</h3>
                            {article.featured && (
                              <Badge className="bg-yellow-500">Featured</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{article.description}</p>
                          <div className="flex gap-4 text-xs text-gray-400">
                            <span>{article.date}</span>
                            <span>{article.category}</span>
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingArticle(article)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingArticle && (
            <Card className="border-2 border-blue-500 mt-6">
              <CardHeader>
                <CardTitle>{editingArticle.id === 0 ? 'New Article' : 'Edit Article'}</CardTitle>
                <CardDescription>Create engaging in-depth articles for your readers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={editingArticle.title}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      placeholder="Article title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Author *</Label>
                    <Input
                      value={editingArticle.author}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                      placeholder="Dr. Sarah Chen"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Excerpt (Short Summary) *</Label>
                  <Textarea
                    value={editingArticle.excerpt}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                    placeholder="One-line summary for cards..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Full Description *</Label>
                  <Textarea
                    value={editingArticle.description}
                    onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
                    placeholder="Detailed article content..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Input
                      value={editingArticle.category}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      placeholder="Clean Energy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={editingArticle.date}
                      onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time *</Label>
                    <Input
                      value={editingArticle.readTime}
                      onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                      placeholder="8 min read"
                    />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingArticle.featured}
                        onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Featured Image *</Label>
                  <div className="flex gap-2 items-center mb-2">
                    <Button
                      type="button"
                      size="sm"
                      variant={editingArticle.image && !editingArticle.image.startsWith('data:') ? "default" : "outline"}
                      onClick={() => {
                        const useUrl = editingArticle.image && editingArticle.image.startsWith('data:');
                        if (useUrl) {
                          setEditingArticle({ ...editingArticle, image: '' });
                        }
                      }}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      {editingArticle.image && !editingArticle.image.startsWith('data:') ? 'Using URL' : 'Use URL Instead'}
                    </Button>
                  </div>
                  
                  {editingArticle.image && !editingArticle.image.startsWith('data:') ? (
                    <div className="space-y-2">
                      <Input
                        value={editingArticle.image}
                        onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                      {editingArticle.image && (
                        <img src={editingArticle.image} alt="Preview" className="w-full h-48 object-cover rounded" />
                      )}
                    </div>
                  ) : (
                    <FileUpload
                      accept="image/*"
                      maxSize={5}
                      currentFile={editingArticle.image}
                      onUpload={(base64) => setEditingArticle({ ...editingArticle, image: base64 })}
                      type="image"
                      label="Upload Article Image"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingArticle(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveArticle} className="bg-gradient-to-r from-yellow-500 to-blue-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Article
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Featured Videos Tab */}
        <TabsContent value="videos" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Video content featured in the News section
            </p>
            <Button
              onClick={() => setEditingVideo({
                id: 0,
                title: '',
                description: '',
                thumbnail: '',
                duration: '',
                views: '0',
                date: new Date().toISOString().split('T')[0]
              })}
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </div>

          <div className="grid gap-4">
            {videos.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {video.thumbnail && (
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-48 h-28 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Video className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg">{video.title}</h3>
                          </div>
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{video.description}</p>
                          <div className="flex gap-4 text-xs text-gray-400">
                            <span>{video.date}</span>
                            <span>{video.duration}</span>
                            <span>{video.views} views</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingVideo(video)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => handleDeleteVideo(video.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingVideo && (
            <Card className="border-2 border-blue-500 mt-6">
              <CardHeader>
                <CardTitle>{editingVideo.id === 0 ? 'New Video' : 'Edit Video'}</CardTitle>
                <CardDescription>Add featured videos to showcase your work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={editingVideo.title}
                      onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                      placeholder="Video title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={editingVideo.date}
                      onChange={(e) => setEditingVideo({ ...editingVideo, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={editingVideo.description}
                    onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                    placeholder="Detailed video description..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration *</Label>
                    <Input
                      value={editingVideo.duration}
                      onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                      placeholder="12:34"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Views</Label>
                    <Input
                      value={editingVideo.views}
                      onChange={(e) => setEditingVideo({ ...editingVideo, views: e.target.value })}
                      placeholder="45K"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail Image *</Label>
                  <div className="flex gap-2 items-center mb-2">
                    <Button
                      type="button"
                      size="sm"
                      variant={editingVideo.thumbnail && !editingVideo.thumbnail.startsWith('data:') ? "default" : "outline"}
                      onClick={() => {
                        const useUrl = editingVideo.thumbnail && editingVideo.thumbnail.startsWith('data:');
                        if (useUrl) {
                          setEditingVideo({ ...editingVideo, thumbnail: '' });
                        }
                      }}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      {editingVideo.thumbnail && !editingVideo.thumbnail.startsWith('data:') ? 'Using URL' : 'Use URL Instead'}
                    </Button>
                  </div>
                  
                  {editingVideo.thumbnail && !editingVideo.thumbnail.startsWith('data:') ? (
                    <div className="space-y-2">
                      <Input
                        value={editingVideo.thumbnail}
                        onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                      {editingVideo.thumbnail && (
                        <img src={editingVideo.thumbnail} alt="Preview" className="w-full h-48 object-cover rounded" />
                      )}
                    </div>
                  ) : (
                    <FileUpload
                      accept="image/*"
                      maxSize={5}
                      currentFile={editingVideo.thumbnail}
                      onUpload={(base64) => setEditingVideo({ ...editingVideo, thumbnail: base64 })}
                      type="image"
                      label="Upload Video Thumbnail"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingVideo(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveVideo} className="bg-gradient-to-r from-yellow-500 to-blue-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Featured Stories Tab */}
        <TabsContent value="stories" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Hero stories with custom images displayed at the top of News section
            </p>
            <Button
              onClick={() => setEditingStory({
                id: 0,
                title: '',
                excerpt: '',
                date: new Date().toISOString().split('T')[0],
                readTime: '5 min read',
                category: 'Clean Energy',
                sdg: 7,
                featured: false,
                image: '',
                useCustomImage: false
              })}
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Story
            </Button>
          </div>

          <div className="grid gap-4">
            {featuredStories.map((story) => (
              <Card key={story.id} className={story.featured ? "border-yellow-400 border-2" : ""}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg">{story.title}</h3>
                        {story.featured && (
                          <Badge className="bg-yellow-500">Featured</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{story.excerpt}</p>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>{story.date}</span>
                        <span>{story.category}</span>
                        <span>SDG {story.sdg}</span>
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingStory(story)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteStory(story.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingStory && (
            <Card className="border-2 border-blue-500 mt-6">
              <CardHeader>
                <CardTitle>{editingStory.id === 0 ? 'New Featured Story' : 'Edit Featured Story'}</CardTitle>
                <CardDescription>Hero stories with custom images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={editingStory.title}
                      onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                      placeholder="Story title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={editingStory.date}
                      onChange={(e) => setEditingStory({ ...editingStory, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Excerpt *</Label>
                  <Textarea
                    value={editingStory.excerpt}
                    onChange={(e) => setEditingStory({ ...editingStory, excerpt: e.target.value })}
                    placeholder="Story description..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Input
                      value={editingStory.category}
                      onChange={(e) => setEditingStory({ ...editingStory, category: e.target.value })}
                      placeholder="Clean Energy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SDG Number *</Label>
                    <Input
                      type="number"
                      min="1"
                      max="17"
                      value={editingStory.sdg}
                      onChange={(e) => setEditingStory({ ...editingStory, sdg: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time *</Label>
                    <Input
                      value={editingStory.readTime}
                      onChange={(e) => setEditingStory({ ...editingStory, readTime: e.target.value })}
                      placeholder="5 min read"
                    />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingStory.featured}
                        onChange={(e) => setEditingStory({ ...editingStory, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Image (Unsplash search query or URL)</Label>
                  <Input
                    value={editingStory.image}
                    onChange={(e) => setEditingStory({ ...editingStory, image: e.target.value })}
                    placeholder="solar schools bangladesh education"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingStory(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveStory} className="bg-gradient-to-r from-yellow-500 to-blue-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={() => {
          confirmDialog.onConfirm();
          setConfirmDialog({ ...confirmDialog, open: false });
        }}
        variant={confirmDialog.variant}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}