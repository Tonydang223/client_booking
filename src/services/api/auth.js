import axios from "axios";
import { URL_AUTH } from "../../utils/constant";
import apiClient from "./config";

const apiHandler = {
  signup: async (params) => {
    const url = `${URL_AUTH}/register`;
    const res = await apiClient.post(url, params);
    return res;
  },
  signin: async (params) => {
    const url = `${URL_AUTH}/login`;
    const res = await apiClient.post(url, params);
    return res;
  },
  verify: async (params) => {
    const url = `${URL_AUTH}/verify-email`;
    const res = await apiClient.post(url, params);
    return res;
  },
  resetLink: async (params) => {
    const url = `${URL_AUTH}/resetLink`;
    const res = await apiClient.post(url, params);
    return res;
  },
  forgotPass: async (params) => {
    const url = `${URL_AUTH}/forgotPass`;
    const res = await apiClient.post(url, params);
    return res;
  },
  resetPass: async (params) => {
    const url = `${URL_AUTH}/resetPass`;
    const res = await apiClient.post(url, params);
    return res;
  },
  refreshToken: async (params) => {
    const url = `${URL_AUTH}/refreshToken`;
    const res = await apiClient.post(url, params);
    return res;
  },
};

export default apiHandler;
