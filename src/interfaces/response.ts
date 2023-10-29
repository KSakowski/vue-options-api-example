import {AxiosRequestConfig} from "axios";

export interface Response<T> {
    success: boolean;
    message: string;
    data: T;
    links: unknown[];
    meta: Meta;
    errors: string[];
}

export interface Meta {
    url: number;
    from: number;
    last_page: number;
    links: MetaLink;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface MetaLink {
    url: number;
    label: string;
    active:	boolean;
}

export interface Exception {
    code: number;
    message: string;
    errors: KeyValue<string[]> | null;
}

export interface KeyValue<T> {
    [key: string]: T;
}

export interface AxiosBlobResponse<T = any>  {
    config: AxiosRequestConfig
    data: Blob;
    headers: any;
    request: any;
    status: number;
    statusText: string;
    size: number;
}
