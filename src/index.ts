import axios from 'axios';

export type LogConfigLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export interface LogConfig {
  level: LogConfigLevel;
}
export default class Logfish {
  private axiosInstance: import('axios').AxiosInstance;

  constructor(apiKey: string, url: string = 'http://logfish.us-west-2.elasticbeanstalk.com/') {
    this.axiosInstance = axios.create({
      baseURL: url,
    });
    this.axiosInstance.defaults.headers['logfish-key'] = apiKey;
  }

  public async log(logData: any, { level }: LogConfig = { level: 'INFO' }) {
    await this.axiosInstance.post('/log', { data: `${level}: ${logData}` });
  }

  public async info(logData: any) {
    await this.log(logData, { level: 'INFO' });
  }

  public async warn(logData: any) {
    await this.log(logData, { level: 'WARN' });
  }

  public async debug(logData: any) {
    await this.log(logData, { level: 'DEBUG' });
  }

  public async error(logData: any) {
    await this.log(logData, { level: 'ERROR' });
  }
}
