import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Award, Trophy, Star, Medal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import climateNeutralAward from 'figma:asset/8d86444612d842f0a62ae183b8e3ede8a1f353dc.png';
import climateNeutralHeroes from 'figma:asset/978e9bf39355758944f80e53089e3561bd792628.png';

const defaultAwards = [
  {
    id: 1,
    title: "SDG Action Award 2024",
    organization: "UN Global Compact",
    category: "Climate Action",
    year: "2024",
    description:
      "Outstanding contribution to climate action initiatives and carbon neutrality goals.",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-yellow-400 to-yellow-600",
    sdg: 13,
  },
  {
    id: 2,
    title: "Sustainable Innovation Prize",
    organization: "World Economic Forum",
    category: "Clean Energy",
    year: "2023",
    description:
      "Revolutionary approach to affordable and clean energy solutions in developing countries.",
    icon: <Award className="w-6 h-6" />,
    color: "from-blue-400 to-blue-600",
    sdg: 7,
  },
];

const defaultAchievementStats = [
  {
    label: "Nominated Individuals",
    value: "25+",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    label: "SDGs Addressed",
    value: "17",
    icon: <Star className="w-6 h-6" />,
  },
  {
    label: "Partner Organizations",
    value: "5+",
    icon: <Award className="w-6 h-6" />,
  },
  {
    label: "Years of Impact",
    value: "1",
    icon: <Medal className="w-6 h-6" />,
  },
];

