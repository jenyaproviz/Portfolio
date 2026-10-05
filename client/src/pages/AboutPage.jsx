import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDownload, AiOutlineCheckCircle } from "react-icons/ai";
import { BsBriefcase, BsMortarboard, BsAward } from "react-icons/bs";
import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiMongodb,
  SiTailwindcss, SiRedux, SiExpress, SiPython, SiHtml5, SiCss3,
  SiBootstrap, SiGit, SiFigma, SiMysql, SiStorybook, SiOpenai,
  SiMicrosoftexcel, SiJira, SiVuedotjs, SiTensorflow, SiPandas,
  SiNumpy, SiJupyter, SiDocker,
} from "react-icons/si";

const skillsData = {
  Frontend: [
    { name: "React", icon: <SiReact className="text-blue-400" />, level: 85 },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, level: 80 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" />, level: 90 },
    { name: "Redux", icon: <SiRedux className="text-purple-600" />, level: 80 },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" />, level: 95 },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500" />, level: 85 },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: 90 },
    { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" />, level: 75 },
    { name: "Vue.js", icon: <SiVuedotjs className="text-green-500" />, level: 65 },
    { name: "Storybook", icon: <SiStorybook className="text-pink-600" />, level: 70 },
  ],
  Backend: [
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
    { name: "AI Agents", icon: <span className="text-purple-400">🧠</span>, level: 75 },
    { name: "Workflow Automation", icon: <span className="text-orange-400">⚙️</span>, level: 75 },
    { name: "SendGrid Templates", icon: <span className="text-blue-500">📧</span>, level: 70 },
  ],
  Tools: [
    { name: "Git", icon: <SiGit className="text-orange-600" />, level: 100 },
    { name: "Figma", icon: <SiFigma className="text-purple-500" />, level: 90 },
    { name: "Docker", icon: <SiDocker className="text-blue-400" />, level: 60 },
    { name: "Excel", icon: <SiMicrosoftexcel className="text-green-600" />, level: 100 },
    { name: "Jira", icon: <SiJira className="text-blue-500" />, level: 85 },
    { name: "Priority ERP", icon: <span className="text-gray-400">📊</span>, level: 100 },
  ],
  "Currently Learning": [
    { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" />, level: 50 },
    { name: "Pandas", icon: <SiPandas className="text-blue-600" />, level: 50 },
    { name: "NumPy", icon: <SiNumpy className="text-blue-400" />, level: 50 },
    { name: "Jupyter", icon: <SiJupyter className="text-orange-400" />, level: 50 },
    { name: "Machine Learning", icon: <span className="text-purple-500">🔬</span>, level: 50 },
    { name: "Deep Learning", icon: <span className="text-indigo-500">🧬</span>, level: 50 },
  ],
};

const educationData = [
  {
    year: "2025 - 2026",
    title: "AI Experts | Data Science, Machine Learning and Deep Learning",
    company: "John Bryce College",
    description: "440-hour program covering Python, data analysis, machine learning, deep learning, generative AI, and cloud deployment. Coursework includes building and evaluating models with TensorFlow, Scikit-learn, and Pandas.",
    technologies: ["Python", "Data Analysis", "Machine Learning", "Deep Learning", "Generative AI", "TensorFlow", "Scikit-learn", "Pandas", "LangChain", "Docker", "Cloud Deployment"],
  },
  {
    year: "2022 - 2024",
    title: "Full Stack Web Development",
    company: "HackerU College",
    description: "540-hour program covering frontend and backend development with React, JavaScript, TypeScript, Node.js, MongoDB, and REST APIs.",
    technologies: ["React", "Redux", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Storybook", "Node.js", "MongoDB", "REST API", "MySQL"],
  },
  {
    year: "2005 - 2010",
    title: "B.Sc. Industrial Engineering & Technology Management",
    company: "Holon Institute of Technology (HIT)",
    description: "Bachelor's degree in Industrial Engineering, with a focus on technology management, systems optimization, and process improvement.",
    technologies: ["Industrial Engineering", "Technology Management", "Systems Optimization", "Process Improvement"],
  },
  {
    year: "2002 - 2004",
    title: "Practical Engineer",
    company: "College of Management Academic Studies",
    description: "Diploma in practical engineering and industrial systems management.",
    technologies: ["Practical Engineering", "Industrial Systems", "Engineering Principles"],
  },
];

const workExperienceData = [
  {
    year: "2026 - Present",
    title: "Full Stack Developer",
    company: "Solventis",
    description: "Independent client project. Designed, developed, and deployed a website for an international sourcing and procurement company. Responsible for ongoing maintenance.",
    technologies: ["React", "JavaScript", "Node.js", "Tailwind CSS", "REST API", "Deployment"],
  },
  {
    year: "Dec 2025 - Present",
    title: "Production Planner, Industrial Engineer & Priority ERP Implementer",
    company: "Elmul / Exosens Group",
    description: "Production and material planning, Priority ERP implementation, and operational support. Work with production, purchasing, inventory, and planning data.",
    technologies: ["ERP-Priority", "Production Planning", "MRP", "Supply Chain", "Excel"],
  },
  {
    year: "Aug 2024 - Nov 2025",
    title: "Frontend Developer",
    company: "Payouts",
    description: "Developed an internal financial application with React and TypeScript. Built reusable components, integrated REST APIs, and migrated state management from Context API to Redux. Created responsive SendGrid email templates and worked with backend developers and QA.",
    technologies: ["React", "TypeScript", "Redux", "HTML/CSS", "REST API", "SendGrid", "Agile"],
  },
  {
    year: "2004 - 2024",
    title: "Production & Material Planner",
    company: "Mars Antennas and RF Systems",
    description: "Production, material, and supply-chain planning. Implemented Priority ERP workflows and coordinated purchasing, suppliers, and production. Trained teams and standardized production documentation.",
    technologies: ["ERP-Priority", "Supply Chain Management", "Process Automation", "Team Leadership", "Excel", "Project Management"],
  },
];

const SkillBar = ({ skill, index }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLevel(skill.level), index * 100);
    return () => clearTimeout(timer);
  }, [skill.level, index]);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span aria-hidden="true">{skill.icon}</span>
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <span className="text-gray-400 text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </div>
  );
};

