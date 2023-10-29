import axios from "axios";
import {
    UserModelWithToken,
    UserLogin,
    UserStore,
    Response,
    Auction,
    PasswordResetToken,
    UserUpdate, UserModel, Payment, Customs, ExciseTranslations, TrackingDelivery
} from "@/interfaces";

export default class AuthService
{
    public static async login(form: UserLogin): Promise<Response<UserModelWithToken>>
    {
        return (await axios.post('auth/login', {...form})).data;
    }

    public static async register(form: UserStore): Promise<Response<null>>
    {
        return (await axios.post('auth/register', {...form})).data;
    }

    public static async resetPassword(form: PasswordResetToken): Promise<Response<null>>
    {
        return (await axios.post('auth/password/reset', {...form})).data;
    }

    public static async sendEmail(email: string): Promise<Response<null>>
    {
        return (await axios.post('auth/password/email', {
            email: email
        })).data;
    }

    public static async refreshToken(): Promise<Response<UserModelWithToken>>
    {
        return (await axios.get('auth/refresh')).data?.data?.original;
    }

    public static async verifyEmail(token: string): Promise<Response<null>>
    {
        return (await axios.post(`auth/email/verify/${token}`)).data;
    }

    public static async userAuctions(): Promise<Response<Auction[]>>
    {
        return (await axios.get(`auth/user/auctions`)).data;
    }

    public static async auctionDetails(id: string): Promise<Response<Auction>>
    {
        return (await axios.get(`auth/user/auctions/${id}`)).data;
    }

    public static async currentUser(): Promise<Response<UserModel>>
    {
        return (await axios.get(`auth/user`)).data;
    }

    public static async updateProfile(form: UserUpdate): Promise<Response<UserModel>>
    {
        return (await axios.put(`auth/user`, {...form})).data;
    }

    public static async paymentData(id: string): Promise<Response<Payment>>
    {
        return (await axios.get(`auth/user/auctions/${id}/payment`)).data;
    }

    public static async updatePaymentData(id: string, form: FormData): Promise<Response<Payment>>
    {
        return (await axios({
            method: 'post',
            url: `auth/user/auctions/${id}/payment`,
            data: form,
            headers: {
                'content-type': 'multipart/form-data'
            }
        })).data;
    }

    public static async customsData(id: string): Promise<Response<Customs>>
    {
        return (await axios.get(`auth/user/auctions/${id}/customs`)).data;
    }

    public static async updateCustomsData(id: string, form: FormData): Promise<Response<Customs>>
    {
        return (await axios({
            method: 'post',
            url: `auth/user/auctions/${id}/customs`,
            data: form,
            headers: {
                'content-type': 'multipart/form-data'
            }
        })).data;
    }

    public static async exciseTranslationsData(id: string): Promise<Response<ExciseTranslations>>
    {
        return (await axios.get(`auth/user/auctions/${id}/excise-translations`)).data;
    }

    public static async updateExciseTranslationsData(id: string, form: FormData): Promise<Response<ExciseTranslations>>
    {
        return (await axios({
            method: 'post',
            url: `auth/user/auctions/${id}/excise-translations`,
            data: form,
            headers: {
                'content-type': 'multipart/form-data'
            }
        })).data;
    }

    public static async trackingDeliveryData(id: string): Promise<Response<TrackingDelivery>>
    {
        return (await axios.get(`auth/user/auctions/${id}/tracking-delivery`)).data;
    }

    public static async updateTrackingDeliveryData(id: string, form: TrackingDelivery): Promise<Response<TrackingDelivery>>
    {
        return (await axios.put(`auth/user/auctions/${id}/tracking-delivery`, {...form})).data;
    }

    public static async invoiceFile(url: string): Promise<any>
    {
        return (await axios({
            method: 'get',
            url: url,
            responseType: 'blob'
        }));
    }
}
