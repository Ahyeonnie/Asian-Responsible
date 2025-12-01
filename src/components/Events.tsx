import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent } from './ui/dialog';
import { Calendar, ChevronLeft, ChevronRight, X, ZoomIn, Image as ImageIcon, Grid, CalendarDays } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import EventCalendar from './EventCalendar';

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
  // Calendar view fields (optional)
  day?: number;
  location?: string;
  category?: string;
  sdg?: number;
}

const defaultEventsData: Event[] = [
  {
    id: 1,
    month: 'January',
    year: 2024,
    title: 'Annual Sustainability Summit 2024',
    description: 'Our flagship event bringing together leaders in sustainable development',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGV8ZW58MXx8fHwxNzYzMjY3OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Opening keynote address' },
      { id: 2, url: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbWluYXIlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjMzNTY1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Workshop sessions' },
      { id: 3, url: 'https://images.unsplash.com/photo-1638699532230-1c7676c2a708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMHN1bW1pdCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMzU2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Panel discussions' },
      { id: 4, url: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjMzMzU1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Networking session' },
      { id: 5, url: 'https://images.unsplash.com/photo-1734174050925-3dca7c6bbad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHdvcmtzaG9wJTIwZ3JvdXB8ZW58MXx8fHwxNzYzMzU2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Training workshop' },
      { id: 6, url: 'https://images.unsplash.com/photo-1759560270562-468e8ba866e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYzMzU2NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Awards ceremony' },
      { id: 7, url: 'https://images.unsplash.com/photo-1758947313757-96ed52e4efb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjMyMzY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Team building activities' },
      { id: 8, url: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc2MzM1NjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Community outreach' },
      { id: 9, url: 'https://images.unsplash.com/photo-1761157995821-2ac65c40648b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBvdXRkb29yfGVufDF8fHx8MTc2MzI1OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Closing ceremony' },
    ]
  },
  {
    id: 2,
    month: 'March',
    year: 2024,
    title: 'Green Innovation Workshop',
    description: 'Hands-on workshop on sustainable business practices',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1734174050925-3dca7c6bbad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHdvcmtzaG9wJTIwZ3JvdXB8ZW58MXx8fHwxNzYzMzU2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Workshop introduction' },
      { id: 2, url: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbWluYXIlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjMzNTY1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Group discussions' },
      { id: 3, url: 'https://images.unsplash.com/photo-1758947313757-96ed52e4efb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjMyMzY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Interactive sessions' },
      { id: 4, url: 'https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGV8ZW58MXx8fHwxNzYzMjY3OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Expert presentations' },
      { id: 5, url: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjMzMzU1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Networking break' },
      { id: 6, url: 'https://images.unsplash.com/photo-1638699532230-1c7676c2a708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMHN1bW1pdCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMzU2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Breakout sessions' },
    ]
  },
  {
    id: 3,
    month: 'June',
    year: 2024,
    title: 'Community Volunteer Day',
    description: 'Team building and community service initiative',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc2MzM1NjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Volunteer preparation' },
      { id: 2, url: 'https://images.unsplash.com/photo-1761157995821-2ac65c40648b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBvdXRkb29yfGVufDF8fHx8MTc2MzI1OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Community gathering' },
      { id: 3, url: 'https://images.unsplash.com/photo-1758947313757-96ed52e4efb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjMyMzY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Team collaboration' },
      { id: 4, url: 'https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGV8ZW58MXx8fHwxNzYzMjY3OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Group photo' },
      { id: 5, url: 'https://images.unsplash.com/photo-1734174050925-3dca7c6bbad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHdvcmtzaG9wJTIwZ3JvdXB8ZW58MXx8fHwxNzYzMzU2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Community service' },
      { id: 6, url: 'https://images.unsplash.com/photo-1759560270562-468e8ba866e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYzMzU2NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Recognition ceremony' },
      { id: 7, url: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjMzMzU1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Celebration' },
    ]
  },
  {
    id: 4,
    month: 'September',
    year: 2024,
    title: 'SDG Awards Ceremony',
    description: 'Recognizing excellence in sustainable development',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1759560270562-468e8ba866e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYzMzU2NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Awards presentation' },
      { id: 2, url: 'https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGV8ZW58MXx8fHwxNzYzMjY3OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Audience engagement' },
      { id: 3, url: 'https://images.unsplash.com/photo-1638699532230-1c7676c2a708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMHN1bW1pdCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMzU2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Award winners' },
      { id: 4, url: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjMzMzU1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Networking gala' },
      { id: 5, url: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbWluYXIlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjMzNTY1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Panel of judges' },
      { id: 6, url: 'https://images.unsplash.com/photo-1758947313757-96ed52e4efb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjMyMzY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Team celebration' },
      { id: 7, url: 'https://images.unsplash.com/photo-1761157995821-2ac65c40648b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBvdXRkb29yfGVufDF8fHx8MTc2MzI1OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Grand finale' },
      { id: 8, url: 'https://images.unsplash.com/photo-1734174050925-3dca7c6bbad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHdvcmtzaG9wJTIwZ3JvdXB8ZW58MXx8fHwxNzYzMzU2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'After party' },
    ]
  },
  {
    id: 5,
    month: 'November',
    year: 2024,
    title: 'Year-End Leadership Summit',
    description: 'Strategic planning and vision setting for 2025',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1638699532230-1c7676c2a708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMHN1bW1pdCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMzU2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Summit opening' },
      { id: 2, url: 'https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGV8ZW58MXx8fHwxNzYzMjY3OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Leadership presentations' },
      { id: 3, url: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbWluYXIlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjMzNTY1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Strategy sessions' },
      { id: 4, url: 'https://images.unsplash.com/photo-1734174050925-3dca7c6bbad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHdvcmtzaG9wJTIwZ3JvdXB8ZW58MXx8fHwxNzYzMzU2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Team workshops' },
      { id: 5, url: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjMzMzU1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Networking dinner' },
      { id: 6, url: 'https://images.unsplash.com/photo-1759560270562-468e8ba866e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYzMzU2NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Achievement awards' },
      { id: 7, url: 'https://images.unsplash.com/photo-1758947313757-96ed52e4efb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjMyMzY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Team building' },
      { id: 8, url: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc2MzM1NjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Community pledge' },
      { id: 9, url: 'https://images.unsplash.com/photo-1761157995821-2ac65c40648b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBvdXRkb29yfGVufDF8fHx8MTc2MzI1OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Summit conclusion' },
    ]
  },
  {
    id: 6,
    month: 'December',
    year: 2023,
    title: 'Holiday Celebration & Gratitude',
    description: 'Year-end celebration with team and partners',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1759560270562-468e8ba866e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYzMzU2NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Holiday gala' },
      { id: 2, url: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjMzMzU1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Team gathering' },
      { id: 3, url: 'https://images.unsplash.com/photo-1758947313757-96ed52e4efb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjMyMzY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Fun activities' },
      { id: 4, url: 'https://images.unsplash.com/photo-1761157995821-2ac65c40648b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBvdXRkb29yfGVufDF8fHx8MTc2MzI1OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Group photos' },
      { id: 5, url: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc2MzM1NjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Gift giving' },
      { id: 6, url: 'https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGV8ZW58MXx8fHwxNzYzMjY3OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', caption: 'Year in review' },
    ]
  }
];

export default function Events() {
  const [selectedMonthYear, setSelectedMonthYear] = useState<string>('January 2024');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'calendar'>('gallery');

  // Load events from localStorage or use defaults
  const [eventsData, setEventsData] = useState<Event[]>(defaultEventsData);
  
  React.useEffect(() => {
    const savedEvents = localStorage.getItem('eventsData');
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEventsData(parsed);
        }
      } catch (error) {
        console.error('Error loading events from localStorage:', error);
      }
    }
  }, []);

  // Get unique month-year combinations
  const monthYearOptions = eventsData.map(event => `${event.month} ${event.year}`);

  // Get current event based on selected month-year
  const currentEvent = eventsData.find(event => `${event.month} ${event.year}` === selectedMonthYear) || eventsData[0];

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setDirection(0);
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null && currentEvent) {
      setDirection(1);
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % currentEvent.photos.length);
    }
  };

  const handlePrevious = () => {
    if (selectedPhotoIndex !== null && currentEvent) {
      setDirection(-1);
      setSelectedPhotoIndex(
        selectedPhotoIndex === 0 ? currentEvent.photos.length - 1 : selectedPhotoIndex - 1
      );
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-2xl"
          >
            <Calendar className="w-10 h-10 text-white" strokeWidth={2} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Events Gallery
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Explore our memorable moments and impactful events throughout the year
          </motion.p>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 rounded-2xl p-1 shadow-xl border border-gray-200 dark:border-slate-700">
              <Button
                variant={viewMode === 'gallery' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('gallery')}
                className={`gap-2 ${viewMode === 'gallery' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
              >
                <Grid className="w-4 h-4" />
                Gallery View
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className={`gap-2 ${viewMode === 'calendar' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
              >
                <CalendarDays className="w-4 h-4" />
                Calendar View
              </Button>
            </div>
          </motion.div>

          {/* Month/Year Selector - Only show in Gallery View */}
          {viewMode === 'gallery' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-slate-700">
                <Calendar className="w-5 h-5 text-purple-600 ml-2" />
                <select
                  value={selectedMonthYear}
                  onChange={(e) => setSelectedMonthYear(e.target.value)}
                  className="bg-transparent text-lg font-semibold text-gray-900 dark:text-white border-0 focus:outline-none focus:ring-0 cursor-pointer pr-8"
                >
                  {monthYearOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Conditional rendering based on view mode */}
        {viewMode === 'calendar' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EventCalendar 
              events={eventsData.map(event => ({
                id: event.id,
                title: event.title,
                description: event.description,
                month: event.month.slice(0, 3), // Convert "January" to "Jan"
                year: event.year.toString(),
                day: event.day || 15, // Default to 15th if no day specified
                location: event.location || 'TBA',
                category: event.category || 'General',
                sdg: event.sdg || 17,
                image: event.photos[0]?.url
              }))}
              isDark={document.documentElement.classList.contains('dark')}
              designTheme="playful"
            />
          </motion.div>
        ) : (
          <>
            {/* Event Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMonthYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-12 text-white shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{currentEvent.title}</h2>
                    <p className="text-white/90 text-lg mb-4">{currentEvent.description}</p>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {currentEvent.photos.length} Photos
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        {currentEvent.month} {currentEvent.year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Photo Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMonthYear}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentEvent.photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    onClick={() => handlePhotoClick(index)}
                    className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-xl bg-gray-200 dark:bg-slate-700 aspect-square"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white font-semibold text-lg mb-2">{photo.caption}</p>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <ZoomIn className="w-4 h-4" />
                          <span>Click to view</span>
                        </div>
                      </div>
                    </div>

                    {/* Photo number badge */}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center font-bold text-gray-900 dark:text-white shadow-lg">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Photo Modal */}
      <Dialog open={selectedPhotoIndex !== null} onOpenChange={() => setSelectedPhotoIndex(null)}>
        <DialogContent 
          className="max-w-6xl w-full h-[90vh] bg-black/95 border-0 p-0 overflow-hidden"
          aria-describedby={selectedPhotoIndex !== null ? "photo-caption" : undefined}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Photo counter */}
            {selectedPhotoIndex !== null && (
              <div className="absolute top-6 left-6 z-50 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
                {selectedPhotoIndex + 1} / {currentEvent.photos.length}
              </div>
            )}

            {/* Navigation buttons */}
            {selectedPhotoIndex !== null && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevious}
                  className="absolute left-6 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="absolute right-6 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </motion.button>
              </>
            )}

            {/* Photo display with animation */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {selectedPhotoIndex !== null && (
                <motion.div
                  key={selectedPhotoIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    rotateY: { duration: 0.5 },
                  }}
                  className="relative w-full h-full flex flex-col items-center justify-center p-12"
                >
                  <motion.img
                    src={currentEvent.photos[selectedPhotoIndex].url}
                    alt={currentEvent.photos[selectedPhotoIndex].caption}
                    className="max-w-full max-h-[calc(100%-120px)] object-contain rounded-xl shadow-2xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Caption */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 text-center"
                  >
                    <p id="photo-caption" className="text-white text-xl font-semibold">
                      {currentEvent.photos[selectedPhotoIndex].caption}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Keyboard hints */}
            {selectedPhotoIndex !== null && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/70 text-sm">
                <span>← Previous</span>
                <span>|</span>
                <span>Next →</span>
                <span>|</span>
                <span>ESC to close</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}