import apiClient from "./api-client";

const serviceBaseUrl = "/unitPosition";

const unitPositionService = {
  createUnitPosition: async (taskData) => {
    const response = await apiClient.post(serviceBaseUrl + "/save", taskData);
    return response.data;
  },
};

export default unitPositionService;
