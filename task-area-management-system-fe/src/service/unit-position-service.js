import apiClient from "./api-client";

const serviceBaseUrl = "/unitPosition";

const unitPositionService = {
  createUnitPosition: async (taskData) => {
    const response = await apiClient.post(serviceBaseUrl + "/save", taskData);
    return response.data;
  },

  getByUnitId: async (unitId) => {
    const response = await apiClient.get(
      serviceBaseUrl + "/getByUnitId/" + unitId,
    );
    return response.data;
  },

  getUnitPositionStatistics: async () => {
    const response = await apiClient.get(
      serviceBaseUrl + "/getUnitPositionStatistics",
    );
    return response.data;
  },
};

export default unitPositionService;
