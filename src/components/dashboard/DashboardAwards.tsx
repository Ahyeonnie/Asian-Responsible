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
import { Save, Plus, Trash2, Edit, Award as AwardIcon, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Award {
  id: number;
  title: string;
  organization: string;
  category: string;
  year: string;
  description: string;
  sdg: number;
  color: string;
}

interface AchievementStat {
  label: string;
  value: string;
}

// Default awards data
const defaultAwards: Award[] = [
  {
    id: 1,
    title: "SDG Action Award 2024",
    organization: "UN Global Compact",
    category: "Climate Action",
    year: "2024",
    description:
      "Outstanding contribution to climate action initiatives and carbon neutrality goals.",
    sdg: 13,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: 2,
    title: "Sustainable Innovation Prize",
    organization: "World Economic Forum",
    category: "Clean Energy",
    year: "2023",
    description:
      "Revolutionary approach to affordable and clean energy solutions in developing countries.",
    sdg: 7,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    title: "Green Business Excellence",
    organization: "Asian Sustainability Council",
    category: "Responsible Production",
    year: "2024",
    description:
      "Leadership in sustainable business practices and circular economy implementation.",
    sdg: 12,
    color: "from-green-400 to-green-600",
  },
  {
    id: 4,
    title: "Water Conservation Champion",
    organization: "Global Water Partnership",
    category: "Clean Water",
    year: "2023",
    description:
      "Exceptional efforts in water resource management and access to clean water initiatives.",
    sdg: 6,
    color: "from-cyan-400 to-cyan-600",
  },
];

// Default achievement stats
const defaultStats: AchievementStat[] = [
  { label: "Nominated Individuals", value: "25+" },
  { label: "SDGs Addressed", value: "17" },
  { label: "Partner Organizations", value: "5+" },
  { label: "Years of Impact", value: "1" },
];

export default function DashboardAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [stats, setStats] = useState<AchievementStat[]>([]);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [editingStats, setEditingStats] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadAwards();
    loadStats();
  }, []);

  const loadAwards = () => {
    const saved = localStorage.getItem('awardsData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.awards && Array.isArray(parsed.awards) && parsed.awards.length > 0) {
          setAwards(parsed.awards);
        } else {
          setAwards(defaultAwards);
          saveAwardsData(defaultAwards, stats);
        }
      } catch (error) {
        console.error('Error loading awards:', error);
        setAwards(defaultAwards);
        saveAwardsData(defaultAwards, stats);
      }
    } else {
      setAwards(defaultAwards);
      saveAwardsData(defaultAwards, stats);
    }
  };

  const loadStats = () => {
    const saved = localStorage.getItem('awardsData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.stats && Array.isArray(parsed.stats) && parsed.stats.length > 0) {
          setStats(parsed.stats);
        } else {
          setStats(defaultStats);
          saveAwardsData(awards, defaultStats);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        setStats(defaultStats);
        saveAwardsData(awards, defaultStats);
      }
    } else {
      setStats(defaultStats);
      saveAwardsData(awards, defaultStats);
    }
  };

  const saveAwardsData = (updatedAwards: Award[], updatedStats: AchievementStat[]) => {
    const data = {
      awards: updatedAwards,
      stats: updatedStats
    };
    localStorage.setItem('awardsData', JSON.stringify(data));
    setAwards(updatedAwards);
    setStats(updatedStats);
  };

  const handleSaveAward = () => {
    if (editingAward) {
      let updatedAwards;
      if (editingAward.id === 0) {
        const newAward = { ...editingAward, id: Date.now() };
        updatedAwards = [...awards, newAward];
        toast.success('Award created successfully!');
      } else {
        updatedAwards = awards.map((a) =>
          a.id === editingAward.id ? editingAward : a
        );
        toast.success('Award updated successfully!');
      }
      saveAwardsData(updatedAwards, stats);
      setEditingAward(null);
    }
  };

  const handleDeleteAward = (id: number) => {
    if (confirm('Are you sure you want to delete this award?')) {
      const updatedAwards = awards.filter((a) => a.id !== id);
      saveAwardsData(updatedAwards, stats);
      toast.success('Award deleted successfully!');
    }
  };

  const handleSaveStats = () => {
    saveAwardsData(awards, stats);
    setEditingStats(false);
    toast.success('Achievement stats updated successfully!');
  };

  const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
    const updatedStats = [...stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setStats(updatedStats);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Awards Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage awards and achievement statistics
          </p>
        </div>
      </div>

      <Tabs defaultValue="awards" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="awards">
            <AwardIcon className="h-4 w-4 mr-2" />
            Awards ({awards.length})
          </TabsTrigger>
          <TabsTrigger value="stats">
            <TrendingUp className="h-4 w-4 mr-2" />
            Achievement Stats
          </TabsTrigger>
        </TabsList>

        {/* Awards Tab */}
        <TabsContent value="awards" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Recognition and awards received
            </p>
            <Button
              onClick={() =>
                setEditingAward({
                  id: 0,
                  title: "",
                  organization: "",
                  category: "",
                  year: new Date().getFullYear().toString(),
                  description: "",
                  sdg: 7,
                  color: "from-yellow-400 to-yellow-600",
                })
              }
              className="bg-gradient-to-r from-yellow-500 to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </div>

          <div className="grid gap-4">
            {awards.map((award) => (
              <Card key={award.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{award.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {award.description}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>{award.organization}</span>
                        <span>{award.year}</span>
                        <span>{award.category}</span>
                        <span>SDG {award.sdg}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingAward(award)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteAward(award.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {editingAward && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>
                  {editingAward.id === 0 ? "New Award" : "Edit Award"}
                </CardTitle>
                <CardDescription>
                  Add or update award information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Award Title *</Label>
                    <Input
                      value={editingAward.title}
                      onChange={(e) =>
                        setEditingAward({
                          ...editingAward,
                          title: e.target.value,
                        })
                      }
                      placeholder="SDG Action Award 2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization *</Label>
                    <Input
                      value={editingAward.organization}
                      onChange={(e) =>
                        setEditingAward({
                          ...editingAward,
                          organization: e.target.value,
                        })
                      }
                      placeholder="UN Global Compact"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Input
                      value={editingAward.category}
                      onChange={(e) =>
                        setEditingAward({
                          ...editingAward,
                          category: e.target.value,
                        })
                      }
                      placeholder="Climate Action"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year *</Label>
                    <Input
                      value={editingAward.year}
                      onChange={(e) =>
                        setEditingAward({
                          ...editingAward,
                          year: e.target.value,
                        })
                      }
                      placeholder="2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SDG Number (1-17) *</Label>
                    <Input
                      type="number"
                      min="1"
                      max="17"
                      value={editingAward.sdg}
                      onChange={(e) =>
                        setEditingAward({
                          ...editingAward,
                          sdg: parseInt(e.target.value) || 7,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={editingAward.description}
                    onChange={(e) =>
                      setEditingAward({
                        ...editingAward,
                        description: e.target.value,
                      })
                    }
                    placeholder="Outstanding contribution to..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color Gradient (Tailwind classes) *</Label>
                  <Input
                    value={editingAward.color}
                    onChange={(e) =>
                      setEditingAward({
                        ...editingAward,
                        color: e.target.value,
                      })
                    }
                    placeholder="from-yellow-400 to-yellow-600"
                  />
                  <p className="text-xs text-gray-500">
                    Examples: from-yellow-400 to-yellow-600, from-blue-400 to-blue-600, from-green-400 to-green-600
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingAward(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveAward}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Award
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Achievement Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Key achievement statistics displayed on the Awards page
            </p>
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

          <Card>
            <CardHeader>
              <CardTitle>Achievement Statistics</CardTitle>
              <CardDescription>
                Display key metrics and milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      placeholder="Nominated Individuals"
                      disabled={!editingStats}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      placeholder="25+"
                      disabled={!editingStats}
                    />
                  </div>
                </div>
              ))}

              {editingStats && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingStats(false);
                      loadStats();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveStats}
                    className="bg-gradient-to-r from-yellow-500 to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Statistics
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
