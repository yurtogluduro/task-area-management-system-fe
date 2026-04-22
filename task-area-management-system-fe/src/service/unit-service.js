import apiClient from "./api-client";

const serviceBaseUrl = "/unit";

const unitService = {
  getAllUnits: async () => {
    const response = await apiClient.get(serviceBaseUrl + "/getAll");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(serviceBaseUrl + "/getById/" + id);
    return response.data;
  },

  createUnit: async (taskData) => {
    const response = await apiClient.post(serviceBaseUrl + "/save", taskData);
    return response.data;
  },
};

export default unitService;
