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
import { Save, Plus, Trash2, Edit, Users, Star, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CommunityStats {
  label: string;
  value: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  members: number;
  location: string;
  sdg: number;
  progress: number;
  category: string;
}

interface CommunityEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  attendees: number;
  sdg: number;
}

interface CommunityData {
  stats: CommunityStats[];
  projects: Project[];
  events: CommunityEvent[];
}

const defaultCommunityData: CommunityData = {
  stats: [
    { label: "Active Members", value: "150K+" },
    { label: "Projects Launched", value: "2,500+" },
    { label: "Countries Reached", value: "85" },
    { label: "Impact Stories", value: "10K+" },
  ],
  projects: [
    {
      id: 1,
      title: "Clean Water for Rural Communities",
      description: "Installing sustainable water filtration systems in remote villages across Southeast Asia.",
      members: 245,
      location: "Southeast Asia",
      sdg: 6,
      progress: 75,
      category: "Water & Sanitation",
    },
    {
      id: 2,
      title: "Youth Education Initiative",
      description: "Providing digital learning resources and mentorship to underserved youth globally.",
      members: 189,
      location: "Global",
      sdg: 4,
      progress: 60,
      category: "Education",
    },
    {
      id: 3,
      title: "Sustainable Agriculture Network",
      description: "Connecting farmers with sustainable farming techniques and climate-resilient crops.",
      members: 156,
      location: "Africa",
      sdg: 2,
      progress: 85,
      category: "Food Security",
    },
  ],
  events: [
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
  ],
};

