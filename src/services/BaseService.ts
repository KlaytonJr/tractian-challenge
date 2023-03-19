import axios, { Canceler, AxiosResponse, AxiosError } from 'axios';
import api from './api';

export const Get = <R>(url: string = '', query?: { [key: string]: any }): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        api.get(url, { params: query })
            .then((resp: AxiosResponse<R>) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                console.log('error: ', error.response);
                reject(error.response);
            });
    });

    return request;
};

export const Post = <M, R>(url: string, model: M): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        api.post<M, AxiosResponse<R>>(url, model)
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                console.log('error: ', error.response);

                reject(error.response);
            });
    });

    return request;
};

export const Put = <M, R>(url: string, model: M): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        api.put<M, AxiosResponse<R>>(url, model)
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                console.log('error: ', error.response);
                reject(error.response);
            });
    });

    return request;
};