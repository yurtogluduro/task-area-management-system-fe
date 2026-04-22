import apiClient from "./api-client";

const serviceBaseUrl = "/taskArea";

const taskAreaService = {
  getAllTasks: async () => {
    const response = await apiClient.get(serviceBaseUrl + "/getAll");
    return response.data;
  },

  createTaskArea: async (taskData) => {
    const response = await apiClient.post(serviceBaseUrl + "/save", taskData);
    return response.data;
  },
};

export default taskAreaService;
