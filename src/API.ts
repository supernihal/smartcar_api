import axios, { AxiosInstance } from 'axios';

export abstract class API {
  protected readonly baseURL: string;
  protected readonly httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.httpClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}