import axios from 'axios';

export type LogConfigLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export interface LogConfig {
  level: LogConfigLevel;
}
export default class Logfish {
  private axiosInstance: import('axios').AxiosInstance;

  constructor(apiKey: string, url: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
    });
    this.axiosInstance.defaults.headers['logfish-key'] = apiKey;
  }

  public log(data: any, { level }: LogConfig = { level: 'INFO' }) {
    this.axiosInstance.post('/log', `${level}: ${data}`);
  }

  public info(data: any) {
    this.log(data, { level: 'INFO' });
  }

  public warn(data: any) {
    this.log(data, { level: 'WARN' });
  }

  public debug(data: any) {
    this.log(data, { level: 'DEBUG' });
  }

  public error(data: any) {
    this.log(data, { level: 'ERROR' });
  }
}
