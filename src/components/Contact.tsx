import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Globe,
  Users,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    content: "website.climateneutrals @gmail.com",
    description:
      "Send us an email and we'll respond within 24 hours",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    content: "(+63) 968-858-1982",
    description:
      "Connect with our support team weekdays between 10 AM and 7 PM.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Us",
    content:
      "6789 Ayala Avenue,Salcedo Village, Brgy. Bel Air, Makati City, Metro Manila, ",
    description:
      "Our headquarters are open for meetings by appointment",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Live Chat",
    content: "Available 24/7",
    description:
      "Get instant support through our live chat system",
    color: "from-orange-500 to-orange-600",
  },
];

const departments = [
  { name: "General Inquiries", value: "general" },
  { name: "Partnership Opportunities", value: "partnerships" },
  { name: "Media & Press", value: "media" },
  { name: "Technical Support", value: "support" },
  { name: "Volunteer Program", value: "volunteer" },
  { name: "Research Collaboration", value: "research" },
];

const officeLocations = [
  {
    city: "New York",
    country: "United States",
    address: "123 Sustainable Street, NY 10001",
    timezone: "EST (UTC-5)",
    staff: 25,
  },
  {
    city: "Geneva",
    country: "Switzerland",
    address: "456 Development Avenue, Geneva 1201",
    timezone: "CET (UTC+1)",
    staff: 18,
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "789 Innovation Boulevard, Singapore 018956",
    timezone: "SGT (UTC+8)",
    staff: 22,
  },
  {
    city: "Nairobi",
    country: "Kenya",
    address: "321 Progress Road, Nairobi 00100",
    timezone: "EAT (UTC+3)",
    staff: 15,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",

    subject: "",
    message: "",
    
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      
   try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,   
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  
      {
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        subject: formData.subject,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY    
    );

      setIsSubmitted(true);
  } catch (error) {
    console.error("Email failed:", error);
  }

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          organization: "",

          subject: "",
          message: "",
        });
      }, 3000);
    };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-white mb-8">
            We’d love to hear from you! Reach out to learn more
            about our work, explore ways to collaborate, or join
            us in building a more sustainable future.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {info.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {info.content}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to
                  you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization (Optional)
                      </label>
                      <Input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Your organization name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Brief subject of your message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get
                      back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <a
                  href="https://www.facebook.com/climateneutralawards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  →Facebook
                </a>
                <a
                  href="https://www.facebook.com/hashtag/sdg2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  →#SDG2
                </a>
                <a
                  href="https://www.facebook.com/hashtag/agroecology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  →#Agroecology
                </a>
                <a
                  href="https://www.facebook.com/hashtag/agroecology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  →#BeAClimateHero
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How can I get involved?
              </h4>
              <p className="text-gray-600 text-sm">
                Join our community, volunteer for projects, or
                partner with us on initiatives aligned with the
                SDGs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Do you offer internships?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes! We offer internship opportunities
                year-round. Check our careers page for current
                openings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How do partnerships work?
              </h4>
              <p className="text-gray-600 text-sm">
                We collaborate with organizations that share our
                commitment to sustainable development goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I schedule a meeting?
              </h4>
              <p className="text-gray-600 text-sm">
                Absolutely! Contact us to schedule a meeting at
                any of our global office locations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}