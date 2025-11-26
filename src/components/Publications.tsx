import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Book, Download, Eye, Calendar, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Publication {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  year: string;
  category: string;
  pages: number;
  summary: string;
  tableOfContents: string[];
  downloadUrl?: string;
}

const defaultPublicationsData: Publication[] = [
  {
    id: 1,
    title: 'Sustainability Impact Report 2024',
    description: 'Comprehensive analysis of our environmental and social impact initiatives across Asia',
    coverImage: 'https://images.unsplash.com/photo-1722706731979-f478967c868c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjMzNDkwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Annual Report',
    pages: 156,
    summary: 'This comprehensive report details our commitment to sustainable development and corporate responsibility. Through data-driven insights and real-world case studies, we showcase our progress toward achieving the UN Sustainable Development Goals across all 17 areas. The report includes detailed metrics on environmental conservation, social equity programs, and economic growth initiatives that have positively impacted millions of lives across Asia.',
    tableOfContents: [
      'Executive Summary',
      'Our Sustainability Vision',
      'Environmental Impact Assessment',
      'Social Responsibility Programs',
      'Economic Development Initiatives',
      'SDG Progress Tracker',
      'Case Studies from 6 Countries',
      'Future Roadmap 2025-2030'
    ]
  },
  {
    id: 2,
    title: 'Environmental Conservation Handbook',
    description: 'Best practices guide for environmental stewardship and conservation efforts',
    coverImage: 'https://images.unsplash.com/photo-1503467431153-c403061ea50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwcmVwb3J0JTIwYm9va3xlbnwxfHx8fDE3NjMzNDkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Educational Guide',
    pages: 204,
    summary: 'A practical handbook designed for organizations and individuals committed to environmental conservation. This guide provides actionable strategies for reducing carbon footprints, protecting biodiversity, and implementing sustainable practices. Featuring success stories from our partners across Asia, this publication serves as both inspiration and instruction for those dedicated to preserving our planet for future generations.',
    tableOfContents: [
      'Introduction to Conservation',
      'Climate Action Strategies',
      'Biodiversity Protection',
      'Sustainable Resource Management',
      'Renewable Energy Solutions',
      'Waste Reduction Techniques',
      'Community Engagement',
      'Monitoring and Evaluation'
    ]
  },
  {
    id: 3,
    title: 'Annual Impact Assessment 2023',
    description: 'Year-end review of organizational achievements and social impact metrics',
    coverImage: 'https://images.unsplash.com/photo-1621863367744-7363895606b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm51YWwlMjByZXBvcnQlMjBwdWJsaWNhdGlvbnxlbnwxfHx8fDE3NjMzNDkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2023',
    category: 'Annual Report',
    pages: 128,
    summary: 'Our 2023 Annual Impact Assessment provides a transparent look at our achievements, challenges, and learnings over the past year. With detailed analytics and stakeholder feedback, this report demonstrates our commitment to accountability and continuous improvement. From economic empowerment programs to educational initiatives, discover how we\'ve made a tangible difference in communities across Asia.',
    tableOfContents: [
      'Year in Review',
      'Financial Performance',
      'Program Highlights',
      'Stakeholder Engagement',
      'Impact Metrics',
      'Challenges and Solutions',
      'Partner Testimonials',
      'Looking Ahead to 2024'
    ]
  },
  {
    id: 4,
    title: 'Green Business Practices Guide',
    description: 'Implementing sustainable business models for corporate success',
    coverImage: 'https://images.unsplash.com/photo-1728977627327-da9907c25cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBib29rJTIwZ3JlZW58ZW58MXx8fHwxNzYzMzQ5MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Business Guide',
    pages: 178,
    summary: 'Transform your business with sustainable practices that benefit both the bottom line and the planet. This comprehensive guide outlines proven strategies for integrating environmental responsibility into core business operations. Learn from industry leaders who have successfully balanced profit with purpose, and discover how green business practices can drive innovation, reduce costs, and enhance brand reputation.',
    tableOfContents: [
      'The Business Case for Sustainability',
      'Green Supply Chain Management',
      'Energy Efficiency Strategies',
      'Circular Economy Models',
      'Sustainable Product Design',
      'Employee Engagement Programs',
      'Corporate Social Responsibility',
      'ROI and Impact Measurement'
    ]
  },
  {
    id: 5,
    title: 'Corporate Responsibility Journal',
    description: 'Quarterly insights on CSR trends and responsible enterprise practices',
    coverImage: 'https://images.unsplash.com/photo-1572028629184-6ecbfc2fcb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGpvdXJuYWwlMjBwdWJsaWNhdGlvbnxlbnwxfHx8fDE3NjMzNDkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Journal',
    pages: 92,
    summary: 'Our quarterly journal brings together thought leaders, practitioners, and researchers to explore the evolving landscape of corporate social responsibility. Each issue features in-depth articles, case studies, and expert opinions on topics ranging from ethical business practices to stakeholder capitalism. Stay informed about the latest trends shaping responsible business in Asia and beyond.',
    tableOfContents: [
      'Editor\'s Letter',
      'Featured Article: The Future of CSR',
      'Case Study: Community Development',
      'Expert Interview Series',
      'Industry Trends Analysis',
      'Best Practices Spotlight',
      'Research Highlights',
      'Resources and Tools'
    ]
  },
  {
    id: 6,
    title: 'Research & Innovation Magazine',
    description: 'Cutting-edge research on sustainable development and social innovation',
    coverImage: 'https://images.unsplash.com/photo-1761735485999-f3e7e531e149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMG1hZ2F6aW5lJTIwYm9va3xlbnwxfHx8fDE3NjMzNDkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Research',
    pages: 164,
    summary: 'Explore groundbreaking research and innovative solutions addressing the world\'s most pressing sustainability challenges. This magazine showcases cutting-edge projects, technological innovations, and collaborative research initiatives from leading institutions across Asia. From renewable energy breakthroughs to social innovation frameworks, discover the ideas shaping our sustainable future.',
    tableOfContents: [
      'Innovation Spotlight',
      'Research Breakthroughs',
      'Technology for Good',
      'Academic Partnerships',
      'Field Studies & Findings',
      'Innovation Labs',
      'Startup Showcases',
      'Future Research Agenda'
    ]
  },
  {
    id: 7,
    title: 'Climate Action Blueprint 2025',
    description: 'Strategic framework for combating climate change and building resilience',
    coverImage: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwYWN0aW9uJTIwcmVwb3J0fGVufDF8fHx8MTc2MzM1NzIyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2025',
    category: 'Strategic Plan',
    pages: 186,
    summary: 'A comprehensive blueprint outlining our climate action strategy for 2025 and beyond. This publication presents evidence-based approaches to reducing emissions, building climate resilience, and transitioning to a low-carbon economy. With detailed action plans, policy recommendations, and investment frameworks, this guide serves as a roadmap for organizations committed to meaningful climate action.',
    tableOfContents: [
      'Climate Crisis Overview',
      'Emission Reduction Targets',
      'Renewable Energy Transition',
      'Climate Adaptation Strategies',
      'Carbon Offset Programs',
      'Policy and Advocacy',
      'Investment Opportunities',
      'Monitoring and Reporting'
    ]
  },
  {
    id: 8,
    title: 'Leadership for Sustainability',
    description: 'Essential skills and mindsets for leading sustainable transformation',
    coverImage: 'https://images.unsplash.com/photo-1658198430813-c9f783ec2572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MzM1NzIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Leadership',
    pages: 142,
    summary: 'Develop the leadership capabilities needed to drive sustainable transformation in your organization. This book combines practical frameworks with inspiring case studies from sustainability leaders across Asia. Learn how to build purpose-driven cultures, engage stakeholders, navigate complexity, and lead with vision to create lasting positive impact for people and planet.',
    tableOfContents: [
      'The Sustainable Leadership Mindset',
      'Vision and Purpose',
      'Stakeholder Engagement',
      'Change Management',
      'Building Sustainable Cultures',
      'Decision-Making Frameworks',
      'Measuring Impact',
      'Leadership Case Studies'
    ]
  },
  {
    id: 9,
    title: 'Social Innovation Handbook',
    description: 'Practical approaches to solving social challenges through innovation',
    coverImage: 'https://images.unsplash.com/photo-1574494462217-e77ee1631f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBpbXBhY3QlMjBoYW5kYm9va3xlbnwxfHx8fDE3NjMzNTcyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Innovation Guide',
    pages: 198,
    summary: 'Unlock the power of social innovation to address pressing societal challenges. This handbook provides frameworks, methodologies, and tools for designing, implementing, and scaling innovative solutions to social problems. Featuring real-world examples from successful social enterprises and community initiatives, this publication empowers change-makers to create meaningful impact.',
    tableOfContents: [
      'Understanding Social Innovation',
      'Design Thinking for Social Change',
      'Community-Based Solutions',
      'Technology and Innovation',
      'Funding and Sustainability',
      'Scaling Impact',
      'Partnerships and Collaboration',
      'Success Stories'
    ]
  },
  {
    id: 10,
    title: 'Innovation Accelerator Report',
    description: 'Highlights from our startup incubation and innovation programs',
    coverImage: 'https://images.unsplash.com/photo-1674664985250-4d023c679b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwZ3VpZGUlMjBib29rfGVufDF8fHx8MTc2MzM1NzIyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Innovation',
    pages: 112,
    summary: 'Discover the innovative startups and projects emerging from our accelerator programs. This report showcases breakthrough solutions in sustainability, technology, and social impact developed by entrepreneurs across Asia. Learn about our incubation methodology, success metrics, and the inspiring stories of founders building the future we need.',
    tableOfContents: [
      'Program Overview',
      'Selection Criteria',
      'Startup Profiles',
      'Innovation Highlights',
      'Mentorship Network',
      'Investment and Funding',
      'Growth Metrics',
      'Alumni Success Stories'
    ]
  },
  {
    id: 11,
    title: 'Sustainable Development Quarterly',
    description: 'Latest insights and trends in sustainable development across Asia',
    coverImage: 'https://images.unsplash.com/photo-1760992004202-7df4128f7ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMG1hZ2F6aW5lfGVufDF8fHx8MTc2MzM1NzIyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Magazine',
    pages: 88,
    summary: 'Stay updated with the latest developments in sustainable development through our quarterly magazine. Each issue features expert analysis, emerging trends, policy updates, and inspiring stories from the frontlines of sustainability work across Asia. With contributions from leading practitioners and researchers, this publication keeps you informed and inspired.',
    tableOfContents: [
      'Editorial: Quarterly Highlights',
      'SDG Progress Update',
      'Policy and Regulation',
      'Technology Innovations',
      'Regional Focus: Southeast Asia',
      'Expert Perspectives',
      'Resources and Events',
      'Photo Essay: Impact in Action'
    ]
  },
  {
    id: 12,
    title: 'Enterprise Performance Report 2024',
    description: 'Comprehensive review of organizational performance and achievements',
    coverImage: 'https://images.unsplash.com/photo-1621863367744-7363895606b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHJlcG9ydCUyMHB1YmxpY2F0aW9ufGVufDF8fHx8MTc2MzM1NzIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '2024',
    category: 'Performance Report',
    pages: 134,
    summary: 'Our annual performance report provides comprehensive insights into our organizational achievements, financial results, and strategic initiatives. With detailed metrics, stakeholder testimonials, and forward-looking plans, this publication demonstrates our commitment to transparency, accountability, and continuous excellence in driving sustainable enterprise practices.',
    tableOfContents: [
      'CEO Message',
      'Performance Highlights',
      'Financial Review',
      'Operational Excellence',
      'Innovation and Growth',
      'People and Culture',
      'Governance and Ethics',
      'Strategic Outlook 2025'
    ]
  }
];

