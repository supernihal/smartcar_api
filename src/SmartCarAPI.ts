import MMAPI from "./MMAPI";

class SmartcarAPI {
  private readonly mmAPI: MMAPI;

  constructor() {
    this.mmAPI = new MMAPI();
  }

  async getVehicleInfo(id: string) {
    try {
      const data = await this.mmAPI.getVehicleInfo(id);

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
      const data = await this.mmAPI.getSecurityStatus(id);
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
      const data = await this.mmAPI.getEnergyService(id);
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
      const data = await this.mmAPI.getEnergyService(id);
      const tankLevel = parseFloat(data.tankLevel.value);

      return {
        percent: isNaN(tankLevel) ? 0 : tankLevel,
      };
    } catch (error) {
      throw error;
    }
  }

  async startEngine(id: string) {
    return this.mmAPI.startEngine(id);
  }

  async stopEngine(id: string) {
    return this.mmAPI.stopEngine(id);
  }
}

export default SmartcarAPI;
