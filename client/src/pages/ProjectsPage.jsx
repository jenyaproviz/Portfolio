import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillGithub, AiOutlineEye, AiOutlineFilter } from "react-icons/ai";
import { FiEdit2, FiExternalLink, FiTrash2, FiX } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiTailwindcss, SiRedux, SiExpress, SiHtml5, SiCss3, SiPython, SiDocker } from "react-icons/si";
import { getProjects, saveProjects } from "../utils/projectsStorage";

const techIcons = {
  React: <SiReact className="text-blue-400" />,
  "Node.js": <SiNodedotjs className="text-green-500" />,
  MongoDB: <SiMongodb className="text-green-600" />,
  JavaScript: <SiJavascript className="text-yellow-500" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  Redux: <SiRedux className="text-purple-600" />,
  Express: <SiExpress className="text-gray-400" />,
  HTML5: <SiHtml5 className="text-orange-500" />,
  CSS3: <SiCss3 className="text-blue-500" />,
  Python: <SiPython className="text-yellow-400" />,
  Docker: <SiDocker className="text-blue-400" />,
  "Socket.io": <span className="text-gray-300">🔌</span>,
  JWT: <span className="text-yellow-300">🔐</span>,
  "Chart.js": <span className="text-pink-400">📊</span>,
  "Weather API": <span className="text-blue-300">🌤️</span>,
  Redis: <span className="text-red-500">⚡</span>,
};

export const ProjectsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = Boolean(user?.isAdmin);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState(() => getProjects());
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [draftProject, setDraftProject] = useState(null);

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const persistProjects = (nextProjects) => {
    setProjects(nextProjects);
    saveProjects(nextProjects);
  };

  const startEditingProject = (project) => {
    setEditingProjectId(project.id);
    setDraftProject({
      ...project,
      technologies: project.technologies.join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      image: project.image || "",
    });
  };

  const cancelEditingProject = () => {
    setEditingProjectId(null);
    setDraftProject(null);
  };

  const updateDraftField = (field, value) => {
    setDraftProject((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  };

  const saveProjectChanges = () => {
    if (!draftProject?.title?.trim() || !draftProject?.description?.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    const nextProjects = projects.map((project) => {
      if (project.id !== draftProject.id) {
        return project;
      }

      return {
        ...project,
        ...draftProject,
        title: draftProject.title.trim(),
        description: draftProject.description.trim(),
        category: draftProject.category.trim(),
        image: draftProject.image.trim(),
        githubUrl: draftProject.githubUrl.trim(),
        liveUrl: draftProject.liveUrl.trim(),
        technologies: draftProject.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };
    });

    persistProjects(nextProjects);
    cancelEditingProject();
    toast.success("Project updated.");
  };

  const removeProject = (projectId) => {
    if (!window.confirm("Delete this project from the portfolio?")) {
      return;
    }

    const nextProjects = projects.filter((project) => project.id !== projectId);
    persistProjects(nextProjects);

    if (editingProjectId === projectId) {
      cancelEditingProject();
    }

    toast.success("Project removed.");
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My Projects
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Here's a showcase of my recent work and projects. Each project represents a unique challenge
          and demonstrates different aspects of my development skills.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-2xl border border-gray-700/70 overflow-hidden hover:transform hover:scale-[1.01] transition-all duration-300 hover:shadow-2xl group flex flex-col h-full min-h-[34rem]"
          >
            <div className="p-4 pb-0">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-900 ring-1 ring-white/5">
                {project.image ? (
                  <a
                    href={project.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                    aria-label={`Open ${project.title} image`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900 to-blue-950 p-6 text-center">
                    <span className="text-2xl font-semibold text-white">{project.title}</span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="pointer-events-auto flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                      >
                        <AiFillGithub className="text-white text-xl" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                      >
                        <FiExternalLink className="text-white text-xl" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-1 flex-col justify-between gap-4">
              <div className="flex flex-1 flex-col">
                {isAdmin && (
                  <div className="mb-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => startEditingProject(project)}
                      className="inline-flex items-center gap-1 rounded-md bg-gray-700 px-3 py-2 text-xs text-white transition hover:bg-gray-600"
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-xs text-white transition hover:bg-red-500"
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <span className="shrink-0 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed min-h-[4.5rem]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
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
              </div>

              <div className="flex gap-2 mt-2">
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
                    <span className="text-sm">Live Site</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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

      {isAdmin && draftProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-gray-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Edit Project</h2>
              <button
                type="button"
                onClick={cancelEditingProject}
                className="rounded-full p-2 text-white transition hover:bg-gray-800"
              >
                <FiX />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-gray-300">
                Title
                <input
                  type="text"
                  value={draftProject.title}
                  onChange={(e) => updateDraftField("title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-gray-300">
                Category
                <input
                  type="text"
                  value={draftProject.category}
                  onChange={(e) => updateDraftField("category", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-gray-300 md:col-span-2">
                Description
                <textarea
                  value={draftProject.description}
                  onChange={(e) => updateDraftField("description", e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-gray-300">
                Image Path
                <input
                  type="text"
                  value={draftProject.image}
                  onChange={(e) => updateDraftField("image", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-gray-300">
                Technologies
                <input
                  type="text"
                  value={draftProject.technologies}
                  onChange={(e) => updateDraftField("technologies", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-gray-300">
                GitHub URL
                <input
                  type="text"
                  value={draftProject.githubUrl}
                  onChange={(e) => updateDraftField("githubUrl", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm text-gray-300">
                Live URL
                <input
                  type="text"
                  value={draftProject.liveUrl}
                  onChange={(e) => updateDraftField("liveUrl", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelEditingProject}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveProjectChanges}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

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