export interface Coordinator {
  name: string;
  role: string;
  phone: string;
}

export interface PrizeDetails {
  first: string;
  second: string;
  third?: string;
  total: string;
  perks?: string[];
}

export type EventCategory = 'All' | 'Technical' | 'Non-Technical' | 'Gaming' | 'Cultural';

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Technical' | 'Non-Technical' | 'Gaming' | 'Cultural';
  description: string;
  fullDescription: string;
  image: string;
  gradient: string;
  accentColor: string;
  date: string;
  time: string;
  venue: string;
  rules: string[];
  eligibility: string[];
  teamType: 'Individual' | 'Team' | 'Individual or Team';
  maxTeamSize: number;
  minTeamSize: number;
  registrationFee: string;
  prizes: PrizeDetails;
  coordinators: Coordinator[];
  featured?: boolean;
  scheduleDay: 'Day 1' | 'Day 2';
}

export const FEST_STATS = {
  totalEvents: '18+',
  participatingColleges: '75+',
  expectedParticipants: '3,500+',
  totalPrizePool: '₹2,50,000+',
  festDates: 'March 27 - 28, 2026',
  collegeName: 'Apex Institute of Technology & Engineering',
  location: 'Tech Campus Arena, Block C Auditorium',
};

export const FEST_SCHEDULE = [
  {
    day: 'Day 1 - March 27, 2026',
    items: [
      {
        time: '09:00 AM - 10:30 AM',
        title: 'Grand Inauguration Ceremony & Keynote Address',
        venue: 'Main Auditorium (Sir C.V. Raman Hall)',
        category: 'Ceremony',
        speaker: 'Dr. Evelyn Vance, VP of AI Research',
      },
      {
        time: '11:00 AM - 01:30 PM',
        title: 'CodeSprint 2026: Speed Algorithm Championship',
        venue: 'Turing Computer Center - Lab 401',
        category: 'Technical',
        eventId: 'code-sprint',
      },
      {
        time: '11:30 AM - 02:00 PM',
        title: 'TechnoPaper Symposium (Paper Presentation)',
        venue: 'Seminar Hall B, Mechanical Block',
        category: 'Technical',
        eventId: 'paper-presentation',
      },
      {
        time: '02:00 PM - 05:00 PM',
        title: 'CyberCraft: UI/UX & Web Design Sprint',
        venue: 'Multimedia Suite, IT Dept',
        category: 'Technical',
        eventId: 'web-design',
      },
      {
        time: '03:00 PM - 06:30 PM',
        title: 'FragFest: Valorant & BGMI Tactical Showdown',
        venue: 'E-Sports Arena & LAN Arena',
        category: 'Gaming',
        eventId: 'gaming-arena',
      },
      {
        time: '06:30 PM - 08:30 PM',
        title: 'Live DJ Night & Electronic Symphony Prelude',
        venue: 'Open Air Amphitheatre',
        category: 'Cultural',
        eventId: 'cultural-night',
      },
    ],
  },
  {
    day: 'Day 2 - March 28, 2026',
    items: [
      {
        time: '09:30 AM - 12:30 PM',
        title: 'BugHunt X: Advanced Code Debugging Challenge',
        venue: 'Ada Lovelace Computing Wing',
        category: 'Technical',
        eventId: 'bug-hunt',
      },
      {
        time: '10:00 AM - 01:30 PM',
        title: 'RoboInnovate Expo: Next-Gen Hardware Showcase',
        venue: 'Central Innovation Courtyard',
        category: 'Technical',
        eventId: 'project-expo',
      },
      {
        time: '11:00 AM - 01:00 PM',
        title: 'Silicon Clash: Mega Tech Quiz',
        venue: 'Auditorium 2, Electronics Dept',
        category: 'Technical',
        eventId: 'tech-quiz',
      },
      {
        time: '01:30 PM - 04:30 PM',
        title: 'LensCraft: Visual Storytelling & Photography',
        venue: 'Campus Wide & Gallery Hall',
        category: 'Non-Technical',
        eventId: 'lenscraft',
      },
      {
        time: '04:30 PM - 07:00 PM',
        title: 'BeatVibe: National Battle of the Bands & Dance',
        venue: 'Open Air Amphitheatre',
        category: 'Cultural',
        eventId: 'cultural-night',
      },
      {
        time: '07:30 PM - 09:00 PM',
        title: 'Grand Valedictory, Award Ceremony & Cash Distribution',
        venue: 'Main Auditorium',
        category: 'Ceremony',
      },
    ],
  },
];