const TimelineItem = ({ item, isLast, isWork = false }) => (
  <div className={`relative flex items-start gap-4 ${isLast ? "" : "pb-8"}`}>
    {!isLast && <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-600" />}
    <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isWork ? "bg-blue-600" : "bg-green-600"}`}>
      {isWork ? <BsBriefcase className="text-white" aria-hidden="true" /> : <BsMortarboard className="text-white" aria-hidden="true" />}
    </div>
    <div className="min-w-0 flex-1 rounded-lg bg-gray-800 p-4 hover:bg-gray-700 transition-all duration-300">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <span className="rounded bg-gray-700 px-2 py-1 text-sm text-gray-400">{item.year}</span>
      </div>
      <p className="mb-2 font-medium text-blue-400">{item.company}</p>
      <p className="mb-3 leading-relaxed text-gray-300">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <span key={tech} className="rounded-md bg-gray-700 px-2 py-1 text-xs text-gray-300">{tech}</span>
        ))}
      </div>
    </div>
  </div>
);

const AboutMePage = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend");

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-16 flex flex-col items-center gap-12 lg:flex-row">
        <div className="flex justify-center lg:w-1/3">
          <div className="relative">
            <img className="rounded-2xl w-48 h-48 object-cover shadow-2xl" src="/LOGO.jpg" alt="Jenya Proviz" />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900" />
          </div>
        </div>
        <div className="lg:w-2/3">
          <h1 className="mb-4 text-4xl font-bold text-blue-400 lg:text-5xl">Jenya Proviz</h1>
          <h2 className="text-xl lg:text-2xl text-gray-300 mb-6">Full Stack Developer</h2>
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
          <a
            href="/My_CV.pdf"
            download
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <AiOutlineDownload aria-hidden="true" />
            Download CV
          </a>
        </div>
      </div>

      <section className="mb-16" aria-labelledby="about-heading">
        <h2 id="about-heading" className="mb-8 text-center text-3xl font-bold text-white">About Me</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <AiOutlineCheckCircle aria-hidden="true" />
              Background
            </h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              I develop web applications with React, TypeScript, and Node.js.
              Before moving into software development, I worked in industrial
              engineering and production planning for over 20 years.
            </p>
            <p className="leading-relaxed text-gray-300">
              My work has included production and material planning, supply-chain
              coordination, and Priority ERP implementation. I moved into web
              development through formal training and independent projects.
            </p>
          </div>
          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <BsAward aria-hidden="true" />
              Current Focus
            </h3>
            <p className="mb-4 leading-relaxed text-gray-300">
              I am completing the AI Experts program at John Bryce, studying
              Python, machine learning, deep learning, and automation.
            </p>
            <p className="leading-relaxed text-gray-300">
              I work on frontend interfaces, API integrations, and applications
              for planning and operational workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16" aria-labelledby="languages-heading">
        <h2 id="languages-heading" className="mb-8 text-center text-3xl font-bold text-white">Languages</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">🇮🇱</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hebrew</h3>
              <p className="text-blue-400 font-medium mb-3">Native</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full w-full" />
              </div>
              <p className="text-gray-400 text-sm">Native proficiency</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">🇺🇸</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">English</h3>
              <p className="text-green-400 font-medium mb-3">Advanced</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full w-4/5" />
              </div>
              <p className="text-gray-400 text-sm">Professional working proficiency</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">🇷🇺</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Russian</h3>
              <p className="text-yellow-400 font-medium mb-3">Native</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-100 h-2 rounded-full w-full" />
              </div>
              <p className="text-gray-400 text-sm">Native proficiency</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="mb-8 text-center text-3xl font-bold text-white">Technical Skills</h2>
        <div className="mb-8 flex justify-center">
          <div className="flex max-w-full flex-wrap justify-center gap-2 rounded-lg bg-gray-800 p-1">
            {Object.keys(skillsData).map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeSkillCategory === category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-4 md:px-6 py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${activeSkillCategory === category ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
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
      </section>

      <section className="mb-16" aria-labelledby="education-heading">
        <h2 id="education-heading" className="mb-8 text-center text-3xl font-bold text-white">Education</h2>
        <div className="mx-auto max-w-4xl">
          {educationData.map((item, index) => (
            <TimelineItem key={item.title} item={item} isLast={index === educationData.length - 1} />
          ))}
        </div>
      </section>
      <section className="mb-16" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="mb-8 text-center text-3xl font-bold text-white">Professional Experience</h2>
        <div className="mx-auto max-w-4xl">
          {workExperienceData.map((item, index) => (
            <TimelineItem key={item.company} item={item} isLast={index === workExperienceData.length - 1} isWork />
          ))}
        </div>
      </section>
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-white mb-4">Work Inquiries</h3>
        <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
          For frontend or full stack roles, or questions about my work, use the contact page.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
};

export default AboutMePage;
