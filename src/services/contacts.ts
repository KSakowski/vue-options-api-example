import axios from "axios";
import { Contact, Response } from "@/interfaces";

export default class ContactsService
{
    public static async contacts(): Promise<Response<Contact[]>>
    {
        return (await axios.get(`contacts`)).data;
    }
}
