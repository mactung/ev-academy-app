import pickBy from 'lodash/pickBy';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

export const instance = (baseURL: string): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL,
        paramsSerializer: (params) => qs.stringify(params),
        timeout: 20000,
        headers: {},
    });

    axiosInstance.interceptors.request.use(
        function (config) {
            return config;
        },
        function (error) {
            return Promise.reject(error);
        },
    );

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            return Promise.reject(error);
        },
    );

    return axiosInstance;
};

export const apiAxios = instance('http://ev-academy.test/');

export function setHeaders(params: { Authorization: string }): void {
    const newHeaders = {
        ...apiAxios.defaults.headers.common,
        ...params,
    };
    apiAxios.defaults.headers.common = pickBy(newHeaders, (val) => !!val);
}
