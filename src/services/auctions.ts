import axios from "axios";
import {Auction, InvoiceModel, InvoiceUpdate, Response} from "@/interfaces";
import { Filter, Page } from "@/interfaces/pager";

export default class AuctionsService
{
    public static async create(form: Auction): Promise<Response<Auction>>
    {
        return (await axios.post(`auctions`, {...form})).data;
    }

    public static async edit(id: string, form: FormData): Promise<Response<Auction>>
    {
        return (await axios({
            method: 'post',
            url: `auctions/${id}`,
            data: form,
            headers: {
                'content-type': 'multipart/form-data'
            }
        })).data;

    }

    public static async auctions(pager: Page, filter: Filter): Promise<Response<Auction[]>>
    {
        return (await axios.get('auctions', {
            params: { ...pager, ...filter}
        })).data;
    }

    public static async details(id: string): Promise<Response<Auction>>
    {
        return (await axios.get(`auctions/${id}`)).data;
    }

    public static async createInvoice(id: string, form: InvoiceUpdate): Promise<Response<Auction>>
    {
        return (await axios.post(`auctions/${id}/invoice`, {...form})).data;
    }

    public static async invoiceData(id: string): Promise<Response<InvoiceModel>>
    {
        return (await axios.get(`auctions/${id}/invoice`)).data;
    }

    public static async sendTransactionDataNotification(id: string): Promise<Response<any>>
    {
        return (await axios.post(`auctions/${id}/send-transaction-data-notification`)).data;
    }

}
