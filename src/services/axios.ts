import pickBy from 'lodash/pickBy';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';

export const instance = (baseURL: string): AxiosInstance => {
    const cookies = new Cookies();
    const axiosInstance = axios.create({
        baseURL,
        paramsSerializer: (params) => qs.stringify(params),
        timeout: 20000,
        headers: {
            Authorization: 'Bearer ' + cookies.get('access_token') || '',
        },
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

export const apiAxios = instance(`${process.env.REACT_APP_API}`);

export function setHeaders(params: { Authorization: string }): void {
    const newHeaders = {
        ...apiAxios.defaults.headers.common,
        ...params,
    };
    apiAxios.defaults.headers.common = pickBy(newHeaders, (val) => !!val);
}
