export class ProjectManager {
  static async getProjects() {
    const result = await chrome.storage.local.get('projects');
    return result.projects || [];
  }

  static async createProject(name, context = "") {
    const projects = await this.getProjects();
    const newProject = {
      id: Date.now().toString(),
      name,
      context,
      createdAt: new Date().toISOString(),
      sessions: []
    };
    projects.push(newProject);
    await chrome.storage.local.set({ projects });
    return newProject;
  }

  static async saveSession(projectId, session) {
    const projects = await this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (project) {
      project.sessions.push(session);
      await chrome.storage.local.set({ projects });
    }
  }
}
