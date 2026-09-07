/**
 * Synapse — Mock Data
 * Typed local data for development. No backend required.
 */

import type {
  User,
  Opportunity,
  Partnership,
  Notification,
  NavSection,
  Application,
} from "@/types";

// ─── Users ─────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Aditya Sharma",
    email: "aditya@iit.ac.in",
    role: "student",
    initials: "AS",
    institution: "IIT Bombay",
  },
  {
    id: "u2",
    name: "Dr. Priya Nair",
    email: "priya.nair@nitc.ac.in",
    role: "faculty",
    initials: "PN",
    institution: "NIT Calicut",
  },
  {
    id: "u3",
    name: "Rohan Mehta",
    email: "rohan@techcorp.in",
    role: "industry",
    initials: "RM",
    company: "TechCorp India",
  },
  {
    id: "u4",
    name: "Sneha Kulkarni",
    email: "sneha@startup.io",
    role: "industry",
    initials: "SK",
    company: "BuildFast Startup",
  },
];

export const currentUser = mockUsers[0];

// ─── Opportunities ─────────────────────────────────────────────────

export const mockOpportunities: Opportunity[] = [
  {
    id: "o1",
    title: "Machine Learning Intern",
    company: "TechCorp India",
    type: "internship",
    status: "active",
    postedAt: "2026-08-28",
    location: "Bengaluru",
    workMode: "hybrid",
    matchScore: 92,
    matchLabel: "Strong match",
    matchReason: "Matches your Python, ML, and TensorFlow skills",
    tags: ["Python", "Machine Learning", "TensorFlow", "Data Processing"],
    description:
      "Join TechCorp India's AI team to work on production ML pipelines for their recommendation engine. You will collaborate with senior engineers on model training, evaluation, and deployment.",
    responsibilities: [
      "Develop and evaluate machine learning models",
      "Work with large datasets using Python and Pandas",
      "Collaborate with the product team on feature engineering",
      "Document experiments and report findings",
    ],
    requirements: [
      "Proficiency in Python and scikit-learn or TensorFlow",
      "Understanding of supervised and unsupervised learning",
      "Strong mathematical foundations (linear algebra, probability)",
      "Currently enrolled in B.Tech/M.Tech in CS or related field",
    ],
    duration: "6 months",
    stipend: "₹35,000/month",
    featured: true,
  },
  {
    id: "o2",
    title: "Research Collaboration — NLP",
    company: "DeepSci Labs",
    type: "research",
    status: "active",
    postedAt: "2026-08-20",
    location: "Remote",
    workMode: "remote",
    matchScore: 88,
    matchLabel: "Strong match",
    matchReason: "Aligns with your research and Python experience",
    tags: ["NLP", "Python", "Research", "LLM", "Transformers"],
    description:
      "DeepSci Labs is looking for research interns to contribute to their ongoing NLP research on multilingual language models for Indian languages.",
    responsibilities: [
      "Implement and evaluate NLP model architectures",
      "Contribute to research papers and technical reports",
      "Run experiments on GPU clusters",
      "Participate in weekly research reviews",
    ],
    requirements: [
      "Familiarity with transformer models (BERT, GPT-style)",
      "Python proficiency with PyTorch or TensorFlow",
      "Strong academic background in ML or NLP",
      "Ability to read and implement research papers",
    ],
    duration: "4 months",
    stipend: "₹20,000/month",
    featured: true,
  },
  {
    id: "o3",
    title: "Full Stack Developer — Contract",
    company: "BuildFast Startup",
    type: "project",
    status: "pending",
    postedAt: "2026-08-15",
    location: "Mumbai",
    workMode: "hybrid",
    matchScore: 76,
    matchLabel: "Good match",
    matchReason: "Matches your Next.js and TypeScript experience",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "React"],
    description:
      "BuildFast is building a B2B SaaS platform and needs a contract developer to help with frontend development using the Next.js App Router.",
    responsibilities: [
      "Build and maintain React/Next.js components",
      "Integrate with REST and GraphQL APIs",
      "Write tests and maintain code quality",
      "Work in a fast-paced startup environment",
    ],
    requirements: [
      "Strong experience with React and Next.js",
      "TypeScript proficiency",
      "Familiarity with database concepts (PostgreSQL)",
      "Git workflow experience",
    ],
    duration: "3 months",
    stipend: "₹30,000/month",
  },
  {
    id: "o4",
    title: "Data Engineering Intern",
    company: "FinAnalytica",
    type: "internship",
    status: "active",
    postedAt: "2026-09-01",
    location: "Hyderabad",
    workMode: "onsite",
    matchScore: 87,
    matchLabel: "Strong match",
    matchReason: "Your Python and data skills align well",
    tags: ["Python", "SQL", "Apache Spark", "Kafka", "Cloud"],
    description:
      "FinAnalytica processes billions of financial events daily. Join their data engineering team to build reliable, scalable data pipelines.",
    responsibilities: [
      "Build and maintain ETL pipelines using Apache Spark",
      "Monitor data quality and pipeline health",
      "Optimize SQL queries for performance",
      "Contribute to data warehouse design",
    ],
    requirements: [
      "Python and SQL proficiency",
      "Understanding of distributed data systems",
      "Familiarity with cloud platforms (AWS or GCP)",
      "Strong analytical mindset",
    ],
    duration: "6 months",
    stipend: "₹30,000/month",
    featured: true,
  },
  {
    id: "o5",
    title: "AI Research Assistant",
    company: "IIT Bombay",
    type: "research",
    status: "active",
    postedAt: "2026-08-25",
    location: "Mumbai",
    workMode: "onsite",
    matchScore: 84,
    matchLabel: "Strong match",
    matchReason: "Deep learning and Python align with your profile",
    tags: ["Python", "Deep Learning", "Research", "PyTorch", "Computer Vision"],
    description:
      "Prof. Ramesh Sharma's lab at IIT Bombay is recruiting research assistants for a project on efficient neural architectures for edge deployment.",
    responsibilities: [
      "Implement neural network architectures in PyTorch",
      "Run benchmarks and ablation studies",
      "Assist in writing and reviewing research papers",
      "Attend lab meetings and present progress",
    ],
    requirements: [
      "Strong Python and PyTorch skills",
      "Good understanding of deep learning fundamentals",
      "Prior coursework or projects in ML/AI",
      "Good communication and documentation habits",
    ],
    duration: "6 months",
    stipend: "₹15,000/month",
  },
  {
    id: "o6",
    title: "Cloud Infrastructure Intern",
    company: "Infra.io",
    type: "internship",
    status: "active",
    postedAt: "2026-09-03",
    location: "Bengaluru",
    workMode: "remote",
    matchScore: 65,
    matchLabel: "Moderate match",
    matchReason: "Some overlap with your systems knowledge",
    tags: ["AWS", "Kubernetes", "Terraform", "Python", "Linux"],
    description:
      "Infra.io is building next-generation cloud infrastructure tooling. This role involves working on provisioning automation and platform reliability.",
    responsibilities: [
      "Automate infrastructure provisioning with Terraform",
      "Monitor and improve Kubernetes cluster health",
      "Write runbooks and operational documentation",
      "Participate in on-call rotation (limited for interns)",
    ],
    requirements: [
      "Basic Linux and shell scripting",
      "Familiarity with cloud concepts (AWS or GCP)",
      "Interest in DevOps and platform engineering",
      "Python scripting ability",
    ],
    duration: "3 months",
    stipend: "₹25,000/month",
  },
  {
    id: "o7",
    title: "Product Design Intern",
    company: "StudioLab",
    type: "internship",
    status: "active",
    postedAt: "2026-09-02",
    location: "Remote",
    workMode: "remote",
    matchScore: 55,
    matchLabel: "Partial match",
    matchReason: "Design interest noted but limited skill overlap",
    tags: ["Figma", "UX Research", "Prototyping", "Design Systems"],
    description:
      "StudioLab works with early-stage startups on product design. The internship covers UX research, wireframing, and design systems work.",
    responsibilities: [
      "Conduct user research and usability tests",
      "Create wireframes and prototypes in Figma",
      "Contribute to the design system",
      "Present design rationale to stakeholders",
    ],
    requirements: [
      "Portfolio demonstrating UX/UI work",
      "Proficiency in Figma",
      "Understanding of user-centered design principles",
      "Strong visual communication skills",
    ],
    duration: "4 months",
    stipend: "₹18,000/month",
  },
  {
    id: "o8",
    title: "Blockchain Research Intern",
    company: "ChainVault",
    type: "research",
    status: "active",
    postedAt: "2026-08-18",
    location: "Remote",
    workMode: "remote",
    matchScore: 60,
    matchLabel: "Moderate match",
    matchReason: "Programming skills translate; domain is different",
    tags: ["Solidity", "Ethereum", "Python", "Research", "Cryptography"],
    description:
      "ChainVault is researching novel consensus mechanisms and zero-knowledge proof systems. This role is for technically curious researchers.",
    responsibilities: [
      "Implement and test smart contracts",
      "Review existing blockchain research literature",
      "Contribute to whitepapers and technical documentation",
      "Explore ZK-proof applications",
    ],
    requirements: [
      "Strong programming background",
      "Interest in cryptography and distributed systems",
      "Familiarity with blockchain concepts",
      "Python or Solidity exposure preferred",
    ],
    duration: "3 months",
    stipend: "₹22,000/month",
  },
  {
    id: "o9",
    title: "Robotics Software Intern",
    company: "Motus Robotics",
    type: "project",
    status: "active",
    postedAt: "2026-09-04",
    location: "Pune",
    workMode: "onsite",
    matchScore: 70,
    matchLabel: "Good match",
    matchReason: "Python and algorithms experience is directly relevant",
    tags: ["Python", "ROS", "C++", "Computer Vision", "Algorithms"],
    description:
      "Motus Robotics builds autonomous systems for industrial use cases. This project internship involves developing perception and planning modules.",
    responsibilities: [
      "Develop perception algorithms using OpenCV",
      "Integrate with the ROS middleware",
      "Test and validate on robotic hardware",
      "Collaborate with mechanical and electronics teams",
    ],
    requirements: [
      "C++ or Python proficiency",
      "Familiarity with computer vision concepts",
      "Interest in robotics and autonomous systems",
      "Ability to work on-site in Pune",
    ],
    duration: "4 months",
    stipend: "₹28,000/month",
  },
  {
    id: "o10",
    title: "Cybersecurity Analyst Intern",
    company: "ShieldNet",
    type: "internship",
    status: "active",
    postedAt: "2026-08-30",
    location: "Delhi",
    workMode: "hybrid",
    matchScore: 58,
    matchLabel: "Partial match",
    matchReason: "Programming skills relevant; security domain exposure limited",
    tags: ["Python", "Security", "Network Analysis", "Linux", "CTF"],
    description:
      "ShieldNet helps enterprises with threat detection and incident response. This intern role covers vulnerability scanning, log analysis, and pen-testing fundamentals.",
    responsibilities: [
      "Assist in vulnerability assessments",
      "Analyze security logs and alert patterns",
      "Develop scripts for automated scanning",
      "Document security findings and recommendations",
    ],
    requirements: [
      "Basic networking and Linux knowledge",
      "Python scripting ability",
      "Interest in cybersecurity (CTF experience a plus)",
      "Attention to detail and analytical thinking",
    ],
    duration: "3 months",
    stipend: "₹20,000/month",
  },
];

