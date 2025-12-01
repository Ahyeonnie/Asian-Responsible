import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Save, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { FileUpload } from './FileUpload';
import { ConfirmDialog } from '../ui/confirm-dialog';

interface HomeData {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBackgroundImage: string;
  statsVisible: boolean;
  stats: Array<{ label: string; value: string }>;
  floatingElements: string;
  animationSpeed: string;
}

const defaultHomeData: HomeData = {
  heroTitle: 'Building a Sustainable Future Together',
  heroSubtitle: 'Empowering Communities Across Asia Through Responsible Enterprise',
  heroDescription: 'Join us in our mission to achieve all 17 Sustainable Development Goals and create lasting positive impact in communities across Asia.',
  heroBackgroundImage: '',
  statsVisible: true,
  stats: [
    { label: 'Countries', value: '12+' },
    { label: 'Projects', value: '150+' },
    { label: 'Lives Impacted', value: '1M+' },
    { label: 'SDG Goals', value: '17' }
  ],
  floatingElements: 'nature',
  animationSpeed: 'medium'
};

export default function DashboardHome() {
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {}
  });

  // Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem('homeData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHomeData({ ...defaultHomeData, ...parsed });
      } catch (error) {
        console.error('Error loading home data:', error);
        setHomeData(defaultHomeData);
      }
    }
  }, []);

  const handleSave = () => {
    setConfirmDialog({
      open: true,
      title: 'Save Home Page Changes',
      description: 'Are you sure you want to save these changes? The homepage will be updated immediately.',
      onConfirm: () => {
        localStorage.setItem('homeData', JSON.stringify(homeData));
        
        // Trigger storage event for App.tsx to listen to
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'homeData',
          newValue: JSON.stringify(homeData),
          url: window.location.href
        }));
        
        toast.success('Home page updated successfully!');
      }
    });
  };

  const updateField = (field: keyof HomeData, value: any) => {
    setHomeData(prev => ({ ...prev, [field]: value }));
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...homeData.stats];
    newStats[index][field] = value;
    updateField('stats', newStats);
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
              value={homeData.heroTitle}
              onChange={(e) => updateField('heroTitle', e.target.value)}
              placeholder="Main headline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Input
              id="heroSubtitle"
              value={homeData.heroSubtitle}
              onChange={(e) => updateField('heroSubtitle', e.target.value)}
              placeholder="Subheading text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea
              id="heroDescription"
              value={homeData.heroDescription}
              onChange={(e) => updateField('heroDescription', e.target.value)}
              placeholder="Brief description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Background Image (Optional)</Label>
            <div className="flex gap-2 items-center mb-2">
              <Button
                type="button"
                size="sm"
                variant={homeData.heroBackgroundImage && !homeData.heroBackgroundImage.startsWith('data:') ? "default" : "outline"}
                onClick={() => {
                  const useUrl = homeData.heroBackgroundImage && homeData.heroBackgroundImage.startsWith('data:');
                  if (useUrl) {
                    updateField('heroBackgroundImage', '');
                  }
                }}
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                {homeData.heroBackgroundImage && !homeData.heroBackgroundImage.startsWith('data:') ? 'Using URL' : 'Use URL Instead'}
              </Button>
            </div>
            
            {homeData.heroBackgroundImage && !homeData.heroBackgroundImage.startsWith('data:') ? (
              <div className="space-y-2">
                <Input
                  value={homeData.heroBackgroundImage}
                  onChange={(e) => updateField('heroBackgroundImage', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                {homeData.heroBackgroundImage && (
                  <div className="relative">
                    <img 
                      src={homeData.heroBackgroundImage} 
                      alt="Background Preview" 
                      className="w-full h-48 object-cover rounded"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => updateField('heroBackgroundImage', '')}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <FileUpload
                accept="image/*"
                maxSize={10}
                currentFile={homeData.heroBackgroundImage}
                onUpload={(base64) => updateField('heroBackgroundImage', base64)}
                type="image"
                label="Upload Background Image (1920x1080px recommended)"
              />
            )}
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to use default gradient background
            </p>
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
              checked={homeData.statsVisible}
              onChange={(e) => updateField('statsVisible', e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="statsVisible">Show statistics section</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeData.stats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <Label>Value</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  placeholder="Value (e.g., 100+)"
                />
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Effects Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Visual Effects</CardTitle>
          <CardDescription>Background animations and effects (Playful theme only)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Floating Elements</Label>
              <select 
                className="w-full p-2 border rounded"
                value={homeData.floatingElements}
                onChange={(e) => updateField('floatingElements', e.target.value)}
              >
                <option value="nature">Nature Theme (Leaves & Particles)</option>
                <option value="geometric">Geometric Shapes</option>
                <option value="particles">Particles Only</option>
                <option value="disabled">Disabled</option>
              </select>
              <p className="text-xs text-gray-500">
                Note: Effects only appear in Playful theme, not Corporate
              </p>
            </div>
            <div className="space-y-2">
              <Label>Animation Speed</Label>
              <select 
                className="w-full p-2 border rounded"
                value={homeData.animationSpeed}
                onChange={(e) => updateField('animationSpeed', e.target.value)}
              >
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={() => {
          confirmDialog.onConfirm();
          setConfirmDialog({ ...confirmDialog, open: false });
        }}
        confirmText="Save Changes"
        cancelText="Cancel"
      />
    </div>
  );
}
