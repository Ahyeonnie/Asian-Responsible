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
import { Save, Plus, Trash2, Edit, Book, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "./FileUpload";

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

// Default publications data (showing first 3, you have 12 total)
const defaultPublications: Publication[] = [
  {
    id: 1,
    title: 'Sustainability Impact Report 2024',
    description: 'Comprehensive analysis of our environmental and social impact initiatives across Asia',
    coverImage: 'https://images.unsplash.com/photo-1722706731979-f478967c868c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjMzNDkwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: '2024',
    category: 'Annual Report',
    pages: 156,
    summary: 'This comprehensive report details our commitment to sustainable development and corporate responsibility. Through data-driven insights and real-world case studies, we showcase our progress toward achieving the UN Sustainable Development Goals.',
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
    coverImage: 'https://images.unsplash.com/photo-1503467431153-c403061ea50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwcmVwb3J0JTIwYm9va3xlbnwxfHx8fDE3NjMzNDkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: '2024',
    category: 'Educational Guide',
    pages: 204,
    summary: 'A practical handbook designed for organizations and individuals committed to environmental conservation. This guide provides actionable strategies for reducing carbon footprints and protecting biodiversity.',
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
    coverImage: 'https://images.unsplash.com/photo-1621863367744-7363895606b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm51YWwlMjByZXBvcnQlMjBwdWJsaWNhdGlvbnxlbnwxfHx8fDE3NjMzNDkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: '2023',
    category: 'Annual Report',
    pages: 128,
    summary: 'Our 2023 Annual Impact Assessment provides a transparent look at our achievements, challenges, and learnings over the past year.',
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
];

export default function DashboardPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [tocInput, setTocInput] = useState("");
  const [editingTocIndex, setEditingTocIndex] = useState<number | null>(null);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = () => {
    const saved = localStorage.getItem('publicationsData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPublications(parsed);
        } else {
          setPublications(defaultPublications);
          localStorage.setItem('publicationsData', JSON.stringify(defaultPublications));
        }
      } catch (error) {
        console.error('Error loading publications:', error);
        setPublications(defaultPublications);
        localStorage.setItem('publicationsData', JSON.stringify(defaultPublications));
      }
    } else {
      setPublications(defaultPublications);
      localStorage.setItem('publicationsData', JSON.stringify(defaultPublications));
    }
  };

  const savePublications = (updatedPublications: Publication[]) => {
    localStorage.setItem('publicationsData', JSON.stringify(updatedPublications));
    setPublications(updatedPublications);
  };

  const handleSave = () => {
    if (editingPublication) {
      let updatedPublications;
      if (editingPublication.id === 0) {
        const newPublication = { ...editingPublication, id: Date.now() };
        updatedPublications = [...publications, newPublication];
        toast.success('Publication created successfully!');
      } else {
        updatedPublications = publications.map((p) =>
          p.id === editingPublication.id ? editingPublication : p
        );
        toast.success('Publication updated successfully!');
      }
      savePublications(updatedPublications);
      setEditingPublication(null);
      setTocInput("");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this publication?')) {
      const updatedPublications = publications.filter((p) => p.id !== id);
      savePublications(updatedPublications);
      toast.success('Publication deleted successfully!');
    }
  };

  const addTocItem = () => {
    if (editingPublication && tocInput.trim()) {
      setEditingPublication({
        ...editingPublication,
        tableOfContents: [...editingPublication.tableOfContents, tocInput.trim()]
      });
      setTocInput("");
    }
  };

  const removeTocItem = (index: number) => {
    if (editingPublication) {
      const updatedToc = editingPublication.tableOfContents.filter((_, i) => i !== index);
      setEditingPublication({
        ...editingPublication,
        tableOfContents: updatedToc
      });
    }
  };

  const editTocItem = (index: number) => {
    if (editingPublication) {
      setEditingTocIndex(index);
      setTocInput(editingPublication.tableOfContents[index]);
    }
  };

  const saveTocItem = () => {
    if (editingPublication && editingTocIndex !== null && tocInput.trim()) {
      const updatedToc = editingPublication.tableOfContents.map((item, index) =>
        index === editingTocIndex ? tocInput.trim() : item
      );
      setEditingPublication({
        ...editingPublication,
        tableOfContents: updatedToc
      });
      setEditingTocIndex(null);
      setTocInput("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Publications Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all publications and reports
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingPublication({
              id: 0,
              title: "",
              description: "",
              coverImage: "",
              year: new Date().getFullYear().toString(),
              category: "Annual Report",
              pages: 0,
              summary: "",
              tableOfContents: [],
              downloadUrl: ""
            });
            setTocInput("");
          }}
          className="bg-gradient-to-r from-yellow-500 to-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Publication
        </Button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Total Publications: {publications.length}
        <span className="ml-2 text-xs text-gray-400">
          (The Publications page shows 6 items per page with pagination)
        </span>
      </div>

      <div className="grid gap-4">
        {publications.map((publication) => (
          <Card key={publication.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                {publication.coverImage && (
                  <img 
                    src={publication.coverImage} 
                    alt={publication.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {publication.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {publication.description}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>{publication.year}</span>
                        <span>{publication.category}</span>
                        <span>{publication.pages} pages</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingPublication(publication);
                          setTocInput("");
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(publication.id)}
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

      {editingPublication && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>
              {editingPublication.id === 0 ? "New Publication" : "Edit Publication"}
            </CardTitle>
            <CardDescription>Add or update publication information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={editingPublication.title}
                  onChange={(e) =>
                    setEditingPublication({
                      ...editingPublication,
                      title: e.target.value,
                    })
                  }
                  placeholder="Sustainability Impact Report 2024"
                />
              </div>
              <div className="space-y-2">
                <Label>Year *</Label>
                <Input
                  value={editingPublication.year}
                  onChange={(e) =>
                    setEditingPublication({
                      ...editingPublication,
                      year: e.target.value,
                    })
                  }
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Input
                  value={editingPublication.category}
                  onChange={(e) =>
                    setEditingPublication({
                      ...editingPublication,
                      category: e.target.value,
                    })
                  }
                  placeholder="Annual Report"
                />
              </div>
              <div className="space-y-2">
                <Label>Pages *</Label>
                <Input
                  type="number"
                  value={editingPublication.pages}
                  onChange={(e) =>
                    setEditingPublication({
                      ...editingPublication,
                      pages: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="156"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Input
                value={editingPublication.description}
                onChange={(e) =>
                  setEditingPublication({
                    ...editingPublication,
                    description: e.target.value,
                  })
                }
                placeholder="Short description..."
              />
            </div>

            <div className="space-y-2">
              <Label>Summary *</Label>
              <Textarea
                value={editingPublication.summary}
                onChange={(e) =>
                  setEditingPublication({
                    ...editingPublication,
                    summary: e.target.value,
                  })
                }
                placeholder="Detailed summary..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image *</Label>
              <div className="flex gap-2 items-center mb-2">
                <Button
                  type="button"
                  size="sm"
                  variant={editingPublication.coverImage && !editingPublication.coverImage.startsWith('data:') ? "default" : "outline"}
                  onClick={() => {
                    const useUrl = editingPublication.coverImage && editingPublication.coverImage.startsWith('data:');
                    if (useUrl) {
                      setEditingPublication({ ...editingPublication, coverImage: '' });
                    }
                  }}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  {editingPublication.coverImage && !editingPublication.coverImage.startsWith('data:') ? 'Using URL' : 'Use URL Instead'}
                </Button>
              </div>
              
              {editingPublication.coverImage && !editingPublication.coverImage.startsWith('data:') ? (
                <div className="space-y-2">
                  <Input
                    value={editingPublication.coverImage}
                    onChange={(e) =>
                      setEditingPublication({
                        ...editingPublication,
                        coverImage: e.target.value,
                      })
                    }
                    placeholder="https://images.unsplash.com/..."
                  />
                  {editingPublication.coverImage && (
                    <img 
                      src={editingPublication.coverImage} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded" 
                    />
                  )}
                </div>
              ) : (
                <FileUpload
                  accept="image/*"
                  maxSize={5}
                  currentFile={editingPublication.coverImage}
                  onUpload={(base64) => setEditingPublication({ ...editingPublication, coverImage: base64 })}
                  type="image"
                  label="Upload Cover Image"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Download URL (Optional)</Label>
              <Input
                value={editingPublication.downloadUrl || ""}
                onChange={(e) =>
                  setEditingPublication({
                    ...editingPublication,
                    downloadUrl: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label>Table of Contents</Label>
              <div className="flex gap-2">
                <Input
                  value={tocInput}
                  onChange={(e) => setTocInput(e.target.value)}
                  placeholder={editingTocIndex !== null ? "Edit chapter..." : "Add chapter or section..."}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (editingTocIndex !== null) {
                        saveTocItem();
                      } else {
                        addTocItem();
                      }
                    }
                  }}
                />
                {editingTocIndex !== null ? (
                  <>
                    <Button type="button" onClick={saveTocItem} className="bg-green-500 hover:bg-green-600">
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setEditingTocIndex(null);
                        setTocInput("");
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={addTocItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2 mt-2">
                {editingPublication.tableOfContents.map((item, index) => (
                  <Card key={index} className={`p-2 ${editingTocIndex === index ? 'border-2 border-blue-500' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className="flex-1">{index + 1}. {item}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => editTocItem(index)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTocItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingPublication(null);
                  setTocInput("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-yellow-500 to-blue-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Publication
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}