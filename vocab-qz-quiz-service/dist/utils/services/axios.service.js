"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpDelete = exports.httpPut = exports.httpPost = exports.httpGet = void 0;
const axios_1 = require("axios");
const token_service_1 = require("./token.service");
const axiosInstance = axios_1.default.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Powered-By': 'leqnam',
    },
});
axiosInstance.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${token_service_1.tokenService.getToken()}`;
    return config;
}, error => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((response) => {
    return response;
}, error => {
    if (error.response) {
        console.error('Error Response:', error.response.data);
    }
    else if (error.request) {
        console.error('No Response:', error.request);
    }
    else {
        console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
});
const httpGet = async (url, config) => {
    try {
        const response = await axiosInstance.get(url, config);
        return response.data;
    }
    catch (error) {
        throw handleError(error);
    }
};
exports.httpGet = httpGet;
const httpPost = async (url, data, config) => {
    try {
        const response = await axiosInstance.post(url, data, config);
        return response.data;
    }
    catch (error) {
        throw handleError(error);
    }
};
exports.httpPost = httpPost;
const httpPut = async (url, data, config) => {
    try {
        const response = await axiosInstance.put(url, data, config);
        return response.data;
    }
    catch (error) {
        throw handleError(error);
    }
};
exports.httpPut = httpPut;
const httpDelete = async (url, config) => {
    try {
        const response = await axiosInstance.delete(url, config);
        return response.data;
    }
    catch (error) {
        throw handleError(error);
    }
};
exports.httpDelete = httpDelete;
const handleError = (error) => {
    if (axios_1.default.isAxiosError(error)) {
        return new Error(error.response?.data?.message || 'An error occurred');
    }
    return new Error('An unexpected error occurred');
};
//# sourceMappingURL=axios.service.js.map