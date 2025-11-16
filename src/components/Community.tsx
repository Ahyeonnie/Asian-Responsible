import React from "react";
import { motion } from "motion/react";
import {
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  Heart,
  Star,
  ArrowRight,
  Play,
  PlayCircle,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const communityStats = [
  {
    label: "Active Members",
    value: "30",
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "Projects Launched",
    value: "N/A",
    icon: <Star className="w-6 h-6" />,
  },
  {
    label: "Countries Reached",
    value: "N/A",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    label: "Impact Stories",
    value: "10",
    icon: <Heart className="w-6 h-6" />,
  },
];

interface HomeProps {
  onNavigate?: (tab: string) => void;
}


const featuredProjects = [
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    description:
      "Installing sustainable water filtration systems in remote villages across Southeast Asia.",
    members: 245,
    location: "Southeast Asia",
    sdg: 6,
    progress: 75,
    category: "Water & Sanitation",
  },
  {
    id: 2,
    title: "Youth Education Initiative",
    description:
      "Providing digital learning resources and mentorship to underserved youth globally.",
    members: 189,
    location: "Global",
    sdg: 4,
    progress: 60,
    category: "Education",
  },
  {
    id: 3,
    title: "Sustainable Agriculture Network",
    description:
      "Connecting farmers with sustainable farming techniques and climate-resilient crops.",
    members: 156,
    location: "Africa",
    sdg: 2,
    progress: 85,
    category: "Food Security",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Global Climate Action Webinar",
    date: "2024-02-15",
    time: "14:00 UTC",
    type: "Virtual",
    attendees: 2500,
    sdg: 13,
  },
  {
    id: 2,
    title: "Community Leaders Summit",
    date: "2024-02-28",
    time: "09:00 UTC",
    type: "Hybrid",
    attendees: 500,
    sdg: 17,
  },
  {
    id: 3,
    title: "Innovation Challenge Workshop",
    date: "2024-03-10",
    time: "16:00 UTC",
    type: "Virtual",
    attendees: 800,
    sdg: 9,
  },
];

const featuredVideos = [
  {
    id: 1,
    title: "Community Impact Stories",
    description:
      "See how our global community is creating sustainable change in their local regions.",
    thumbnail: "community impact stories",
    duration: "8:45",
    views: "125K",
    category: "Impact Stories",
    featured: true,
  },
  {
    id: 2,
    title: "Climate Action Workshop",
    description:
      "Learn practical strategies for implementing climate solutions in your community.",
    thumbnail: "climate workshop presentation",
    duration: "12:30",
    views: "89K",
    category: "Educational",
    featured: false,
  },
  {
    id: 3,
    title: "Youth Leadership Summit",
    description:
      "Young leaders share their innovative approaches to achieving the SDGs.",
    thumbnail: "youth leaders conference",
    duration: "15:20",
    views: "67K",
    category: "Leadership",
    featured: false,
  },
  {
    id: 4,
    title: "Partnership Success Stories",
    description:
      "Discover how collaboration across sectors is driving meaningful progress.",
    thumbnail: "partnership collaboration meeting",
    duration: "10:15",
    views: "43K",
    category: "Partnerships",
    featured: false,
  },
];

const testimonials = [
  {
    name: "Maria Santos",
    role: "Community Organizer",
    location: "Brazil",
    message:
      "This platform has connected me with like-minded individuals working on sustainable solutions in my region.",
    avatar: "woman professional brazil",
  },
  {
    name: "David Chen",
    role: "Environmental Engineer",
    location: "Singapore",
    message:
      "The collaborative projects here have helped me implement clean energy solutions in my local community.",
    avatar: "man engineer asian",
  },
  {
    name: "Aisha Patel",
    role: "Social Entrepreneur",
    location: "India",
    message:
      "Through this community, I found partners for my education initiative that has now reached over 10,000 students.",
    avatar: "woman entrepreneur india",
  },
];

export default function Community( {onNavigate}: HomeProps) {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-white mb-8">
            Join a global network of changemakers, innovators,
            and advocates working together to achieve the
            Sustainable Development Goals.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden mb-16 h-64 md:h-80"
        >
          <img
            src="https://images.unsplash.com/photo-1658734029438-d97357737bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29tbXVuaXR5JTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTg1ODAwODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Diverse community collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-pink-600/60 to-blue-600/80 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the Movement
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Be part of a community that's changing the world
              </p>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full"
                onClick={() => onNavigate?.("contact")}>
                Join Community
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Video Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Community in Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Watch inspiring stories and educational content
              from our global community of changemakers.
            </p>
          </div>

          {/* Featured Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            {featuredVideos
              .filter((video) => video.featured)
              .map((video) => (
                <div key={video.id} className="relative group">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/1200x600?${video.thumbnail}`}
                      alt={video.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Play Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-2xl cursor-pointer group-hover:bg-white transition-all duration-300">
                        <PlayCircle className="w-16 h-16 text-purple-600 group-hover:text-purple-700" />
                      </div>
                    </motion.div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                          {video.category}
                        </Badge>
                        <span className="text-white/80 text-sm flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          {video.duration}
                        </span>
                        <span className="text-white/80 text-sm">
                          {video.views} views
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {video.title}
                      </h3>
                      <p className="text-white/90 text-lg max-w-2xl">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos
              .filter((video) => !video.featured)
              .map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group cursor-pointer"
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/400x250?${video.thumbnail}`}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-6 h-6 text-purple-600 ml-1" />
                        </motion.div>
                      </div>

                      {/* Video Duration */}
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-black/70 text-white border-none text-xs">
                          {video.duration}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="outline"
                          className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                        >
                          {video.category}
                        </Badge>
                        <span className="text-gray-500 text-sm">
                          {video.views} views
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                        {video.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {video.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>

          {/* View All Videos Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Video className="w-5 h-5 mr-2" />
              View All Videos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Featured Projects 
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white mb-8">
            Featured Community Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                        SDG {project.sdg}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs dark:text-black"
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-600 transition-colors duration-200 text-[rgba(0,0,0,1)]">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          Progress
                        </span>
                        <span className="font-medium dark:text-black mb-8">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${project.progress}%`,
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.5,
                          }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.members} members
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Join Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Upcoming Events 
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">
                    SDG {event.sdg}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[rgba(0,0,0,1)]"
                  >
                    {event.type}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {event.attendees} expected attendees
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Register Now
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>*/}

        {/* Testimonials 
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white mb-8">
            Community Voices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/100x100?${testimonial.avatar}`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{testimonial.message}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of changemakers and start your
            journey towards sustainable impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <Button
             onClick={() => onNavigate?.("contact")}
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full"
            >
              Start a Project
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}