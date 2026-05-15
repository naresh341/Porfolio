"use client";
  import axios from 'axios';

  const apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL, 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("ENV VALUE:", process.env.NEXT_PUBLIC_API_URL);

  export const projectService = {
    getAllProjects: async () => {
      const response = await apiClient.get('/api/projects/');
      return response.data;
    },

    createProject: async (formData: FormData) => {
      const response = await apiClient.post('/api/projects/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },

    deleteProject: async (id: number) => {
      const response = await apiClient.delete(`/api/projects/${id}`);
      return response.data;
    }
  };

  export const webhookService = {
    triggerManualSync: async () => {
      const response = await apiClient.post('/api/webhooks/sync-all');
      return response.data;
    }

  };

  export const profileService = {
    sendContactMessage: async (contactData: { name: string; email: string; message: string;projectType: string; }) => {
      const response = await apiClient.post('/api/contact', contactData);
      return response.data;
    },
  
    getResumeUrl: () => {
      return `${process.env.NEXT_PUBLIC_API_URL}/api/resume/download`;
    }
  };
  
  export const spotifyService = {
    getNowPlaying: async () => {
      const response = await apiClient.get('/spotify/now-playing');
      return response.data;
    }
  };

  export const githubService = {
    getLatestGlobalCommit: async (username: string) => {
      try {
        // Get all repos
        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );
  
        const repos = reposResponse.data;
  
        if (!repos.length) return null;
  
        // Fetch latest commit from all repos
        const commitPromises = repos.map(async (repo: any) => {
          try {
            const commitsResponse = await axios.get(
              `https://api.github.com/repos/${username}/${repo.name}/commits`
            );
  
            const latestCommit = commitsResponse.data[0];
  
            if (!latestCommit) return null;
  
            return {
              message: latestCommit.commit.message,
              repo: repo.name,
              date: latestCommit.commit.author.date,
            };
          } catch {
            return null;
          }
        });
  
        const commits = (await Promise.all(commitPromises)).filter(Boolean);
  
        if (!commits.length) return null;
  
        // Sort newest first
        commits.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
  
        return commits[0];
      } catch (error) {
        console.error("GitHub Global Commit Error:", error);
        return null;
      }
    },
  };