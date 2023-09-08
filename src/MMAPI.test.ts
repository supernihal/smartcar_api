import MMAPI from "./MMAPI";

const mockVehicleResponse = {
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

const mockSecurityResponse = {
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

const mockBatteryResponse = {
  data: {
    service: "getEnergy",
    status: "200",
    data: {
      tankLevel: { type: "Null", value: "null" },
      batteryLevel: { type: "Number", value: "82.5" },
    },
  },
};

const mockFuelResponse = {
  data: {
    service: "getEnergy",
    status: "200",
    data: {
      tankLevel: { type: "Number", value: "30.2" },
      batteryLevel: { type: "Null", value: "null" },
    },
  },
};

const mockEngineResponse = {
  data: {
    service: "actionEngine",
    status: "200",
    actionResult: { status: "EXECUTED" },
  },
};

// Mocked API methods
jest.mock("./MMAPI", () =>
  jest.fn().mockImplementation(() => ({
    getVehicleInfo: jest.fn().mockResolvedValue(mockVehicleResponse),
    getSecurityStatus: jest
      .fn()
      .mockResolvedValue(mockSecurityResponse),
    getEnergyService: jest
      .fn()
      .mockResolvedValue(mockBatteryResponse),
    startEngine: jest.fn().mockResolvedValue(mockEngineResponse),
    stopEngine: jest.fn().mockResolvedValue(mockEngineResponse),
  }))
);

describe("MMAPI", () => {
  let mmAPI: MMAPI;

  beforeEach(() => {
    mmAPI = new MMAPI();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get vehicle info", async () => {
    const id = "1234";
    const result = await mmAPI.getVehicleInfo(id);

    expect(result).toEqual(mockVehicleResponse);
  });

  it("should get security status", async () => {
    const id = "1234";
    const result = await mmAPI.getSecurityStatus(id);

    expect(result).toEqual(mockSecurityResponse);
  });

  it("should get battery range", async () => {
    const id = "1234";
    const result = await mmAPI.getEnergyService(id);

    expect(result).toEqual(mockBatteryResponse);
  });

  it("should get fuel range", async () => {
    const id = "1234";
    (mmAPI.getEnergyService as jest.Mocked<any>).mockImplementation(() => mockFuelResponse);
    const result = await mmAPI.getEnergyService(id);

    expect(result).toEqual(mockFuelResponse);
  });

  it("should start engine", async () => {
    const id = "1234";
    const result = await mmAPI.startEngine(id);

    expect(result).toEqual(mockEngineResponse);
  });

  it("should stop engine", async () => {
    const id = "1234";
    const result = await mmAPI.stopEngine(id);

    expect(result).toEqual(mockEngineResponse);
  });
});
