import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FileSaver from "file-saver";
import LogoImage from "../utils/LOGO.jpg";
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiMongodb, 
  SiTailwindcss, 
  SiRedux, 
  SiExpress,
  SiPython,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiGit,
  SiFigma,
  SiMysql,
  SiStorybook,
  SiOpenai,
  SiMicrosoftexcel,
  SiJira,
  SiVuedotjs,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiDocker
} from "react-icons/si";
import { AiOutlineDownload, AiOutlineCheckCircle } from "react-icons/ai";
import { BsBriefcase, BsMortarboard, BsAward } from "react-icons/bs";

const downloadCV = () => {
  const cvFilePath = `${process.env.PUBLIC_URL}/Jenya Proviz FS.pdf`;
  FileSaver.saveAs(cvFilePath, "My_CV.pdf");
  console.log("Downloading CV...");
};

// Skills data with progress levels
const skillsData = {
  "Frontend": [
    { name: "React", icon: <SiReact className="text-blue-400" />, level: 85 },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, level: 80 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" />, level: 90 },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" />, level: 95 },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500" />, level: 85 },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: 90 },
    { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" />, level: 75 },
    { name: "Vue.js", icon: <SiVuedotjs className="text-green-500" />, level: 65 },
    { name: "Storybook", icon: <SiStorybook className="text-pink-600" />, level: 70 },
  ],
  "Backend": [
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" />, level: 80 },
    { name: "Express", icon: <SiExpress className="text-gray-400" />, level: 85 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, level: 75 },
    { name: "Python", icon: <SiPython className="text-yellow-400" />, level: 70 },
    { name: "MySQL", icon: <SiMysql className="text-blue-400" />, level: 65 },
  ],
  "AI & Automation": [
    { name: "OpenAI API", icon: <SiOpenai className="text-green-400" />, level: 80 },
    { name: "ChatGPT API", icon: <span className="text-green-400">🤖</span>, level: 80 },
    { name: "Cursor IDE", icon: <span className="text-gray-400">▣</span>, level: 85 },
    { name: "Intelligent Agents", icon: <span className="text-purple-400">🧠</span>, level: 75 },
    { name: "Workflow Automation", icon: <span className="text-orange-400">⚙️</span>, level: 75 },
    { name: "SendGrid Templates", icon: <span className="text-blue-500">📧</span>, level: 70 }
  ],
  "Tools & Others": [
    { name: "Redux", icon: <SiRedux className="text-purple-600" />, level: 80 },
    { name: "Git", icon: <SiGit className="text-orange-600" />, level: 85 },
    { name: "Figma", icon: <SiFigma className="text-purple-500" />, level: 70 },
    { name: "Docker", icon: <SiDocker className="text-blue-400" />, level: 60 },
    { name: "Excel", icon: <SiMicrosoftexcel className="text-green-600" />, level: 90 },
    { name: "Jira", icon: <SiJira className="text-blue-500" />, level: 85 }
  ],
  "AI in Process Learning": [
    { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" />, level: 10 },
    { name: "Pandas", icon: <SiPandas className="text-blue-600" />, level: 10 },
    { name: "NumPy", icon: <SiNumpy className="text-blue-400" />, level: 10 },
    { name: "Jupyter", icon: <SiJupyter className="text-orange-400" />, level: 10 },
    { name: "Machine Learning", icon: <span className="text-purple-500">🔬</span>, level: 10 },
    { name: "Deep Learning", icon: <span className="text-indigo-500">🧬</span>, level: 10 }
  ]
};

// Education data
const educationData = [
  {
    year: "2025 - Present",
    title: "AI Experts | Data Science, Machine Learning and Deep Learning",
    company: "John Bryce College",
    description: "440 hours of hands-on training in Python, Data Analysis (EDA), Machine Learning, Deep Learning, Generative AI, and Cloud Deployment. Practical experience with TensorFlow, Scikit-learn, Pandas, LangChain, and Docker through real-world AI projects including model building, optimization, and deployment.",
    technologies: ["Python", "Data Analysis", "Machine Learning", "Deep Learning", "Generative AI", "TensorFlow", "Scikit-learn", "Pandas", "LangChain", "Docker", "Cloud Deployment"]
  },
  {
    year: "2022 - 2024",
    title: "Full Stack Web Development",
    company: "HackerU College",
    description: "540 hours of intensive training in React, Redux, JavaScript, TypeScript, HTML, CSS, Node.js, MongoDB, and REST API architecture.",
    technologies: ["React", "Redux", "JavaScript", "TypeScript", "HTML", "CSS", "Node.js", "MongoDB", "REST API"]
  },
  {
    year: "2005 - 2010",
    title: "B.Sc. Industrial Engineering & Technology Management",
    company: "Holon Institute of Technology (HIT)",
    description: "Bachelor's degree in Industrial Engineering with focus on Technology Management, systems optimization, and process improvement methodologies.",
    technologies: ["Industrial Engineering", "Technology Management", "Systems Optimization", "Process Improvement"]
  },
  {
    year: "2002 - 2004",
    title: "Practical Engineer",
    company: "College of Management Academic Studies",
    description: "Practical Engineering diploma focusing on applied engineering principles and industrial systems management.",
    technologies: ["Practical Engineering", "Industrial Systems", "Engineering Principles"]
  }
];

// Work Experience data
const workExperienceData = [
  {
    year: "2024 - Present",
    title: "Junior Frontend Developer",
    company: "Payouts",
    description: "Developed and maintained an internal financial dashboard using React and TypeScript. Integrated AI tools (Cursor, OpenAI API) to enhance code quality, testing, and workflow automation. Migrated state management from Context API to Redux, improving performance by 40%. Created responsive SendGrid email templates with HTML/CSS. Debugged and optimized UI performance, reducing load time by ~25%. Collaborated with backend and QA teams in Agile sprints.",
    technologies: ["React", "TypeScript", "Redux", "HTML/CSS", "Cursor", "OpenAI API", "SendGrid", "Agile"]
  },
  {
    year: "2004 - 2024",
    title: "Production and Material Planner",
    company: "Mars Antennas and RF Systems",
    description: "Led production and supply chain planning for 20 employees. Implemented ERP (Priority) optimizations to improve workflow efficiency. Coordinated with global suppliers and introduced process automation. Trained and mentored teams; standardized production documentation.",
    technologies: ["ERP-Priority", "Supply Chain Management", "Process Automation", "Team Leadership", "Excel", "Project Management"]
  }
];

const SkillBar = ({ skill, index }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(skill.level);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [skill.level, index]);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {skill.icon}
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <span className="text-gray-400 text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedLevel}%` }}
        ></div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index, isWork = false }) => {
  return (
    <div className={`flex items-start gap-4 relative ${index !== (isWork ? workExperienceData.length - 1 : educationData.length - 1) ? 'pb-8' : ''}`}>
      {/* Timeline line */}
      {index !== (isWork ? workExperienceData.length - 1 : educationData.length - 1) && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-600"></div>
      )}
      
      {/* Icon */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
        isWork ? 'bg-blue-600' : 'bg-green-600'
      } relative z-10`}>
        {isWork ? <BsBriefcase className="text-white" /> : <BsMortarboard className="text-white" />}
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">{item.year}</span>
          </div>
          <p className="text-blue-400 font-medium mb-2">{item.company}</p>
          <p className="text-gray-300 mb-3 leading-relaxed">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutMePage = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend");

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative">
            <img
              className="rounded-2xl w-48 h-48 object-cover shadow-2xl"
              src={LogoImage}
              alt="portfolio"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900"></div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
             <span className="text-blue-400">Hi! I'm Jenya Proviz</span>
          </h1>
          <h2 className="text-xl lg:text-2xl text-gray-300 mb-6">
            Full Stack Web Developer & AI Expert
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">2+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">10+</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">30+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">3</div>
              <div className="text-sm text-gray-400">Languages</div>
            </div>
          </div>

          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
            onClick={downloadCV}
          >
            <AiOutlineDownload />
            Download CV
          </button>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <AiOutlineCheckCircle />
              My Journey
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              A <strong>Full Stack Web Developer</strong> with a strong Frontend focus (React + TypeScript), 
              building on over 20 years of experience as an Industrial Engineer and Production Planning Manager. 
              I combine deep systems thinking and process optimization expertise with modern software development.
            </p>
            <p className="text-gray-300 leading-relaxed">
              After leading production, supply chain, and ERP implementations for two decades, I expanded into 
              tech through formal studies and self-driven projects.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <BsAward />
              What I Bring
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Currently completing the AI Experts program at John Bryce, specializing in Python, 
              Machine Learning, Deep Learning, and AI-driven automation.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm passionate about building scalable, user-friendly web applications and integrating AI 
              to automate and enhance workflows. Fluent in Hebrew, Russian, and English.
            </p>
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Languages</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Hebrew */}
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🇮🇱</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hebrew</h3>
              <p className="text-blue-400 font-medium mb-3">Native</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full w-full"></div>
              </div>
              <p className="text-gray-400 text-sm">Mother tongue, professional proficiency</p>
            </div>

 {/* English */}
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🇺🇸</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">English</h3>
              <p className="text-green-400 font-medium mb-3">Advanced</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full w-4/5"></div>
              </div>
              <p className="text-gray-400 text-sm">Professional working proficiency</p>
            </div>

            {/* Russian */}
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🇷🇺</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Russian</h3>
              <p className="text-yellow-400 font-medium mb-3">Native</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-100 h-2 rounded-full w-full"></div>
              </div>
              <p className="text-gray-400 text-sm">Mother tongue, professional proficiency</p>
            </div>

           

          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Skills</h2>
        
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1">
            {Object.keys(skillsData).map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  activeSkillCategory === category
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {skillsData[activeSkillCategory].map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
        <div className="max-w-4xl mx-auto">
          {educationData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} isWork={false} />
          ))}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Experience</h2>
        <div className="max-w-4xl mx-auto">
          {workExperienceData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} isWork={true} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Let's Work Together!
        </h3>
        <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
          I'm currently seeking opportunities as a Frontend or Full Stack Developer, 
          where I can grow, contribute, and create impactful solutions.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300"
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
};

export default AboutMePage;