export default function Awards() {
  // Load awards and stats from localStorage or use defaults
  const [awards, setAwards] = useState(defaultAwards);
  const [achievementStats, setAchievementStats] = useState(defaultAchievementStats);
  
  useEffect(() => {
    const savedAwardsData = localStorage.getItem('awardsData');
    if (savedAwardsData) {
      try {
        const parsed = JSON.parse(savedAwardsData);
        if (parsed.awards && Array.isArray(parsed.awards) && parsed.awards.length > 0) {
          // Restore icon JSX elements
          const awardsWithIcons = parsed.awards.map((award: any) => ({
            ...award,
            icon: <Trophy className="w-6 h-6" />
          }));
          setAwards(awardsWithIcons);
        }
        if (parsed.stats && Array.isArray(parsed.stats) && parsed.stats.length > 0) {
          // Restore icon JSX elements
          const statsWithIcons = parsed.stats.map((stat: any, index: number) => {
            const icons = [
              <Trophy className="w-6 h-6" />,
              <Star className="w-6 h-6" />,
              <Award className="w-6 h-6" />,
              <Medal className="w-6 h-6" />
            ];
            return {
              ...stat,
              icon: icons[index] || <Trophy className="w-6 h-6" />
            };
          });
          setAchievementStats(statsWithIcons);
        }
      } catch (error) {
        console.error('Error loading awards from localStorage:', error);
      }
    }
  }, []);

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-green-600 bg-clip-text text-transparent">
            Awards
          </h1>
          <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto">
            "Honoring the progress we've made and the milestones
            that bring us closer to a sustainable, equitable,
            and impactful future."
          </p>
        </motion.div>
      </div>
      
      {/* Full-Width Moving Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-16 w-full overflow-hidden relative"
      >
        <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 py-4 sm:py-6 relative w-full">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* First set of awards */}
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏆 Global Impact Leader
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌟 Climate Neutral Heroes
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🎯 SDG Champion 2024
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌍 Climate Neutral Heroes Award
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🤝 Partnership Excellence
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              📚 Climate Neutral Awards
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              ⚡ Clean Energy Innovator
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              💧 Water Conservation Champion
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏥 Health & Wellbeing Advocate
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🎓 Quality Education Promoter
            </span>
            
            {/* Second set for seamless loop */}
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏆 Global Impact Leader
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌟 Sustainable Innovation Pioneer
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🎯 SDG Champion 2024
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌍 Climate Action Award Winner
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🤝 Partnership Excellence
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              📚 Education Impact Leader
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              ⚡ Clean Energy Innovator
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              💧 Water Conservation Champion
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏥 Health & Wellbeing Advocate
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🎓 Quality Education Promoter
            </span>
            
            {/* Third set for extra smoothness on large screens */}
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏆 Global Impact Leader
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌟 Sustainable Innovation Pioneer
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🎯 SDG Champion 2024
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌍 Climate Action Award Winner
            </span>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-500 to-blue-600 bg-clip-text text-transparent">
            Featured Awards
          </h2>

          {/* Two Award Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Award 1 */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Climate Neutral Heroes Award Image */}
                <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl border-2 border-yellow-300 flex items-center justify-center group hover:from-yellow-200 hover:to-yellow-300 transition-all duration-300 overflow-hidden">
                  <motion.img 
                    src={climateNeutralHeroes} 
                    alt="Climate Neutral Heroes Award"
                    className="w-full h-full object-contain p-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Award Details */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                     Heroes Award
                    </Badge>
                    <Badge variant="outline">2025</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Climate Neutral Heroes Award
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Outstanding achievement in climate neutrality 
                    and sustainable development initiatives. This 
                    prestigious recognition celebrates our leadership 
                    in advancing climate action, environmental 
                    stewardship, and the United Nations Sustainable 
                    Development Goals.
                  </p>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700 font-medium">
                      Presented by Climate Neutral Heroes Initiative
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Award 2 */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Climate Neutral Awards Image */}
                <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl border-2 border-blue-300 flex items-center justify-center group hover:from-blue-200 hover:to-blue-300 transition-all duration-300 overflow-hidden">
                  <motion.img 
                    src={climateNeutralAward} 
                    alt="Climate Neutral Awards"
                    className="w-full h-full object-contain p-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Award Details */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                      Neutral Award
                    </Badge>
                    <Badge variant="outline">2023</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Climate Neutral Awards
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Recognized for exceptional commitment to climate neutrality 
                    and sustainable business practices. This award honors our 
                    innovative approach to reducing carbon footprint and 
                    promoting environmental responsibility across all operations.
                  </p>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Star className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 font-medium">
                      Presented by Climate Neutral Certified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievementStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
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

        {/* Awards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${award.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                    >
                      {award.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-black"
                      >
                        SDG {award.sdg}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-black"
                      >
                        {award.year}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200 dark:text-black mb-8">
                    {award.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 font-medium">
                    {award.organization}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge
                      className={`bg-gradient-to-r ${award.color} text-white border-none`}
                    >
                      {award.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {award.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 sm:p-12 text-white"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Join Our Impact Journey
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Together, we can achieve more milestones and create
            lasting change for a sustainable future.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
          >
            Partner With Us
          </motion.button>
        </motion.div>
      </div>
      
      {/* Second Full-Width Marquee - Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 w-full overflow-hidden relative"
      >
        <div className="bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 py-4 sm:py-6 relative w-full">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [-1200, 0] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* First set - moving right to left */}
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌱 Green Enterprise Excellence Award
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌊 Ocean Conservation Champion
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              ♻️ Circular Economy Pioneer
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌾 Food Security Innovator
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏭 Responsible Production Leader
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🤖 Technology for Good Award
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌐 Digital Inclusion Champion
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🔋 Renewable Energy Pioneer
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏘️ Smart Cities Advocate
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              ⚖️ Social Justice Champion
            </span>
            
            {/* Second set for seamless loop */}
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌱 Green Enterprise Excellence Award
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌊 Ocean Conservation Champion
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              ♻️ Circular Economy Pioneer
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌾 Food Security Innovator
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏭 Responsible Production Leader
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🤖 Technology for Good Award
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌐 Digital Inclusion Champion
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🔋 Renewable Energy Pioneer
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🏘️ Smart Cities Advocate
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              ⚖️ Social Justice Champion
            </span>
            
            {/* Third set for extra coverage */}
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌱 Green Enterprise Excellence Award
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌊 Ocean Conservation Champion
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              ♻️ Circular Economy Pioneer
            </span>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8">
              🌾 Food Security Innovator
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}