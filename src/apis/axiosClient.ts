import axios, { AxiosError } from 'axios';
import queryString from 'query-string';
import { appInfos } from '../constants/appInfo';

const axiosClient = axios.create({
  baseURL: appInfos.BASE_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.header = {
    Authorization: '',
    Accept: 'application/json',
    ...config.header,
  };

  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status === 200) {
      return res.data;
    }
    throw new Error('Error: ' + res.status);
  },
  (error: AxiosError) => {
    // console.error({ error: error });
    throw new Error(JSON.stringify(error.response?.status));
  },
);

export default axiosClient;
