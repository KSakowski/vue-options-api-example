import axios from "axios";
import { Auction, Response, UserModel, UserUpdate } from "@/interfaces";
import { Filter, Page } from "@/interfaces/pager";

export default class AdminService
{
    public static async users(pager: Page, filter: Filter): Promise<Response<UserModel[]>>
    {
        return (await axios.get('users', {
            params: { ...pager, ...filter}
        })).data;
    }

    public static async userDetails(id: string): Promise<Response<UserModel>>
    {
        return (await axios.get(`users/${id}`)).data;
    }

    public static async userAuctions(id: string): Promise<Response<Auction[]>>
    {
        return (await axios.get(`users/${id}/auctions`)).data;
    }

    public static async edit(id: string, form: UserUpdate): Promise<Response<UserModel>>
    {
        return (await axios.put(`users/${id}`, {...form})).data;
    }
}
