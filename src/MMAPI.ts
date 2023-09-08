import { API } from "./API";
import { BASE_URL } from "./Utils";

class MMAPI extends API {

  constructor() {
    super(BASE_URL);
  }

  async getVehicleInfo(id: string) {
    try {
      const response = await this.httpClient.post("getVehicleInfoService", {
        id,
        responseType: "JSON",
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getSecurityStatus(id: string) {
    try {
      const response = await this.httpClient.post("getSecurityStatusService", {
        id,
        responseType: "JSON",
      });

      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getEnergyService(id: string) {
    try {
      const response = await this.httpClient.post("getEnergyService", {
        id,
        responseType: "JSON",
      });

      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async startEngine(id: string) {
    return this.actionEngine(id, "START_VEHICLE");
  }

  async stopEngine(id: string) {
    return this.actionEngine(id, "STOP_VEHICLE");
  }

  private async actionEngine(id: string, command: string) {
    try {
      const response = await this.httpClient.post("actionEngineService", {
        id,
        command,
        responseType: "JSON",
      });

      const actionResult = response.data.actionResult;

      return {
        status: actionResult.status === "EXECUTED" ? "success" : "error",
      };
    } catch (error) {
      throw error;
    }
  }
}

export default MMAPI;