// ─── Mock Applications (seed data) ─────────────────────────────────

export const mockApplications: Application[] = [
  {
    opportunityId: "o1",
    appliedAt: "2026-08-30T10:00:00Z",
    status: "shortlisted",
  },
  {
    opportunityId: "o4",
    appliedAt: "2026-09-01T14:30:00Z",
    status: "review",
  },
  {
    opportunityId: "o5",
    appliedAt: "2026-09-03T09:15:00Z",
    status: "applied",
  },
];

// ─── Mock Upcoming Interview ────────────────────────────────────────

export const mockUpcomingInterview = {
  opportunityId: "o1",
  company: "TechCorp India",
  title: "Machine Learning Intern",
  date: "Tomorrow",
  time: "11:30 AM",
};

// ─── Partnerships ──────────────────────────────────────────────────

export const mockPartnerships: Partnership[] = [
  {
    id: "p1",
    institution: "IIT Bombay",
    company: "TechCorp India",
    type: "mou",
    status: "active",
    startDate: "2026-01-15",
  },
  {
    id: "p2",
    institution: "NIT Calicut",
    company: "BuildFast Startup",
    type: "internship",
    status: "active",
    startDate: "2026-03-01",
  },
  {
    id: "p3",
    institution: "IISc Bengaluru",
    company: "DeepSci Labs",
    type: "research",
    status: "review",
    startDate: "2026-06-10",
  },
];

// ─── Notifications ─────────────────────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Application shortlisted",
    description:
      "Your application to TechCorp India ML Intern has been shortlisted.",
    read: false,
    createdAt: "2026-09-05T10:30:00Z",
  },
  {
    id: "n2",
    title: "New opportunity posted",
    description:
      "FinAnalytica posted a Data Engineering role matching your profile.",
    read: false,
    createdAt: "2026-09-04T14:00:00Z",
  },
  {
    id: "n3",
    title: "Partnership approved",
    description: "IIT Bombay × TechCorp India partnership is now active.",
    read: true,
    createdAt: "2026-09-01T09:00:00Z",
  },
];

// ─── Navigation ────────────────────────────────────────────────────

export const studentNavSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Opportunities", href: "/opportunities" },
      { label: "My Applications", href: "/applications" },
      { label: "Saved", href: "/saved" },
    ],
  },
  {
    label: "Network",
    items: [
      { label: "Institutions", href: "/institutions" },
      { label: "Companies", href: "/companies" },
      { label: "Mentors", href: "/mentors" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", href: "/profile" },
      { label: "Settings", href: "/settings" },
    ],
  },
];