export const EVENTS: EventItem[] = [
  {
    id: 'code-sprint',
    title: 'CodeSprint 2026',
    tagline: 'High-octane algorithmic battle under extreme time constraints.',
    category: 'Technical',
    description: 'Push your analytical prowess to the boundary with 6 competitive algorithmic challenges in C++, Java, or Python.',
    fullDescription: 'CodeSprint 2026 is the pinnacle algorithmic programming contest of EventXora. Competitors will face carefully crafted problems testing data structures, dynamic programming, graph algorithms, and numerical computing. Real-time dynamic leaderboard with automated penalty scoring guarantees an electrifying atmosphere.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: '#06b6d4',
    date: 'March 27, 2026',
    time: '11:00 AM - 01:30 PM',
    venue: 'Turing Computer Center - Lab 401',
    rules: [
      'Allowed languages: C, C++, Java, Python, Rust.',
      'Plagiarism checks are automatically enforced using MOSS algorithm.',
      'Individual participation only; internet access is strictly restricted to compiler docs.',
      'Tie-breakers are resolved via submission timestamp and minimum penalty.',
      'Decisions of the judge panel are final and binding.'
    ],
    eligibility: [
      'Open to all enrolled undergraduate and postgraduate students.',
      'Valid college ID card mandatory at check-in desk.'
    ],
    teamType: 'Individual',
    minTeamSize: 1,
    maxTeamSize: 1,
    registrationFee: 'Free (Sponsored by Tech Club)',
    prizes: {
      first: '₹30,000 + Gold Trophy + Internship Opportunity',
      second: '₹18,000 + Silver Trophy',
      third: '₹10,000 + Bronze Trophy',
      total: '₹58,000',
      perks: ['Certificate of Excellence for Top 10', 'Goodie bags for all finalists']
    },
    coordinators: [
      { name: 'Aarav Sharma', role: 'Technical Lead', phone: '+91 98765 43210' },
      { name: 'Priya Sundaram', role: 'Event Manager', phone: '+91 98765 43211' }
    ],
    featured: true,
    scheduleDay: 'Day 1'
  },
  {
    id: 'web-design',
    title: 'CyberCraft: UI/UX & Web Sprint',
    tagline: 'Architect jaw-dropping 3D interactive web experiences in 3 hours.',
    category: 'Technical',
    description: 'Transform a surprise theme prompt into an ultra-modern, fluid web application with animations, 3D elements, and micro-interactions.',
    fullDescription: 'In CyberCraft, designers and frontend artisans get to showcase cutting-edge web craftsmanship. Whether using React, Tailwind, Three.js or modern CSS, participants must create responsive, accessible, and breathtaking interfaces that redefine conventional design.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-purple-500 to-indigo-600',
    accentColor: '#a855f7',
    date: 'March 27, 2026',
    time: '02:00 PM - 05:00 PM',
    venue: 'Multimedia Suite, IT Dept (Lab 2)',
    rules: [
      'Teams will receive a problem theme statement at the beginning of the sprint.',
      'Modern frontend frameworks (React, Vue, Next.js, Vanilla HTML/CSS) are permitted.',
      'All UI code must be authored during the session; pre-built templates will result in disqualification.',
      'Evaluation criteria: Visual hierarchy, 3D/Micro-animations, Responsiveness, Code cleanliness.'
    ],
    eligibility: [
      'Engineering, Arts & Science, and Design students with valid institutional identification.'
    ],
    teamType: 'Individual or Team',
    minTeamSize: 1,
    maxTeamSize: 2,
    registrationFee: '₹150 per team',
    prizes: {
      first: '₹25,000 + Figma Pro Subscriptions + Trophy',
      second: '₹15,000 + Trophy',
      third: '₹8,000 + Certificate',
      total: '₹48,000',
      perks: ['Direct interview referral for Product Design internships']
    },
    coordinators: [
      { name: 'Karthik Raja', role: 'UI/UX Mentor', phone: '+91 98123 45678' },
      { name: 'Sneha Patel', role: 'Operations', phone: '+91 98123 45679' }
    ],
    featured: true,
    scheduleDay: 'Day 1'
  },
  {
    id: 'paper-presentation',
    title: 'TechnoPaper Symposium',
    tagline: 'Publish and present groundbreaking research in emerging tech.',
    category: 'Technical',
    description: 'Present original research manuscripts spanning AI, Quantum Computing, Cyber-Physical Systems, and Green Tech before industry veterans.',
    fullDescription: 'The TechnoPaper Symposium provides a premier academic forum for budding engineers and researchers. Authors present their peer-reviewed papers before a distinguished jury composed of IEEE Senior Members and AI pioneers.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-blue-600 to-emerald-500',
    accentColor: '#3b82f6',
    date: 'March 27, 2026',
    time: '11:30 AM - 02:00 PM',
    venue: 'Seminar Hall B, Mechanical Block',
    rules: [
      'IEEE 2-column format required for research submissions.',
      'Presentation duration: 8 minutes presentation + 4 minutes Q&A.',
      'Plagiarism threshold must be strictly below 15%.',
      'PowerPoint slides or PDF presentations must be submitted 1 hour prior.'
    ],
    eligibility: [
      'B.Tech / B.E / M.Tech / MCA / MS Research scholars.'
    ],
    teamType: 'Team',
    minTeamSize: 2,
    maxTeamSize: 3,
    registrationFee: '₹200 per team',
    prizes: {
      first: '₹20,000 + Publication Recommendation + Trophy',
      second: '₹12,000 + Trophy',
      third: '₹6,000 + Certificate',
      total: '₹38,000'
    },
    coordinators: [
      { name: 'Dr. Ramesh Nair', role: 'Faculty Advisor', phone: '+91 99400 11223' },
      { name: 'Ananya Roy', role: 'Student Chair', phone: '+91 99400 11224' }
    ],
    featured: false,
    scheduleDay: 'Day 1'
  },
  {
    id: 'bug-hunt',
    title: 'BugHunt X: The Debugging Citadel',
    tagline: 'Spot sinister syntax traps, memory leaks, and concurrency deadlocks.',
    category: 'Technical',
    description: 'Three intense rounds ranging from obfuscated C pointers to complex asynchronous race conditions in distributed systems.',
    fullDescription: 'Can you uncover microscopic errors in thousands of lines of obfuscated code? BugHunt X is not your average compiler error hunt. It tests deep understanding of memory management, pointer manipulation, time complexity regressions, and logic vulnerabilities.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-red-500 to-pink-600',
    accentColor: '#f43f5e',
    date: 'March 28, 2026',
    time: '09:30 AM - 12:30 PM',
    venue: 'Ada Lovelace Computing Wing (Lab 3)',
    rules: [
      'Round 1: Rapid-fire paper syntax and logic error identification (30 mins).',
      'Round 2: Live GDB debugging and core dump analysis (45 mins).',
      'Round 3: High-concurrency multithreaded debugging in production codebases (60 mins).'
    ],
    eligibility: [
      'Open to all university students with programming literacy.'
    ],
    teamType: 'Individual or Team',
    minTeamSize: 1,
    maxTeamSize: 2,
    registrationFee: '₹100 per team',
    prizes: {
      first: '₹22,000 + Custom Mechanical Keyboard + Trophy',
      second: '₹14,000 + Trophy',
      third: '₹7,000 + Certificate',
      total: '₹43,000'
    },
    coordinators: [
      { name: 'Vikram Joshi', role: 'Core Lead', phone: '+91 97890 12345' },
      { name: 'Divya Krishnan', role: 'Event Coordinator', phone: '+91 97890 12346' }
    ],
    featured: true,
    scheduleDay: 'Day 2'
  },
  {
    id: 'project-expo',
    title: 'RoboInnovate 360: Project Expo',
    tagline: 'Bring your physical hardware prototypes & IoT robots to the spotlight.',
    category: 'Technical',
    description: 'Showcase functional hardware projects, drone prototypes, smart city IoT systems, and automated robotics in front of venture capitalists.',
    fullDescription: 'RoboInnovate 360 is the grand exhibition arena of EventXora 2026. From autonomous mobile robots to embedded healthcare wearables and smart energy grids, this expo provides live demo stalls with high-voltage electricity and Wi-Fi connectivity.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-emerald-400 to-teal-600',
    accentColor: '#10b981',
    date: 'March 28, 2026',
    time: '10:00 AM - 01:30 PM',
    venue: 'Central Innovation Courtyard',
    rules: [
      'A working hardware prototype or physical model is mandatory.',
      'Stall dimensions: 6ft x 4ft with dual 230V power sockets provided.',
      'Poster board explaining schematic architecture must be mounted.',
      'Evaluation points: Innovation novelty, commercial feasibility, and demo stability.'
    ],
    eligibility: [
      'Teams of 2 to 4 members from registered educational institutions.'
    ],
    teamType: 'Team',
    minTeamSize: 2,
    maxTeamSize: 4,
    registrationFee: '₹300 per team',
    prizes: {
      first: '₹35,000 + Seed Grant Mentorship + Golden Trophy',
      second: '₹20,000 + Silver Trophy',
      third: '₹10,000 + Bronze Trophy',
      total: '₹65,000'
    },
    coordinators: [
      { name: 'Arjun Nambiar', role: 'Robotics Chair', phone: '+91 91234 56780' },
      { name: 'Meera Chawla', role: 'Expo Coordinator', phone: '+91 91234 56781' }
    ],
    featured: true,
    scheduleDay: 'Day 2'
  },
  {
    id: 'tech-quiz',
    title: 'Silicon Clash: National Tech Quiz',
    tagline: 'Fastest buzzers, trivia on quantum breakthroughs, Silicon Valley history & AI.',
    category: 'Technical',
    description: 'An adrenaline-fueled quiz tournament testing obscure computer science lore, tech trivia, gadget teardowns, and visionary founders.',
    fullDescription: 'Hosted by renowned Quizmaster and industry author, Silicon Clash blends cryptic audio-visual rounds, dry-humor tech trivia, and lightning buzzer segments for the sharpest minds.',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    date: 'March 28, 2026',
    time: '11:00 AM - 01:00 PM',
    venue: 'Auditorium 2, Electronics Dept',
    rules: [
      'Written preliminary screening round with 25 questions.',
      'Top 6 teams advance to the live on-stage buzzer showdown.',
      'Negative marking on buzzer rounds for false triggers.',
      'No gadgets permitted on person during quiz sessions.'
    ],
    eligibility: [
      'Cross-college teams are permitted.'
    ],
    teamType: 'Team',
    minTeamSize: 2,
    maxTeamSize: 2,
    registrationFee: '₹100 per team',
    prizes: {
      first: '₹15,000 + Championship Shield',
      second: '₹10,000 + Trophy',
      third: '₹5,000 + Certificate',
      total: '₹30,000'
    },
    coordinators: [
      { name: 'Siddharth V.', role: 'Quiz Convenor', phone: '+91 93456 78901' },
      { name: 'Naveen Kumar', role: 'Scorekeeper', phone: '+91 93456 78902' }
    ],
    featured: false,
    scheduleDay: 'Day 2'
  },
  {
    id: 'gaming-arena',
    title: 'FragFest: E-Sports LAN Championship',
    tagline: 'High-FPS Valorant 5v5 & BGMI Squad tactical tournament.',
    category: 'Gaming',
    description: 'Compete in 144Hz low-latency gaming setups with pro caster commentary, huge spectator projection, and high stakes.',
    fullDescription: 'Welcome to the most electrifying gaming arena in the region. FragFest brings premier collegiate teams face-to-face in Valorant custom lobby brackets and BGMI mobile showdowns with pro shoutcasting streaming on Twitch/YouTube.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-violet-600 to-fuchsia-600',
    accentColor: '#8b5cf6',
    date: 'March 27, 2026',
    time: '03:00 PM - 06:30 PM',
    venue: 'E-Sports Arena & LAN Auditorium',
    rules: [
      'Tournament format: Single elimination brackets until finals (Bo3).',
      'PC tournament: Mechanical keyboards & peripherals can be brought by players.',
      'Hacks, scripts, macros, or unauthorized config tweaks lead to instant disqualification.',
      'Standard esports tournament map pool and character bans apply.'
    ],
    eligibility: [
      'All college students with valid student credentials.'
    ],
    teamType: 'Team',
    minTeamSize: 4,
    maxTeamSize: 5,
    registrationFee: '₹400 per team',
    prizes: {
      first: '₹35,000 + Custom Gaming Headsets + Trophy',
      second: '₹20,000 + Gaming Gear Bundles',
      third: '₹10,000 + Certificate',
      total: '₹65,000'
    },
    coordinators: [
      { name: 'Rohan Deshmukh', role: 'Esports Marshall', phone: '+91 94567 89012' },
      { name: 'Akash Verma', role: 'Stream Producer', phone: '+91 94567 89013' }
    ],
    featured: true,
    scheduleDay: 'Day 1'
  },
  {
    id: 'lenscraft',
    title: 'LensCraft: Visual Photography Challenge',
    tagline: 'Capture the soul, neon lights, and raw adrenaline of the tech fest.',
    category: 'Non-Technical',
    description: 'On-spot visual storytelling challenge spanning street perspectives, candid emotions, architectural symmetry, and cyber edits.',
    fullDescription: 'Armed with your DSLR, mirrorless, or smartphone camera, capture the vibrant tapestry of EventXora 2026. Participants are evaluated on framing composition, lighting dynamics, narrative depth, and color grade aesthetic.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-rose-500 to-amber-500',
    accentColor: '#f43f5e',
    date: 'March 28, 2026',
    time: '01:30 PM - 04:30 PM',
    venue: 'Campus Wide & Gallery Hall',
    rules: [
      'Photographs must be shot on campus during fest hours.',
      'Both RAW and final edited JPEG submissions are required.',
      'Permitted editing: Basic color grading, contrast, and crop adjustments. AI generation is banned.',
      'Maximum 3 submissions per registered participant.'
    ],
    eligibility: [
      'Open to all photography enthusiasts.'
    ],
    teamType: 'Individual',
    minTeamSize: 1,
    maxTeamSize: 1,
    registrationFee: '₹100 per person',
    prizes: {
      first: '₹15,000 + Camera Accessories Kit + Trophy',
      second: '₹8,000 + Trophy',
      third: '₹4,000 + Certificate',
      total: '₹27,000'
    },
    coordinators: [
      { name: 'Tanvi Saxena', role: 'Media Head', phone: '+91 95678 90123' },
      { name: 'Harish Babu', role: 'Gallery Curator', phone: '+91 95678 90124' }
    ],
    featured: false,
    scheduleDay: 'Day 2'
  },
  {
    id: 'cultural-night',
    title: 'BeatVibe: Battle of the Bands & Dance',
    tagline: 'Electrifying beats, synchronized choreo, and heart-pumping musical mastery.',
    category: 'Cultural',
    description: 'The monumental evening showcase bringing dynamic dance crews and acoustic & heavy metal rock bands to our grand open amphitheatre.',
    fullDescription: 'Under towering concert lighting and cutting-edge line-array acoustics, college crews perform breathtaking choreography and explosive musical sets. From Western and fusion dance to rock riffs, BeatVibe is the emotional soul of the fest.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-pink-600 to-purple-700',
    accentColor: '#ec4899',
    date: 'March 28, 2026',
    time: '04:30 PM - 07:00 PM',
    venue: 'Open Air Amphitheatre',
    rules: [
      'Time limit: 8 minutes performance + 2 minutes stage setup.',
      'Soundtracks must be submitted in MP3 format on a USB drive at least 2 hours in advance.',
      'Fire stunts or dangerous props are strictly prohibited.',
      'Judging criteria: Rhythm, stage presence, innovation, coordination, and crowd response.'
    ],
    eligibility: [
      'College dance teams and music ensembles.'
    ],
    teamType: 'Team',
    minTeamSize: 4,
    maxTeamSize: 12,
    registrationFee: '₹500 per team',
    prizes: {
      first: '₹40,000 + Rolling Mega Trophy',
      second: '₹25,000 + Trophy',
      third: '₹12,000 + Certificate',
      total: '₹77,000'
    },
    coordinators: [
      { name: 'Rithanya M.', role: 'Cultural Secretary', phone: '+91 96789 01234' },
      { name: 'Varun George', role: 'Stage Manager', phone: '+91 96789 01235' }
    ],
    featured: true,
    scheduleDay: 'Day 2'
  }
];
