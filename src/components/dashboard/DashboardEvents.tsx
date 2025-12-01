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
import { Save, Plus, Trash2, Edit, Calendar, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "./FileUpload";
import { ConfirmDialog } from "../ui/confirm-dialog";

interface EventPhoto {
  id: number;
  url: string;
  caption: string;
}

interface Event {
  id: number;
  month: string;
  year: number;
  title: string;
  description: string;
  photos: EventPhoto[];
}

// Default events data
const defaultEvents: Event[] = [
  {
    id: 1,
    month: 'January',
    year: 2024,
    title: 'Annual Sustainability Summit 2024',
    description: 'Our flagship event bringing together leaders in sustainable development',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?w=1080', caption: 'Opening keynote address' },
      { id: 2, url: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?w=1080', caption: 'Workshop sessions' },
      { id: 3, url: 'https://images.unsplash.com/photo-1638699532230-1c7676c2a708?w=1080', caption: 'Panel discussions' },
    ]
  },
  {
    id: 2,
    month: 'March',
    year: 2024,
    title: 'Green Innovation Workshop',
    description: 'Hands-on workshop on sustainable business practices',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1734174050925-3dca7c6bbad1?w=1080', caption: 'Workshop introduction' },
      { id: 2, url: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?w=1080', caption: 'Group discussions' },
    ]
  },
];

export default function DashboardEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "default" | "destructive";
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
    variant: 'default'
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const saved = localStorage.getItem('eventsData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
        } else {
          setEvents(defaultEvents);
          localStorage.setItem('eventsData', JSON.stringify(defaultEvents));
        }
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents(defaultEvents);
        localStorage.setItem('eventsData', JSON.stringify(defaultEvents));
      }
    } else {
      setEvents(defaultEvents);
      localStorage.setItem('eventsData', JSON.stringify(defaultEvents));
    }
  };

  const saveEvents = (updatedEvents: Event[]) => {
    localStorage.setItem('eventsData', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const handleSave = () => {
    if (editingEvent) {
      let updatedEvents;
      if (editingEvent.id === 0) {
        const newEvent = { ...editingEvent, id: Date.now() };
        updatedEvents = [...events, newEvent];
        toast.success('Event created successfully!');
      } else {
        updatedEvents = events.map((e) =>
          e.id === editingEvent.id ? editingEvent : e
        );
        toast.success('Event updated successfully!');
      }
      saveEvents(updatedEvents);
      setEditingEvent(null);
      setPhotoUrl("");
      setPhotoCaption("");
    }
  };

  const handleDelete = (id: number) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Event',
      description: 'Are you sure you want to delete this event?',
      onConfirm: () => {
        const updatedEvents = events.filter((e) => e.id !== id);
        saveEvents(updatedEvents);
        toast.success('Event deleted successfully!');
      },
      variant: 'destructive'
    });
  };

  const addPhoto = () => {
    if (editingEvent && photoUrl.trim() && photoCaption.trim()) {
      const newPhoto: EventPhoto = {
        id: Date.now(),
        url: photoUrl.trim(),
        caption: photoCaption.trim()
      };
      setEditingEvent({
        ...editingEvent,
        photos: [...editingEvent.photos, newPhoto]
      });
      setPhotoUrl("");
      setPhotoCaption("");
    }
  };

  const removePhoto = (photoId: number) => {
    if (editingEvent) {
      const updatedPhotos = editingEvent.photos.filter(p => p.id !== photoId);
      setEditingEvent({
        ...editingEvent,
        photos: updatedPhotos
      });
    }
  };

  const editPhoto = (photoId: number) => {
    const photo = editingEvent?.photos.find(p => p.id === photoId);
    if (photo) {
      setEditingPhotoId(photoId);
      setPhotoUrl(photo.url);
      setPhotoCaption(photo.caption);
    }
  };

  const updatePhoto = () => {
    if (editingEvent && editingPhotoId !== null) {
      const updatedPhotos = editingEvent.photos.map(p => 
        p.id === editingPhotoId ? { ...p, url: photoUrl, caption: photoCaption } : p
      );
      setEditingEvent({
        ...editingEvent,
        photos: updatedPhotos
      });
      setEditingPhotoId(null);
      setPhotoUrl("");
      setPhotoCaption("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Events Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage events and photo galleries
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingEvent({
              id: 0,
              month: "January",
              year: new Date().getFullYear(),
              title: "",
              description: "",
              photos: []
            });
            setPhotoUrl("");
            setPhotoCaption("");
          }}
          className="bg-gradient-to-r from-yellow-500 to-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Total Events: {events.length}
        <span className="ml-2 text-xs text-gray-400">
          (The Events page shows events filtered by selected month/year)
        </span>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-500">
                      {event.month} {event.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {event.photos.length} photos
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingEvent(event);
                      setPhotoUrl("");
                      setPhotoCaption("");
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Photo preview */}
              {event.photos.length > 0 && (
                <div className="grid grid-cols-6 gap-2">
                  {event.photos.slice(0, 6).map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-16 object-cover rounded"
                    />
                  ))}
                  {event.photos.length > 6 && (
                    <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                      +{event.photos.length - 6}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {editingEvent && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>
              {editingEvent.id === 0 ? "New Event" : "Edit Event"}
            </CardTitle>
            <CardDescription>Add or update event information and photos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Month *</Label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={editingEvent.month}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      month: e.target.value,
                    })
                  }
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Year *</Label>
                <Input
                  type="number"
                  value={editingEvent.year}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      year: parseInt(e.target.value) || new Date().getFullYear(),
                    })
                  }
                  placeholder="2024"
                />
              </div>
              <div className="space-y-2 flex items-end">
                <div className="text-sm text-gray-500">
                  {editingEvent.photos.length} photos
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Title *</Label>
              <Input
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    title: e.target.value,
                  })
                }
                placeholder="Annual Sustainability Summit 2024"
              />
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                placeholder="Event description..."
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>Event Photos</Label>
              <Card className="p-4 border-dashed">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Photo</Label>
                    <div className="flex gap-2 items-center mb-2">
                      <Button
                        type="button"
                        size="sm"
                        variant={photoUrl && !photoUrl.startsWith('data:') ? "default" : "outline"}
                        onClick={() => {
                          const useUrl = photoUrl && photoUrl.startsWith('data:');
                          if (useUrl) {
                            setPhotoUrl('');
                          }
                        }}
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        {photoUrl && !photoUrl.startsWith('data:') ? 'Using URL' : 'Use URL Instead'}
                      </Button>
                    </div>
                    
                    {photoUrl && !photoUrl.startsWith('data:') ? (
                      <Input
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    ) : (
                      <FileUpload
                        accept="image/*"
                        maxSize={5}
                        currentFile={photoUrl}
                        onUpload={(base64) => setPhotoUrl(base64)}
                        type="image"
                        label="Upload Event Photo"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Caption</Label>
                    <Input
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      placeholder="Opening keynote address"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addPhoto();
                        }
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={addPhoto}
                    variant="outline"
                    className="w-full"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </Card>

              {editingEvent.photos.length > 0 && (
                <div className="space-y-2">
                  {editingEvent.photos.map((photo) => (
                    <Card key={photo.id} className={`p-3 ${editingPhotoId === photo.id ? 'border-2 border-blue-500' : ''}`}>
                      {editingPhotoId === photo.id ? (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label className="text-sm">Photo</Label>
                            <div className="flex gap-2 items-center mb-2">
                              <Button
                                type="button"
                                size="sm"
                                variant={photoUrl && !photoUrl.startsWith('data:') ? "default" : "outline"}
                                onClick={() => {
                                  const useUrl = photoUrl && photoUrl.startsWith('data:');
                                  if (useUrl) {
                                    setPhotoUrl('');
                                  }
                                }}
                              >
                                <LinkIcon className="h-4 w-4 mr-2" />
                                {photoUrl && !photoUrl.startsWith('data:') ? 'Using URL' : 'Use URL Instead'}
                              </Button>
                            </div>
                            
                            {photoUrl && !photoUrl.startsWith('data:') ? (
                              <Input
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                              />
                            ) : (
                              <FileUpload
                                accept="image/*"
                                maxSize={5}
                                currentFile={photoUrl}
                                onUpload={(base64) => setPhotoUrl(base64)}
                                type="image"
                                label="Upload Event Photo"
                              />
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Caption</Label>
                            <Input
                              value={photoCaption}
                              onChange={(e) => setPhotoCaption(e.target.value)}
                              placeholder="Opening keynote address"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  updatePhoto();
                                }
                              }}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={updatePhoto}
                              className="flex-1 bg-green-500 hover:bg-green-600"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Update
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingPhotoId(null);
                                setPhotoUrl("");
                                setPhotoCaption("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-20 h-14 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{photo.caption}</p>
                            <p className="text-xs text-gray-500 truncate">{photo.url}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => editPhoto(photo.id)}
                            >
                              <Edit className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removePhoto(photo.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingEvent(null);
                  setPhotoUrl("");
                  setPhotoCaption("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-yellow-500 to-blue-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Event
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={() => {
          confirmDialog.onConfirm();
          setConfirmDialog({ ...confirmDialog, open: false });
        }}
        variant={confirmDialog.variant}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}