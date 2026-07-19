// Central place for all portfolio content.
// Replace the placeholder values below with your real details any time.

export const profile = {
  name: 'Chayan Ghosh',
  title: 'BCA Student | Full-Stack Web Developer | Community Manager',
  bio: "I'm a BCA student passionate about building full-stack web applications using Java, JSP/Servlets, MySQL, and modern web technologies. Alongside development, I actively organize tech and gaming communities, combining technical skills with leadership to create impactful digital experiences.",
  location: 'India', // TODO: replace with your city/state
  resumeUrl: '#', // TODO: link to your resume PDF
  avatarInitials: 'CG',
  roles: [
    'Full-Stack Java Developer',
    'JSP / Servlets Developer',
    'Community Builder',
    'BCA Student',
  ],
  focusAreas: ['Full-Stack Dev', 'Community-Led', 'Problem Solver'],
}

export const contact = {
  email: 'chayanghosh2005@gmail.com',
  github: 'https://github.com/ChayanNEO',
  linkedin: 'https://www.linkedin.com/in/chayan-ghosh-neo/',
}

export const skills = [
  {
    category: 'Languages',
    items: ['Java', 'JavaScript', 'C', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['JSP / Servlets', 'React', 'Bootstrap', 'Node.js'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'MongoDB'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git & GitHub', 'VS Code', 'Canva', 'Figma'],
  },
  {
    category: 'Soft Skills',
    items: ['Leadership', 'Community Building', 'Public Speaking', 'Team Management', 'Musician'],
  },
]

export const experience = [
  {
    role: 'Gaming Community Manager | Glance ',
    org: 'Glance aka Nostraplay.', // TODO: replace
    period: 'Apr 2022 - Jan 2024', // TODO: replace
    points: [
      'Managed and engaged an active gaming community across Discord and other social platforms.',
      'Planned and executed online tournaments, community events and player engagement campaigns.',
      'Coordinated with moderators, creators and internal teams to ensure smooth event operations.',
      'Collected community feedback and shared actionable insights to improve user engagement and player experience.',
    ],
  },
  {
    role: 'Departmental Club President',
    org: 'Hashtag Club of MSIT', // TODO: replace
    period: '2025 - Present', // TODO: replace
    points: [
      'Led the official student club of the Computer Applications Department, managing a team to organize technical events.',
      'Planned and executed coding competitions, workshops, orientation programs, and departmental activities.',
      'Coordinated with faculty members, student volunteers to ensure successful event execution.',
      'Promoted student engagement by fostering collaboration, leadership and participation across departmental initiatives.',
    ],
  },
    {
    role: 'Community Manager',
    org: 'AIMpress Community',
    orgUrl: 'https://aimpress.co.in/',
    period: '2025 - Present', // TODO: replace
    points: [
      'Managed and grew an active gaming community by organizing interactive events, tournaments and engagement initiatives.',
      'Coordinated with moderators, volunteers and creators to ensure smooth community operations and event execution.',
      'Planned and hosted esports tournaments, managed registrations, match schedules and participant communications.',
      'Developed community announcements, promotional campaigns and feedback systems to improve member engagement and retention.',
    ],
  },
]

export const projects = [
  {
    title: 'KisanBharosa',
    description:
      'An agricultural supply chain web platform connecting farmers and buyers, built with Java Servlets/JSP and MySQL, containerized with Docker, and deployed on Render.',
    tech: ['Java', 'JSP/Servlets', 'MySQL'],
    liveUrl: 'https://kisanbharosa.onrender.com',
    codeUrl: 'https://github.com/ChayanNEO/KisanBharosa',
  },
  {
    title: 'EpicFrame',
    description:
      'An event management platform for handling event registration, agendas, venues, sponsors, and messaging, with a React (Vite) frontend and an Express/MongoDB backend secured with JWT auth.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    codeUrl: 'https://github.com/ChayanNEO/EpicFrame',
  },
]

export const creativeWork = {
  intro:
    "Outside of code, I'm a musician and I design posters — performing, writing/producing music, and creating poster art for events and communities.",
  posters: [
    {
      title: 'Poster Title 1', // TODO: replace with your poster's title
      client: 'Event / Client name', // TODO: replace
      description: 'Short description of this poster design — theme, tools used, purpose.', // TODO: replace
      imageUrl: null, // TODO: add image path, e.g. '/posters/poster-1.jpg'
    },
    {
      title: 'Poster Title 2', // TODO: replace
      client: 'Event / Client name', // TODO: replace
      description: 'Short description of this poster design — theme, tools used, purpose.', // TODO: replace
      imageUrl: null, // TODO: add image path
    },
    {
      title: 'Poster Title 3', // TODO: replace
      client: 'Event / Client name', // TODO: replace
      description: 'Short description of this poster design — theme, tools used, purpose.', // TODO: replace
      imageUrl: null, // TODO: add image path
    },
  ],
  performances: [
    {
      title: "Renaissance 3.0, 2025", // TODO: replace
      band: 'STOTRAM', // TODO: replace with your band's name, or set to null if not applicable
      venue: 'Sister Nivedita University, Kolkata', // TODO: replace
      description: 'Secured 2nd Runners Up in the Battle of Bands', // TODO: replace
      mediaType: 'video', // 'video' or 'photo'
      mediaUrl: null, // TODO: add a YouTube/Instagram link or local file path
    },
    {
      title: "Login 2025", // TODO: replace
      band: 'STOTRAM', // TODO: replace with your band's name, or set to null if not applicable
      venue: 'Bhawanipur Global Campus, Kolkata', // TODO: replace
      description:"A music fest organized by a music institution, where I performed as a drummer with their students' band.", // TODO: replace
      mediaType: 'video', // 'video' or 'photo'
      mediaUrl: null, // TODO: add a YouTube/Instagram link or local file path
    },
    {
      title: 'MU-TEC, Musical Program', // TODO: replace
      band: 'IONIANS', // TODO: replace with your band's name, or set to null if not applicable
      venue: 'Sarat Sadan, Kolkata', // TODO: replace
      description: "A music fest organized by a music institution, where I performed as a drummer with their students' band.", // TODO: replace
      mediaType: 'video', // 'video' or 'photo'
      mediaUrl: null, // TODO: add an image path or link
    },
    {
      title: "Jagriti 2025 ", // TODO: replace
      band: 'PROJECT_DRISHTI', // TODO: replace with your band's name, or set to null if not applicable
      venue: 'Government College of Engineering and Ceramic Technology, Kolkata', // TODO: replace
      description: "Participated in the Battle of Bands, performing as the band's drummer in an inter-college music competition. ", // TODO: replace
      mediaType: 'video', // 'video' or 'photo'
      mediaUrl: null, // TODO: add an image path or link
    },
    {
      title: 'Ecstasia 2026', // TODO: replace
      band: 'PROJECT_DRISHTI', // TODO: replace with your band's name, or set to null if not applicable
      venue: 'University of Engineering & Management, Kolkata (UEM), Kolkata', // TODO: replace
      description: "Participated in the Battle of Bands, performing as the band's drummer in an inter-college music competition. ", // TODO: replace
      mediaType: 'video', // 'video' or 'photo'
      mediaUrl: null, // TODO: add an image path or link
    },
    {
      title: 'Umang 2025', // TODO: replace
      band: 'COLLEGE_BAND', // TODO: replace with your band's name, or set to null if not applicable
      venue: 'The Bhawanipur Education Society College, Kolkata', // TODO: replace
      description: "Participated in the Battle of Bands, performing as the band's drummer in an inter-college music competition. ", // TODO: replace
      mediaType: 'video', // 'video' or 'photo'
      mediaUrl: 'https://youtu.be/h5w4ucQSa6s?si=DlcXa_vcPLWR2I6v',
    },
    {
      title: 'Advaya 2025', // TODO: replace
      band: 'DNA', // TODO: replace with your band's name, or set to null if not applicable
      venue: 'Meghnad Saha Institute of Technology', // TODO: replace
      description: "Participated in the Battle of Bands, performing as the band's drummer in an inter-college music competition. ", // TODO: replace
      mediaType: 'video', // 'video' or 'photo'
      mediaUrl: '',
    },
  ],
}

export const gallery = [
  {
    caption: 'ADVAYA 2025', // TODO: replace with a short caption
    imageUrl: '/gallery/dna.jpeg',
  },
  {
    caption: 'IONIANS', // TODO: replace
    imageUrl: '/gallery/ionians.jpeg',
  },
  {
    caption: 'Event photo 3', // TODO: replace
    imageUrl: '/gallery/dna_2.jpeg', // TODO: add image path
  },
  {
    caption: 'Event photo 4', // TODO: replace
    imageUrl: null, // TODO: add image path
  },
  {
    caption: 'Event photo 5', // TODO: replace
    imageUrl: '/gallery/stotram_1.jpeg', // TODO: add image path
  },
  {
    caption: 'Event photo 6', // TODO: replace
    imageUrl: null, // TODO: add image path
  },
]

export const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Meghnad Saha Institute of Technology', // TODO: replace
    period: '2023 - 2027', // TODO: replace
    details: 'Focused on programming fundamentals, data structures, databases, and web development.',
  },
  {
    degree: 'Higher Secondary (12th Grade)(ISC)',
    institution: 'Meghmala Roy Education Centre', // TODO: replace
    period: '2021 - 2023', // TODO: replace
    details: 'Commerce without Mathamatics.',
  },
]
