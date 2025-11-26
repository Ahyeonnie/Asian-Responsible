import React, { useState, useEffect } from "react";
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

interface ContactInfo {
  icon: JSX.Element;
  title: string;
  content: string;
  description: string;
  color: string;
}

const defaultContactInfo: ContactInfo[] = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    content: "kennethrocete.cna@gmail.com",
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
  // Load contact data from localStorage
  const [contactInfo, setContactInfo] = useState(defaultContactInfo);
  const [offices, setOffices] = useState(officeLocations);
  
  useEffect(() => {
    const saved = localStorage.getItem('contactData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.contactInfo && Array.isArray(parsed.contactInfo)) {
          // Restore icon JSX elements
          const contactInfoWithIcons = parsed.contactInfo.map((info: any, index: number) => ({
            ...info,
            icon: defaultContactInfo[index]?.icon || <Mail className="w-6 h-6" />
          }));
          setContactInfo(contactInfoWithIcons);
        }
        if (parsed.offices && Array.isArray(parsed.offices)) {
          setOffices(parsed.offices);
        }
      } catch (error) {
        console.error('Error loading contact data:', error);
      }
    }
  }, []);

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

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
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg mb-16"
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

        {/* Google Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg"
        >
          <div className="p-8 bg-gradient-to-r from-blue-500 to-green-500">
            <div className="flex items-center justify-center gap-3 mb-2">
              <MapPin className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">
                Our Location
              </h2>
            </div>
            <p className="text-center text-white/90 text-lg">
              Visit us at our headquarters in Makati City
            </p>
          </div>

          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Address Info */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Address
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    6789 Ayala Avenue
                    <br />
                    Salcedo Village, Brgy. Bel Air
                    <br />
                    Makati City, Metro Manila
                    <br />
                    Philippines
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-semibold">
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-semibold">
                        10:00 AM - 2:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-semibold">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-600" />
                    Get Directions
                  </h3>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=6789+Ayala+Avenue+Salcedo+Village+Makati+City+Metro+Manila"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Open in Google Maps
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden shadow-xl border-4 border-gray-100 h-full min-h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5285364847705!2d121.02441731484473!3d14.556729589830156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90264a0dbed%3A0xd03567f4dd7bfe6b!2sAyala%20Avenue%2C%20Makati%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "500px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Asian Responsible Enterprise, OPC Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-xl p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Prime Location
                  </h4>
                  <p className="text-sm text-gray-600">
                    Heart of Makati's business district
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Visit By Appointment
                  </h4>
                  <p className="text-sm text-gray-600">
                    Schedule your meeting in advance
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Call Ahead
                  </h4>
                  <p className="text-sm text-gray-600">
                    (+63) 968-858-1982
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}