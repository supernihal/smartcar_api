import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SmartcarAPI from "./SmartCardAPI";

xdescribe("Smartcar server", () => {
  let smartcarAPI: SmartcarAPI;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    smartcarAPI = new SmartcarAPI();
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should get vehicle info", async () => {
    const id = "1234";
    const mockResponse = {
      data: {
        service: "getVehicleInfo",
        status: "200",
        data: {
          vin: { type: "String", value: "123123412412" },
          color: { type: "String", value: "Metallic Silver" },
          fourDoorSedan: { type: "Boolean", value: "True" },
          twoDoorCoupe: { type: "Boolean", value: "False" },
          driveTrain: { type: "String", value: "v8" },
        },
      },
    };

    const result = await smartcarAPI.getVehicleInfo(id);

    expect(result).toEqual({
      vin: "123123412412",
      color: "Metallic Silver",
      doorCount: 4,
      driveTrain: "v8",
    });
  });

  it("should get security status", async () => {
    const id = "1234";
    const mockResponse = {
      data: {
        service: "getSecurityStatus",
        status: "200",
        data: {
          doors: {
            type: "Array",
            values: [
              {
                location: { type: "String", value: "frontLeft" },
                locked: { type: "Boolean", value: "False" },
              },
              {
                location: { type: "String", value: "frontRight" },
                locked: { type: "Boolean", value: "True" },
              },
            ],
          },
        },
      },
    };

    mockAxios.onPost("/v1/getSecurityStatusService").reply(200, mockResponse);

    const result = await smartcarAPI.getSecurityStatus(id);

    expect(result).toEqual([
      { location: "frontLeft", locked: false },
      { location: "frontRight", locked: true },
    ]);
  });

  it("should get battery range", async () => {
    const id = "1234";
    const mockResponse = {
      data: {
        service: "getEnergy",
        status: "200",
        data: {
          tankLevel:  { type: "Null", value: "null" },
          batteryLevel: { type: "Number", value: "82.5" },
        },
      },
    };

    mockAxios.onPost("/v1/getEnergyService").reply(200, mockResponse);

    const result = await smartcarAPI.getBatteryRange(id);

    expect(result).toEqual({ percent: 0 });
  });

  it("should get fuel range", async () => {
    const id = "1234";
    const mockResponse = {
      data: {
        service: "getEnergy",
        status: "200",
        data: {
          tankLevel: { type: "Number", value: "30.2" },
          batteryLevel: { type: "Null", value: "null" },
        },
      },
    };

    mockAxios.onPost("/v1/getEnergyService").reply(200, mockResponse);

    const result = await smartcarAPI.getFuelRange(id);

    expect(result).toEqual({ percent: 30.2 });
  });

  it("should start engine", async () => {
    const id = "1234";
    const mockResponse = {
      data: {
        service: "actionEngine",
        status: "200",
        actionResult: { status: "EXECUTED" },
      },
    };

    mockAxios.onPost("/v1/actionEngineService").reply(200, mockResponse);

    const result = await smartcarAPI.startEngine(id);

    expect(result).toEqual({ status: "success" });
  });

  it("should stop engine", async () => {
    const id = "1234";
    const mockResponse = {
      data: {
        service: "actionEngine",
        status: "200",
        actionResult: { status: "EXECUTED" },
      },
    };

    mockAxios.onPost("/v1/actionEngineService").reply(200, mockResponse);

    const result = await smartcarAPI.stopEngine(id);

    expect(result).toEqual({ status: "success" });
  });
});
