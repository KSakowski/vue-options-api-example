export interface Page {
    page: number;
    perPage: number;
    sort: string;
    order: string;
    total?: number;
}

export interface Filter {
    [prop: string]: unknown;
}
