import { LocationAsPath } from "vue-router";
import {TokenType, Roles} from "@/settings/enums";
import {InvoiceModel, TransferData} from "@/interfaces/auction";
import {OtherFile} from "@/interfaces/files";

export interface Auth {
    getToken: () => string;
    setToken: (token: string, expires: number) => void;
    login: (data: UserModelWithToken) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    isAdmin: () => boolean;
    getDashboardUrl: () => string;
}

export interface AuthRedirects {
    home: LocationAsPath;
    login: LocationAsPath;
    user: LocationAsPath;
    admin: LocationAsPath;
    forbidden: LocationAsPath;
    notFound: LocationAsPath;
}

export interface UserLogin {
    email: string;
    password: string;
    remember?: boolean;
}
export interface UserStore {
    first_name: string;
    last_name: string;
    type: string;
    company_name: string;
    tax_no: string;
    pesel: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface PasswordResetToken {
    token: string;
    password: string;
    password_confirmation: string;
}

export interface UserModelWithToken {
    user: UserModel;
    access_token: string;
    token_type: TokenType;
    expires_in: number;
}

export interface UserModel {
    id: number | null;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: Roles[];
    type: string;
    company_name: string;
    tax_no: string;
    pesel: string;
    address_street: '',
    address_zip_code: '',
    address_city: '',
    address_country: '',
}

export interface UserUpdate {
    first_name: string;
    last_name: string;
    email: string;
    type: string;
    company_name: string;
    tax_no: string;
    pesel: string;
    address_street: string;
    address_zip_code: string;
    address_city: string;
    address_country: string;
}

export interface Payment {
    attachments: { payment_confirmation: OtherFile, payment_additional_confirmation: OtherFile };
    invoice: InvoiceModel;
}

export interface Customs {
    attachments: {
        customs: OtherFile;
        customs_template: OtherFile;
    }
}

export interface ExciseTranslations {
    price_for_document_translation: number;
    currency_for_document_translation: string;
    price_for_expert_opinion: number;
    currency_for_expert_opinion: string;
    excise_transfer_data: TransferData;
    requests_document_translation: boolean;
    requests_expert_opinion: boolean;
    attachments: {
        akc_u_s: OtherFile;
        akc_u_s_template: OtherFile;
        expert_opinion_images: OtherFile[];
        payment_confirmation_excise: OtherFile;
    }
}

export interface TrackingDelivery {
    tracking_link: string;
    contractor_number: string;
    eta: string;
    delivery_address_name: string;
    delivery_address_street: string;
    delivery_address_city: string;
    delivery_address_zip_code: string;
    delivery_address_phone: string;
    pickup_name: string;
    pickup_plate: string;
    self_pickup: boolean;
    autodiscover_repair: boolean;
}
