/** Sample images: https://yavuzceliker.github.io/sample-images/image-n.jpg (n = 1–2000) */
export function eventImageUrl(n: number): string {
  const id = Math.max(1, Math.min(2000, Math.round(n)));
  return `https://yavuzceliker.github.io/sample-images/image-${id}.jpg`;
}

export type CategoryId = 'live' | 'tourism' | 'origin';

export interface EventItem {
  id: string;
  title: string;
  category: CategoryId;
  imageId: number;
  date: string; // day of month for filtering e.g. "14"
  dateLabel: string; // e.g. "May 20"
  fullDate: string; // e.g. "17 Jun 2024"
  time: string;
  location: string;
  price: string;
  rating: string;
  participants: string;
  seats?: string;
  about: string;
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'live', label: 'Live shows' },
  { id: 'tourism', label: 'Tourism' },
  { id: 'origin', label: 'Fever Origin' },
];

export const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Blackpink Concert',
    category: 'live',
    imageId: 147,
    date: '20',
    dateLabel: 'May 20',
    fullDate: '20 May 2024',
    time: '07:00 PM',
    location: '123 Main Street, New York',
    price: '$40.23',
    rating: '5.0',
    participants: '1.2K',
    seats: '256 seats available',
    about:
      'Join us for an unforgettable evening of laughter at The Club. Top comedians from around the world will take the stage for a night of non-stop entertainment.',
  },
  {
    id: '2',
    title: 'Gala Night of Hilarious Comedy at The Club',
    category: 'live',
    imageId: 302,
    date: '17',
    dateLabel: 'Jun 17',
    fullDate: '17 Jun 2024',
    time: '08:00 PM',
    location: 'California, USA',
    price: '$48',
    rating: '4.9',
    participants: '2K',
    seats: '256 seats available',
    about:
      'Join us for an unforgettable evening of laughter at The Club. Top comedians from around the world will take the stage for a night of non-stop entertainment. Perfect for date night or group outings.',
  },
  {
    id: '3',
    title: 'Jazz Night at Blue Note',
    category: 'live',
    imageId: 88,
    date: '14',
    dateLabel: 'Jan 14',
    fullDate: '14 Jan 2024',
    time: '09:00 PM',
    location: 'London, West End',
    price: '$35',
    rating: '5.0',
    participants: '800',
    about: 'An intimate evening of live jazz with world-class musicians.',
  },
  {
    id: '4',
    title: 'Indie Concert – Summer Vibes',
    category: 'live',
    imageId: 412,
    date: '15',
    dateLabel: 'Jan 15',
    fullDate: '15 Jan 2024',
    time: '06:00 PM',
    location: 'Brixton Academy, London',
    price: '$42',
    rating: '5.0',
    participants: '2.1K',
    about: 'The best indie bands of the season in one night.',
  },
  {
    id: '5',
    title: 'Comedy Club Live',
    category: 'live',
    imageId: 521,
    date: '16',
    dateLabel: 'Jan 16',
    fullDate: '16 Jan 2024',
    time: '08:30 PM',
    location: 'Leicester Square, London',
    price: '$28',
    rating: '4.8',
    participants: '1.5K',
    about: 'Stand-up comedy night with surprise guest comedians.',
  },
  {
    id: '6',
    title: 'Redsketch Academy Video Editing',
    category: 'origin',
    imageId: 612,
    date: '14',
    dateLabel: 'Jan 14',
    fullDate: '14 Jan 2024',
    time: '08:00 AM',
    location: 'Valencia, otra calle',
    price: 'Free',
    rating: '4.9',
    participants: '3K',
    about: 'Hands-on video editing workshop for creators.',
  },
  {
    id: '7',
    title: 'The Drawing Academy Painting Focus',
    category: 'origin',
    imageId: 718,
    date: '14',
    dateLabel: 'Jan 14',
    fullDate: '14 Jan 2024',
    time: '10:00 AM',
    location: 'Barcelona',
    price: '$25',
    rating: '5.0',
    participants: '1.2K',
    about: 'Learn painting techniques from professional artists.',
  },
  {
    id: '8',
    title: 'Sundance Film Festival',
    category: 'origin',
    imageId: 820,
    date: '14',
    dateLabel: 'Jan 14',
    fullDate: '14 Jan 2024',
    time: '02:00 AM',
    location: 'Park City, Utah',
    price: '$55',
    rating: '5.0',
    participants: '5K',
    about: 'Premiere screenings and Q&As with filmmakers.',
  },
  {
    id: '9',
    title: 'Thames River Walking Tour',
    category: 'tourism',
    imageId: 1021,
    date: '12',
    dateLabel: 'Jan 12',
    fullDate: '12 Jan 2024',
    time: '10:00 AM',
    location: 'London Bridge',
    price: '$18',
    rating: '4.9',
    participants: '890',
    about: 'Guided walk along the Thames with historic highlights.',
  },
  {
    id: '16',
    title: 'Morning Coffee & Markets Tour',
    category: 'tourism',
    imageId: 234,
    date: '12',
    dateLabel: 'Jan 12',
    fullDate: '12 Jan 2024',
    time: '08:00 AM',
    location: 'Borough Market, London',
    price: '$24',
    rating: '5.0',
    participants: '420',
    about: 'Start the day with local coffee and a guided market tour.',
  },
  {
    id: '17',
    title: 'Riverside Yoga & Brunch',
    category: 'tourism',
    imageId: 891,
    date: '12',
    dateLabel: 'Jan 12',
    fullDate: '12 Jan 2024',
    time: '11:00 AM',
    location: 'South Bank, London',
    price: '$32',
    rating: '4.8',
    participants: '180',
    about: 'Outdoor yoga session by the Thames followed by brunch.',
  },
  {
    id: '10',
    title: 'Street Art & Shoreditch Tour',
    category: 'tourism',
    imageId: 1105,
    date: '13',
    dateLabel: 'Jan 13',
    fullDate: '13 Jan 2024',
    time: '02:00 PM',
    location: 'Shoreditch, London',
    price: '$22',
    rating: '5.0',
    participants: '1.1K',
    about: 'Discover the best street art and hidden murals.',
  },
  {
    id: '11',
    title: 'West End Theatre Night',
    category: 'live',
    imageId: 333,
    date: '17',
    dateLabel: 'Jan 17',
    fullDate: '17 Jan 2024',
    time: '07:30 PM',
    location: 'West End, London',
    price: '$65',
    rating: '5.0',
    participants: '2.5K',
    about: 'An evening at one of London’s legendary theatres.',
  },
  {
    id: '12',
    title: 'Electronic Music Festival',
    category: 'live',
    imageId: 445,
    date: '16',
    dateLabel: 'Jan 16',
    fullDate: '16 Jan 2024',
    time: '10:00 PM',
    location: 'Printworks, London',
    price: '$52',
    rating: '4.9',
    participants: '3.2K',
    about: 'All-night electronic music experience.',
  },
  {
    id: '13',
    title: 'Photography Masterclass',
    category: 'origin',
    imageId: 556,
    date: '15',
    dateLabel: 'Jan 15',
    fullDate: '15 Jan 2024',
    time: '11:00 AM',
    location: 'South Bank, London',
    price: '$45',
    rating: '5.0',
    participants: '420',
    about: 'One-day intensive photography workshop.',
  },
  {
    id: '14',
    title: 'Historic Greenwich Day Trip',
    category: 'tourism',
    imageId: 667,
    date: '13',
    dateLabel: 'Jan 13',
    fullDate: '13 Jan 2024',
    time: '09:00 AM',
    location: 'Greenwich, London',
    price: '$30',
    rating: '4.8',
    participants: '650',
    about: 'Visit the Royal Observatory and Cutty Sark.',
  },
  {
    id: '15',
    title: 'Silent Disco on the Roof',
    category: 'live',
    imageId: 778,
    date: '14',
    dateLabel: 'Jan 14',
    fullDate: '14 Jan 2024',
    time: '09:00 PM',
    location: 'Sky Garden, London',
    price: '$38',
    rating: '5.0',
    participants: '1.8K',
    about: 'Dance under the stars with wireless headphones.',
  },
];

const eventsById = new Map(EVENTS.map((e) => [e.id, e]));

export function getEventById(id: string): EventItem | undefined {
  return eventsById.get(id);
}

export function filterEventsByCategory(
  events: EventItem[],
  category: CategoryId
): EventItem[] {
  return events.filter((e) => e.category === category);
}

export function filterEventsBySearch(events: EventItem[], query: string): EventItem[] {
  if (!query.trim()) return events;
  const q = query.toLowerCase().trim();
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
  );
}

export function filterEventsByDate(events: EventItem[], day: string): EventItem[] {
  return events.filter((e) => e.date === day);
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/** Unique dates that have events (for date picker), sorted */
export function getEventDates(): { day: string; week: string }[] {
  const dateSet = new Set(EVENTS.map((e) => e.date));
  return Array.from(dateSet)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((day, i) => ({
      day,
      week: WEEK_DAYS[i % 7],
    }));
}
