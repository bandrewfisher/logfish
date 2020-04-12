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

  public log(logData: any, { level }: LogConfig = { level: 'INFO' }) {
    this.axiosInstance.post('/log', { data: `${level}: ${logData}` });
  }

  public info(logData: any) {
    this.log(logData, { level: 'INFO' });
  }

  public warn(logData: any) {
    this.log(logData, { level: 'WARN' });
  }

  public debug(logData: any) {
    this.log(logData, { level: 'DEBUG' });
  }

  public error(logData: any) {
    this.log(logData, { level: 'ERROR' });
  }
}
