import React, { useState } from "react";
import { AiFillGithub, AiOutlineEye, AiOutlineFilter } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiTailwindcss, SiRedux, SiExpress, SiHtml5, SiCss3, SiPython, SiDocker } from "react-icons/si";

// Sample projects data - you can later move this to a separate file or fetch from API
const projectsData = [
  {
    id: 1,
    title: "Portfolio & Blog Platform",
    description: "A full-stack blog and portfolio website built with React and Node.js. Features user authentication, post management, dark theme, and responsive design.",
    image: "/api/placeholder/600/300",
    technologies: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS", "Express"],
    githubUrl: "https://github.com/yourusername/portfolio-blog",
    liveUrl: "https://yourportfolio.com",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "Admin dashboard for e-commerce management with real-time analytics, inventory management, and order tracking. Built with modern React patterns.",
    image: "/api/placeholder/600/300",
    technologies: ["React", "Redux", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/ecommerce-dashboard",
    liveUrl: "https://dashboard-demo.com",
    category: "Frontend"
  },
  {
    id: 3,
    title: "Task Management API",
    description: "RESTful API for task management with user authentication, role-based access control, and real-time notifications using WebSockets.",
    image: "/api/placeholder/600/300",
    technologies: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    githubUrl: "https://github.com/yourusername/task-api",
    liveUrl: null,
    category: "Backend"
  },
  {
    id: 4,
    title: "Weather App",
    description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics. Responsive design for all devices.",
    image: "/api/placeholder/600/300",
    technologies: ["React", "JavaScript", "CSS3", "Weather API"],
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://weather-app-demo.com",
    category: "Frontend"
  },
  {
    id: 5,
    title: "Docker Microservices",
    description: "Microservices architecture implementation using Docker containers, with service discovery, load balancing, and monitoring.",
    image: "/api/placeholder/600/300",
    technologies: ["Docker", "Node.js", "Python", "MongoDB", "Redis"],
    githubUrl: "https://github.com/yourusername/microservices",
    liveUrl: null,
    category: "DevOps"
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat application with private messaging, group chats, file sharing, and emoji support. Built with Socket.io for real-time communication.",
    image: "/api/placeholder/600/300",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    githubUrl: "https://github.com/yourusername/chat-app",
    liveUrl: "https://chat-app-demo.com",
    category: "Full Stack"
  }
];

// Technology icons mapping
const techIcons = {
  "React": <SiReact className="text-blue-400" />,
  "Node.js": <SiNodedotjs className="text-green-500" />,
  "MongoDB": <SiMongodb className="text-green-600" />,
  "JavaScript": <SiJavascript className="text-yellow-500" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  "Redux": <SiRedux className="text-purple-600" />,
  "Express": <SiExpress className="text-gray-400" />,
  "HTML5": <SiHtml5 className="text-orange-500" />,
  "CSS3": <SiCss3 className="text-blue-500" />,
  "Python": <SiPython className="text-yellow-400" />,
  "Docker": <SiDocker className="text-blue-400" />,
  "Socket.io": <span className="text-gray-300">🔌</span>,
  "JWT": <span className="text-yellow-300">🔐</span>,
  "Chart.js": <span className="text-pink-400">📊</span>,
  "Weather API": <span className="text-blue-300">🌤️</span>,
  "Redis": <span className="text-red-500">⚡</span>
};

export const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Full Stack", "Frontend", "Backend", "DevOps"];

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My Projects
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Here's a showcase of my recent work and projects. Each project represents a unique challenge 
          and demonstrates different aspects of my development skills.
        </p>
      </div>

      {/* Filter and Search Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <AiOutlineFilter className="text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <AiOutlineEye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
                    >
                      <AiFillGithub className="text-white text-xl" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
                    >
                      <FiExternalLink className="text-white text-xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {project.category}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-md text-xs"
                  >
                    {techIcons[tech] || <span>🔧</span>}
                    <span className="text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 flex-1 justify-center"
                  >
                    <AiFillGithub />
                    <span className="text-sm">Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300 flex-1 justify-center"
                  >
                    <FiExternalLink />
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">
            No projects found matching your criteria.
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16 py-8 bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Interested in Working Together?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          I'm always open to discussing new opportunities and interesting projects. 
          Feel free to reach out if you'd like to collaborate!
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300"
        >
          <span>Get In Touch</span>
          <FiExternalLink />
        </a>
      </div>
    </div>
  );
};