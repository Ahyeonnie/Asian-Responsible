import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Save, Plus, Trash2, Edit, Mail, MapPin, Building2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ContactInfo {
  title: string;
  content: string;
  description: string;
  color: string;
}

interface OfficeLocation {
  id: number;
  city: string;
  country: string;
  address: string;
  timezone: string;
  staff: number;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface ContactData {
  contactInfo: ContactInfo[];
  offices: OfficeLocation[];
  faqs: FAQ[];
}

const defaultContactData: ContactData = {
  contactInfo: [
    {
      title: "Email Us",
      content: "kennethrocete.cna@gmail.com",
      description: "Send us an email and we'll respond within 24 hours",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Call Us",
      content: "(+63) 968-858-1982",
      description: "Connect with our support team weekdays between 10 AM and 7 PM.",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Visit Us",
      content: "6789 Ayala Avenue, Salcedo Village, Brgy. Bel Air, Makati City, Metro Manila",
      description: "Our headquarters are open for meetings by appointment",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Live Chat",
      content: "Available 24/7",
      description: "Get instant support through our live chat system",
      color: "from-orange-500 to-orange-600",
    },
  ],
  offices: [
    {
      id: 1,
      city: "New York",
      country: "United States",
      address: "123 Sustainable Street, NY 10001",
      timezone: "EST (UTC-5)",
      staff: 25,
    },
    {
      id: 2,
      city: "Geneva",
      country: "Switzerland",
      address: "456 Development Avenue, Geneva 1201",
      timezone: "CET (UTC+1)",
      staff: 18,
    },
    {
      id: 3,
      city: "Singapore",
      country: "Singapore",
      address: "789 Innovation Boulevard, Singapore 018956",
      timezone: "SGT (UTC+8)",
      staff: 22,
    },
  ],
  faqs: [
    {
      id: 1,
      question: "How can I get involved with your sustainability initiatives?",
      answer: "We offer various ways to get involved including volunteering, partnerships, donations, and joining our community programs. Visit our Community page to explore opportunities.",
      category: "General",
    },
    {
      id: 2,
      question: "Do you offer consulting services for sustainable business practices?",
      answer: "Yes, we provide consulting services to help businesses integrate sustainable practices. Contact our partnerships team for more information.",
      category: "Services",
    },
    {
      id: 3,
      question: "How do I apply for the Climate Neutral Awards?",
      answer: "Applications for the Climate Neutral Awards open quarterly. Visit our Awards page for current application information and deadlines.",
      category: "Awards",
    },
  ],
};

export default function DashboardContact() {
  const [contactData, setContactData] = useState<ContactData>(defaultContactData);
  const [editingInfo, setEditingInfo] = useState(false);
  const [tempContactInfo, setTempContactInfo] = useState<ContactInfo[]>([]);
  const [editingOffice, setEditingOffice] = useState<OfficeLocation | null>(null);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = () => {
    const saved = localStorage.getItem('contactData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContactData(parsed);
        setTempContactInfo(parsed.contactInfo);
      } catch (error) {
        console.error('Error loading contact data:', error);
        saveContactData(defaultContactData);
      }
    } else {
      saveContactData(defaultContactData);
    }
  };

  const saveContactData = (data: ContactData) => {
    localStorage.setItem('contactData', JSON.stringify(data));
    setContactData(data);
    setTempContactInfo(data.contactInfo);
  };

  // Contact Info Management
  const handleSaveContactInfo = () => {
    const updatedData = { ...contactData, contactInfo: tempContactInfo };
    saveContactData(updatedData);
    setEditingInfo(false);
    toast.success('Contact information updated successfully!');
  };

  const updateContactInfo = (index: number, field: keyof ContactInfo, value: string) => {
    const updated = [...tempContactInfo];
    updated[index] = { ...updated[index], [field]: value };
    setTempContactInfo(updated);
  };

  // Office Management
  const handleSaveOffice = () => {
    if (editingOffice) {
      let updatedOffices;
      if (editingOffice.id === 0) {
        const newOffice = { ...editingOffice, id: Date.now() };
        updatedOffices = [...contactData.offices, newOffice];
        toast.success('Office created successfully!');
      } else {
        updatedOffices = contactData.offices.map((o) =>
          o.id === editingOffice.id ? editingOffice : o
        );
        toast.success('Office updated successfully!');
      }
      saveContactData({ ...contactData, offices: updatedOffices });
      setEditingOffice(null);
    }
  };

  const handleDeleteOffice = (id: number) => {
    if (confirm('Are you sure you want to delete this office?')) {
      const updatedOffices = contactData.offices.filter((o) => o.id !== id);
      saveContactData({ ...contactData, offices: updatedOffices });
      toast.success('Office deleted successfully!');
    }
  };

  // FAQ Management
  const handleSaveFAQ = () => {
    if (editingFAQ) {
      let updatedFAQs;
      if (editingFAQ.id === 0) {
        const newFAQ = { ...editingFAQ, id: Date.now() };
        updatedFAQs = [...contactData.faqs, newFAQ];
        toast.success('FAQ created successfully!');
      } else {
        updatedFAQs = contactData.faqs.map((f) =>
          f.id === editingFAQ.id ? editingFAQ : f
        );
        toast.success('FAQ updated successfully!');
      }
      saveContactData({ ...contactData, faqs: updatedFAQs });
      setEditingFAQ(null);
    }
  };

