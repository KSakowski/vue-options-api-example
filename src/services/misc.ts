import axios from "axios";
import { Currency, Response } from "@/interfaces";

export default class MiscService
{
    public static async currencies(): Promise<Response<Currency[]>>
    {
        return (await axios.get(`misc/currencies`)).data;
    }
}
