import axios from "axios";

export default class FileService
{
    public static async file(id: string): Promise<any>
    {
        return (await axios({
            method: 'get',
            url: `files/${id}?download=1`,
            responseType: 'blob'
        }));
    }
}