export default function DashboardCommunity() {
  const [communityData, setCommunityData] = useState<CommunityData>(defaultCommunityData);
  const [editingStats, setEditingStats] = useState(false);
  const [tempStats, setTempStats] = useState<CommunityStats[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEvent, setEditingEvent] = useState<CommunityEvent | null>(null);

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = () => {
    const saved = localStorage.getItem('communityData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCommunityData(parsed);
        setTempStats(parsed.stats);
      } catch (error) {
        console.error('Error loading community data:', error);
        saveCommunityData(defaultCommunityData);
      }
    } else {
      saveCommunityData(defaultCommunityData);
    }
  };

  const saveCommunityData = (data: CommunityData) => {
    localStorage.setItem('communityData', JSON.stringify(data));
    setCommunityData(data);
    setTempStats(data.stats);
  };

  // Stats Management
  const handleSaveStats = () => {
    const updatedData = { ...communityData, stats: tempStats };
    saveCommunityData(updatedData);
    setEditingStats(false);
    toast.success('Community stats updated successfully!');
  };

  const updateStat = (index: number, field: keyof CommunityStats, value: string) => {
    const updated = [...tempStats];
    updated[index] = { ...updated[index], [field]: value };
    setTempStats(updated);
  };

  // Projects Management
  const handleSaveProject = () => {
    if (editingProject) {
      let updatedProjects;
      if (editingProject.id === 0) {
        const newProject = { ...editingProject, id: Date.now() };
        updatedProjects = [...communityData.projects, newProject];
        toast.success('Project created successfully!');
      } else {
        updatedProjects = communityData.projects.map((p) =>
          p.id === editingProject.id ? editingProject : p
        );
        toast.success('Project updated successfully!');
      }
      saveCommunityData({ ...communityData, projects: updatedProjects });
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = communityData.projects.filter((p) => p.id !== id);
      saveCommunityData({ ...communityData, projects: updatedProjects });
      toast.success('Project deleted successfully!');
    }
  };

  // Events Management
  const handleSaveEvent = () => {
    if (editingEvent) {
      let updatedEvents;
      if (editingEvent.id === 0) {
        const newEvent = { ...editingEvent, id: Date.now() };
        updatedEvents = [...communityData.events, newEvent];
        toast.success('Event created successfully!');
      } else {
        updatedEvents = communityData.events.map((e) =>
          e.id === editingEvent.id ? editingEvent : e
        );
        toast.success('Event updated successfully!');
      }
      saveCommunityData({ ...communityData, events: updatedEvents });
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = communityData.events.filter((e) => e.id !== id);
      saveCommunityData({ ...communityData, events: updatedEvents });
      toast.success('Event deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Community Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage community stats, projects, and events
          </p>
        </div>
      </div>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="stats">
            <Users className="h-4 w-4 mr-2" />
            Stats (4)
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Star className="h-4 w-4 mr-2" />
            Projects ({communityData.projects.length})
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="h-4 w-4 mr-2" />
            Events ({communityData.events.length})
          </TabsTrigger>
        </TabsList>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Community Statistics</CardTitle>
                  <CardDescription>Key metrics displayed on the Community page</CardDescription>
                </div>
                {!editingStats && (
                  <Button
                    onClick={() => setEditingStats(true)}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Stats
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingStats ? (
                <>
                  {tempStats.map((stat, index) => (
                    <Card key={index} className="p-4 border">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Stat {index + 1}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Label *</Label>
                            <Input
                              value={stat.label}
                              onChange={(e) => updateStat(index, 'label', e.target.value)}
                              placeholder="Active Members"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Value *</Label>
                            <Input
                              value={stat.value}
                              onChange={(e) => updateStat(index, 'value', e.target.value)}
                              placeholder="150K+"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingStats(false);
                        setTempStats(communityData.stats);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveStats}
                      className="bg-gradient-to-r from-yellow-500 to-blue-600"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Stats
                    </Button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {communityData.stats.map((stat, index) => (
                    <Card key={index} className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() =>
                setEditingProject({
                  id: 0,
                  title: "",
                  description: "",
                  members: 0,
                  location: "",
                  sdg: 1,
                  progress: 0,
                  category: "",
                })
              }
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>

          <div className="grid gap-4">
            {communityData.projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>👥 {project.members} members</span>
                        <span>📍 {project.location}</span>
                        <span>🎯 SDG {project.sdg}</span>
                        <span>📊 {project.progress}% progress</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingProject(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingProject && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>{editingProject.id === 0 ? "New Project" : "Edit Project"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Title *</Label>
                  <Input
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    placeholder="Clean Water for Rural Communities"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    placeholder="Project description..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Members *</Label>
                    <Input
                      type="number"
                      value={editingProject.members}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          members: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="245"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input
                      value={editingProject.location}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, location: e.target.value })
                      }
                      placeholder="Southeast Asia"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SDG (1-17) *</Label>
                    <Input
                      type="number"
                      min="1"
                      max="17"
                      value={editingProject.sdg}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          sdg: parseInt(e.target.value) || 1,
                        })
                      }
                      placeholder="6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Progress (%) *</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={editingProject.progress}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          progress: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="75"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Input
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    placeholder="Water & Sanitation"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingProject(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProject}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() =>
                setEditingEvent({
                  id: 0,
                  title: "",
                  date: "",
                  time: "",
                  type: "Virtual",
                  attendees: 0,
                  sdg: 1,
                })
              }
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          <div className="grid gap-4">
            {communityData.events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📅 {event.date}</span>
                        <span>🕐 {event.time}</span>
                        <span>📍 {event.type}</span>
                        <span>👥 {event.attendees} attendees</span>
                        <span>🎯 SDG {event.sdg}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingEvent(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingEvent && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>{editingEvent.id === 0 ? "New Event" : "Edit Event"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Event Title *</Label>
                  <Input
                    value={editingEvent.title}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, title: e.target.value })
                    }
                    placeholder="Global Climate Action Webinar"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={editingEvent.date}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Time *</Label>
                    <Input
                      value={editingEvent.time}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, time: e.target.value })
                      }
                      placeholder="14:00 UTC"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Type *</Label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={editingEvent.type}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, type: e.target.value })
                      }
                    >
                      <option value="Virtual">Virtual</option>
                      <option value="In-Person">In-Person</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Attendees *</Label>
                    <Input
                      type="number"
                      value={editingEvent.attendees}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          attendees: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="2500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SDG (1-17) *</Label>
                    <Input
                      type="number"
                      min="1"
                      max="17"
                      value={editingEvent.sdg}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          sdg: parseInt(e.target.value) || 1,
                        })
                      }
                      placeholder="13"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingEvent(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEvent}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Event
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
