import apiClient from "./api-client";

const taskAreaService = {
  getAllTasks: async () => {
    const response = await apiClient.get("/taskArea");
    return response.data;
  },

  createTaskArea: async (taskData) => {
    const response = await apiClient.post("/taskArea", taskData);
    return response.data;
  },
};

export default taskAreaService;
