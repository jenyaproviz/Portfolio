import { projectsData } from "./projectsData";

const STORAGE_KEY = "portfolio_projects";
const PROJECTS_WITH_SYNCED_METADATA = new Set([2, 5, 6]);
const PROJECT_ORDER = new Map(
  projectsData.map((project, index) => [project.id, index])
);

const mergeProjectValues = (defaultProject, storedProject) => ({
  ...defaultProject,
  ...storedProject,
  technologies:
    PROJECTS_WITH_SYNCED_METADATA.has(defaultProject.id)
      ? defaultProject.technologies
      : Array.isArray(storedProject?.technologies) && storedProject.technologies.length > 0
      ? storedProject.technologies
      : defaultProject.technologies,
  image: PROJECTS_WITH_SYNCED_METADATA.has(defaultProject.id)
    ? defaultProject.image
    : storedProject?.image?.trim()
    ? storedProject.image
    : defaultProject.image,
  githubUrl: PROJECTS_WITH_SYNCED_METADATA.has(defaultProject.id)
    ? defaultProject.githubUrl
    : storedProject?.githubUrl?.trim()
    ? storedProject.githubUrl
    : defaultProject.githubUrl,
  liveUrl: PROJECTS_WITH_SYNCED_METADATA.has(defaultProject.id)
    ? defaultProject.liveUrl
    : storedProject?.liveUrl?.trim()
    ? storedProject.liveUrl
    : defaultProject.liveUrl,
  category: PROJECTS_WITH_SYNCED_METADATA.has(defaultProject.id)
    ? defaultProject.category
    : storedProject?.category?.trim()
    ? storedProject.category
    : defaultProject.category,
  title: PROJECTS_WITH_SYNCED_METADATA.has(defaultProject.id)
    ? defaultProject.title
    : storedProject?.title?.trim()
    ? storedProject.title
    : defaultProject.title,
  description: PROJECTS_WITH_SYNCED_METADATA.has(defaultProject.id)
    ? defaultProject.description
    : storedProject?.description?.trim()
    ? storedProject.description
    : defaultProject.description,
});

const mergeProjects = (storedProjects) => {
  const defaultProjectsById = new Map(
    projectsData.map((project) => [project.id, project])
  );

  const mergedStoredProjects = storedProjects.map((storedProject) => {
    const defaultProject = defaultProjectsById.get(storedProject?.id);

    return defaultProject
      ? mergeProjectValues(defaultProject, storedProject)
      : storedProject;
  });

  const storedProjectIds = new Set(
    mergedStoredProjects
      .map((project) => project?.id)
      .filter((projectId) => projectId !== undefined && projectId !== null)
  );

  const missingDefaultProjects = projectsData.filter(
    (project) => !storedProjectIds.has(project.id)
  );

  return [...mergedStoredProjects, ...missingDefaultProjects].sort((left, right) => {
    const leftOrder = PROJECT_ORDER.get(left?.id) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = PROJECT_ORDER.get(right?.id) ?? Number.MAX_SAFE_INTEGER;

    return leftOrder - rightOrder;
  });
};

export const getProjects = () => {
  if (typeof window === "undefined") {
    return projectsData;
  }

  const storedProjects = window.localStorage.getItem(STORAGE_KEY);

  if (!storedProjects) {
    return projectsData;
  }

  try {
    const parsedProjects = JSON.parse(storedProjects);
    return Array.isArray(parsedProjects)
      ? mergeProjects(parsedProjects)
      : projectsData;
  } catch (error) {
    return projectsData;
  }
};

export const saveProjects = (projects) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};