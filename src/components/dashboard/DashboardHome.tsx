import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Save, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardHome() {
  const [heroTitle, setHeroTitle] = useState('Building a Sustainable Future Together');
  const [heroSubtitle, setHeroSubtitle] = useState('Empowering Communities Across Asia Through Responsible Enterprise');
  const [heroDescription, setHeroDescription] = useState('Join us in our mission to achieve all 17 Sustainable Development Goals and create lasting positive impact in communities across Asia.');
  const [statsVisible, setStatsVisible] = useState(true);
  const [stats, setStats] = useState([
    { label: 'Countries', value: '12+' },
    { label: 'Projects', value: '150+' },
    { label: 'Lives Impacted', value: '1M+' },
    { label: 'SDG Goals', value: '17' }
  ]);

  const handleSave = () => {
    // Simulate saving to backend
    localStorage.setItem('homeData', JSON.stringify({
      heroTitle,
      heroSubtitle,
      heroDescription,
      statsVisible,
      stats
    }));
    toast.success('Home page updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Home Page Editor
          </h1>
          <p className="text-gray-500 mt-1">Edit the main landing page content</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-yellow-500 to-blue-600">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Main banner content visible on homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Main headline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Input
              id="heroSubtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="Subheading text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea
              id="heroDescription"
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              placeholder="Brief description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Background Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Click to upload new background image</p>
              <p className="text-xs text-gray-400 mt-1">Recommended: 1920x1080px</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Homepage statistics counter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="statsVisible"
              checked={statsVisible}
              onChange={(e) => setStatsVisible(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="statsVisible">Show statistics section</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <Input
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[index].value = e.target.value;
                    setStats(newStats);
                  }}
                  placeholder="Value (e.g., 100+)"
                />
                <Input
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[index].label = e.target.value;
                    setStats(newStats);
                  }}
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nature Background Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Visual Effects</CardTitle>
          <CardDescription>Background animations and effects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Floating Elements</Label>
              <select className="w-full p-2 border rounded">
                <option>Nature Theme</option>
                <option>Geometric Shapes</option>
                <option>Particles</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Animation Speed</Label>
              <select className="w-full p-2 border rounded">
                <option>Slow</option>
                <option>Medium</option>
                <option>Fast</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
