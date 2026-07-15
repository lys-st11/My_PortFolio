export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: "Frontend" | "Backend" | "Fullstack";
  githubUrl: string;
  liveUrl?: string;
  colorClass: string; // Tailwind gradient starting color for beautiful card headers
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools & Methods";
  iconName: string; // Will match Lucide icon names dynamically
  color: string; // Accent color for text/border/badge
  level: string; // Dynamic level display (e.g. "Beginner")
}

export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
}

export const PERSONAL_INFO = {
  name: "Kenmogne Lysa",
  title: "Front-End Developer",
  subtitle: "Designing modern, smooth, and user-oriented user interfaces.",
  bio: "Currently studying software engineering, I am passionate about developing elegant and intuitive web interfaces. I am continuously learning modern web technologies and currently doing my academic internship to perfect my practical skills.",
  email: "kenmognelysa5@gmail.com",
  github: "https://github.com/kenmognelysa5",
  linkedin: "https://linkedin.com/in/kenmogne-lysa",
  location: "Douala, Cameroon",
  availability: "Available for opportunities & collaborations",
};

export const SKILLS: Skill[] = [
  // Frontend
  { name: "HTML5, CSS3 & JavaScript", category: "Frontend", iconName: "Layout", color: "from-orange-400 to-red-400", level: "Advanced Level" },
  { name: "Tailwind CSS", category: "Frontend", iconName: "Palette", color: "from-cyan-400 to-teal-400", level: "Intermediate Level" },
  { name: "React / Modern JavaScript", category: "Frontend", iconName: "Code2", color: "from-blue-400 to-cyan-400", level: "Beginner Level" },
  { name: "TypeScript", category: "Frontend", iconName: "Shield", color: "from-blue-500 to-indigo-500", level: "Beginner Level" },
  
  // Backend / Database
  { name: "SQL Databases", category: "Backend", iconName: "Database", color: "from-indigo-400 to-blue-500", level: "Academic Level" },
  
  // Tools & Methods
  { name: "Git & GitHub", category: "Tools & Methods", iconName: "GitBranch", color: "from-orange-500 to-amber-500", level: "Beginner Level" },
  { name: "Agile Methodologies / Scrum", category: "Tools & Methods", iconName: "Users", color: "from-emerald-400 to-teal-500", level: "Beginner Level" },
];

export const PROJECTS: Project[] = [];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    period: "Present",
    title: "Academic Internship in Software Engineering",
    company: "Sorepco SA",
    description: "Hands-on immersion and development of software solutions within the company. Participating in the software development lifecycle and learning industry standards.",
    tags: ["Software Engineering", "Web Development", "Teamwork"]
  },
  {
    id: "exp-2",
    period: "Ongoing",
    title: "3rd Year Software Engineering (Engineering Cycle)",
    company: "University",
    description: "In-depth academic training covering software architectures, database design, algorithms, and enterprise application development.",
    tags: ["Engineering Cycle", "Algorithms", "Databases", "UML / Modeling"]
  }
];
