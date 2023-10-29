import { Page } from "@/interfaces/pager";
import { Meta } from "@/interfaces";

export default class Pager {
    public page: number;
    public perPage: number;
    public total: number;
    public sort: string;
    public order: string;

    constructor(page = 1, perPage = 20, sort = '', order = 'ASC') {
        this.page = page;
        this.perPage = perPage;
        this.sort = sort;
        this.order = order;
    }

    public data(): Page {
        return {
            page: this.page,
            perPage: this.perPage,
            sort: this.sort,
            order: this.order
        }
    }

    public setMeta(meta: Meta): void {
        this.total = meta.total;
    }
}