  const handleDeleteFAQ = (id: number) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      const updatedFAQs = contactData.faqs.filter((f) => f.id !== id);
      saveContactData({ ...contactData, faqs: updatedFAQs });
      toast.success('FAQ deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Contact Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage contact information, offices, and FAQs
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="info">
            <Mail className="h-4 w-4 mr-2" />
            Contact Info (4)
          </TabsTrigger>
          <TabsTrigger value="offices">
            <Building2 className="h-4 w-4 mr-2" />
            Offices ({contactData.offices.length})
          </TabsTrigger>
          <TabsTrigger value="faqs">
            <MessageCircle className="h-4 w-4 mr-2" />
            FAQs ({contactData.faqs.length})
          </TabsTrigger>
        </TabsList>

        {/* Contact Info Tab */}
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Main contact details displayed on Contact page</CardDescription>
                </div>
                {!editingInfo && (
                  <Button
                    onClick={() => setEditingInfo(true)}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Contact Info
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingInfo ? (
                <>
                  {tempContactInfo.map((info, index) => (
                    <Card key={index} className="p-4 border">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Contact Method {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Title *</Label>
                            <Input
                              value={info.title}
                              onChange={(e) => updateContactInfo(index, 'title', e.target.value)}
                              placeholder="Email Us"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Color Gradient *</Label>
                            <Input
                              value={info.color}
                              onChange={(e) => updateContactInfo(index, 'color', e.target.value)}
                              placeholder="from-blue-500 to-blue-600"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Content *</Label>
                          <Input
                            value={info.content}
                            onChange={(e) => updateContactInfo(index, 'content', e.target.value)}
                            placeholder="kennethrocete.cna@gmail.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description *</Label>
                          <Textarea
                            value={info.description}
                            onChange={(e) => updateContactInfo(index, 'description', e.target.value)}
                            placeholder="Send us an email..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingInfo(false);
                        setTempContactInfo(contactData.contactInfo);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveContactInfo}
                      className="bg-gradient-to-r from-yellow-500 to-blue-600"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Contact Info
                    </Button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactData.contactInfo.map((info, index) => (
                    <Card key={index} className="p-4">
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      <p className="text-sm text-gray-700 mb-1">{info.content}</p>
                      <p className="text-xs text-gray-500 mb-2">{info.description}</p>
                      <p className="text-xs text-gray-400">Color: {info.color}</p>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offices Tab */}
        <TabsContent value="offices" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() =>
                setEditingOffice({
                  id: 0,
                  city: "",
                  country: "",
                  address: "",
                  timezone: "",
                  staff: 0,
                })
              }
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Office
            </Button>
          </div>

          <div className="grid gap-4">
            {contactData.offices.map((office) => (
              <Card key={office.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {office.city}, {office.country}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>📍 {office.address}</p>
                        <p>🕐 {office.timezone}</p>
                        <p>👥 {office.staff} staff members</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingOffice(office)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteOffice(office.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingOffice && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>{editingOffice.id === 0 ? "New Office" : "Edit Office"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Input
                      value={editingOffice.city}
                      onChange={(e) =>
                        setEditingOffice({ ...editingOffice, city: e.target.value })
                      }
                      placeholder="Singapore"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Input
                      value={editingOffice.country}
                      onChange={(e) =>
                        setEditingOffice({ ...editingOffice, country: e.target.value })
                      }
                      placeholder="Singapore"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Input
                    value={editingOffice.address}
                    onChange={(e) =>
                      setEditingOffice({ ...editingOffice, address: e.target.value })
                    }
                    placeholder="789 Innovation Boulevard, Singapore 018956"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Timezone *</Label>
                    <Input
                      value={editingOffice.timezone}
                      onChange={(e) =>
                        setEditingOffice({ ...editingOffice, timezone: e.target.value })
                      }
                      placeholder="SGT (UTC+8)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Staff Count *</Label>
                    <Input
                      type="number"
                      value={editingOffice.staff}
                      onChange={(e) =>
                        setEditingOffice({
                          ...editingOffice,
                          staff: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="22"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingOffice(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveOffice}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Office
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() =>
                setEditingFAQ({
                  id: 0,
                  question: "",
                  answer: "",
                  category: "General",
                })
              }
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          <div className="grid gap-4">
            {contactData.faqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{faq.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => setEditingFAQ(faq)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteFAQ(faq.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingFAQ && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>{editingFAQ.id === 0 ? "New FAQ" : "Edit FAQ"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={editingFAQ.category}
                    onChange={(e) =>
                      setEditingFAQ({ ...editingFAQ, category: e.target.value })
                    }
                  >
                    <option value="General">General</option>
                    <option value="Services">Services</option>
                    <option value="Awards">Awards</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Question *</Label>
                  <Input
                    value={editingFAQ.question}
                    onChange={(e) =>
                      setEditingFAQ({ ...editingFAQ, question: e.target.value })
                    }
                    placeholder="How can I get involved?"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Answer *</Label>
                  <Textarea
                    value={editingFAQ.answer}
                    onChange={(e) =>
                      setEditingFAQ({ ...editingFAQ, answer: e.target.value })
                    }
                    placeholder="Detailed answer..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingFAQ(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveFAQ}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}