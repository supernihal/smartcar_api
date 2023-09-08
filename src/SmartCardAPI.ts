import MMAPI from "./MMAPI";

class SmartCardAPI {
  public mmAPI: MMAPI;

  constructor() {
    this.mmAPI = new MMAPI();
  }

  async getVehicleInfo(id: string) {
    try {
      const response = await this.mmAPI.getVehicleInfo(id);
      const data = response.data.data;

      const result = {
        vin: data.vin.value,
        color: data.color.value,
        doorCount: data.fourDoorSedan.value === "True" ? 4 : 2,
        driveTrain: data.driveTrain.value,
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSecurityStatus(id: string) {
    try {
      const response = await this.mmAPI.getSecurityStatus(id);
      const data = response.data.data;
      const result = data.doors.values.map((door: any) => ({
        location: door.location.value,
        locked: door.locked.value === "True",
      }));

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBatteryRange(id: string) {
    try {
      const response = await this.mmAPI.getEnergyService(id);
      const data = response.data.data;
      const batteryLevel = parseFloat(data.batteryLevel.value);

      return {
        percent: isNaN(batteryLevel) ? 0 : batteryLevel,
      };
    } catch (error) {
      throw error;
    }
  }

  async getFuelRange(id: string) {
    try {
      const response = await this.mmAPI.getEnergyService(id);
      const data = response.data.data;
      const tankLevel = parseFloat(data.tankLevel.value);

      return {
        percent: isNaN(tankLevel) ? 0 : tankLevel,
      };
    } catch (error) {
      throw error;
    }
  }

  async startEngine(id: string) {
    const response =  await this.mmAPI.startEngine(id);
    const actionResult = response.data.actionResult;

    return {
      status: actionResult.status === "EXECUTED" ? "success" : "error",
    };
  }

  async stopEngine(id: string) {
    const response = await this.mmAPI.stopEngine(id);
    const actionResult = response.data.actionResult;

    return {
      status: actionResult.status === "EXECUTED" ? "success" : "error",
    };
  }
}

export default SmartCardAPI;