export default function Publications() {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Load publications from localStorage or use defaults
  const [publicationsData, setPublicationsData] = useState<Publication[]>(defaultPublicationsData);
  
  React.useEffect(() => {
    const savedPublications = localStorage.getItem('publicationsData');
    if (savedPublications) {
      try {
        const parsed = JSON.parse(savedPublications);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPublicationsData(parsed);
        }
      } catch (error) {
        console.error('Error loading publications from localStorage:', error);
      }
    }
  }, []);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(publicationsData.length / itemsPerPage);
  
  // Get current page publications
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPublications = publicationsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-6 shadow-2xl"
          >
            <Book className="w-10 h-10 text-white" strokeWidth={2} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 bg-clip-text text-transparent mb-4"
          >
            Publications
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6"
          >
            Explore our comprehensive collection of reports, guides, and research on sustainable development and responsible enterprise
          </motion.p>

          {/* Page indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-lg border border-gray-200 dark:border-slate-700"
          >
            <Book className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages} • {publicationsData.length} Publications
            </span>
          </motion.div>
        </motion.div>

        {/* Publications Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentPublications.map((publication, index) => (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setHoveredId(publication.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedPublication(publication)}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700">
                  {/* Book Cover Image */}
                  <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600">
                    <motion.img
                      src={publication.coverImage}
                      alt={publication.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Overlay on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === publication.id ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredId === publication.id ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <Eye className="w-12 h-12 text-white" strokeWidth={2} />
                        <span className="text-white font-semibold">View Publication</span>
                      </motion.div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-0">
                        {publication.category}
                      </Badge>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
                        {publication.year}
                      </Badge>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {publication.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {publication.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{publication.pages} pages</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium"
                      >
                        <Book className="w-4 h-4" />
                        <span>Read More</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6 mb-12"
          >
            {/* Page Navigation Buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <motion.button
                    key={pageNum}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-110'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Page Dots Indicator */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <motion.button
                  key={pageNum}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => goToPage(pageNum)}
                  className={`transition-all duration-300 rounded-full ${
                    currentPage === pageNum
                      ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-green-600'
                      : 'w-3 h-3 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Publication Modal */}
      <Dialog open={!!selectedPublication} onOpenChange={() => setSelectedPublication(null)}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border-0 shadow-2xl p-0 overflow-hidden"
          {...(selectedPublication && { 'aria-describedby': `publication-${selectedPublication.id}-description` })}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedPublication ? selectedPublication.title : 'Publication Details'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPublication && (
            <ScrollArea className="h-full max-h-[90vh]">
              <div className="relative">
                {/* Header Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={selectedPublication.coverImage}
                    alt={selectedPublication.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-white/20 text-white backdrop-blur-sm border-white/30">
                        {selectedPublication.category}
                      </Badge>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm border-white/30">
                        <Calendar className="w-3 h-3 mr-1" />
                        {selectedPublication.year}
                      </Badge>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm border-white/30">
                        <FileText className="w-3 h-3 mr-1" />
                        {selectedPublication.pages} pages
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{selectedPublication.title}</h2>
                    <p className="text-white/90">{selectedPublication.description}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Book className="w-6 h-6 text-blue-600" />
                      Overview
                    </h3>
                    <p 
                      id={`publication-${selectedPublication.id}-description`}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                    >
                      {selectedPublication.summary}
                    </p>
                  </motion.div>

                  {/* Table of Contents */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-green-600" />
                      Table of Contents
                    </h3>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                      <div className="space-y-3">
                        {selectedPublication.tableOfContents.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="flex items-start gap-3 group cursor-pointer hover:bg-white/50 dark:hover:bg-slate-600/50 p-3 rounded-lg transition-all"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Book Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Preview</h3>
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={selectedPublication.coverImage}
                        alt={`${selectedPublication.title} preview`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      Read Online
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </motion.button>
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6"
                  >
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">About This Publication</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-white/50 dark:bg-slate-600/50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedPublication.year}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Published</div>
                      </div>
                      <div className="bg-white/50 dark:bg-slate-600/50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedPublication.pages}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pages</div>
                      </div>
                      <div className="bg-white/50 dark:bg-slate-600/50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{selectedPublication.tableOfContents.length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Chapters</div>
                      </div>
                      <div className="bg-white/50 dark:bg-slate-600/50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">PDF</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Format</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}