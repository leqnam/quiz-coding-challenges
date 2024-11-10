import { AxiosRequestConfig } from 'axios';
export declare const httpGet: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
export declare const httpPost: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
export declare const httpPut: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
export declare const httpDelete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
