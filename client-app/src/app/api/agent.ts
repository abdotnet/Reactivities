import axios, { AxiosResponse } from "axios";
import { resolve } from "dns";
import { IActivity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api/";

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );
const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

let base = "activities";
const Activities = {
  list: (): Promise<IActivity[]> => requests.get(`${base}`),
  details: (id: string): Promise<IActivity> => requests.get(`${base}/${id}`),
  create: (activity: IActivity) => requests.post(`${base}`, activity),
  update: (activity: IActivity) => requests.put(`${base}`, activity),
  delete: (id: string) => requests.del(`${base}/${id}`),
};

export default {
  Activities,
};
