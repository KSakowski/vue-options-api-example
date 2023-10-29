import { OtherFile } from "@/interfaces/files";
import { Status } from "@/settings/enums";

export interface AuctionCreate {
    id?: number | null;
    brand: string;
    model: string;
    year: string;
    vin: string;
    purchased_at: string;
}

export interface AuctionPayment {
    price_for_car: number | null;
    price_for_additional_payment: number | null;
    price_for_additional_transport_insurance: number | null;
    currency_for_additional_transport_insurance: string;
    additional_transport_information: string;
    transfer_data: TransferData | null;
    additional_payment_transfer_data: TransferData | null;
}

export interface AuctionTracking {
    tracking_link: string;
    contractor_number: string;
    eta: string;
}

export interface AuctionExcise {
    price_for_excise: number | null;
    excise_transfer_data: TransferData | null;
    price_for_document_translation:  number | null;
    price_for_expert_opinion: number | null;
    currency_for_document_translation: string;
    currency_for_expert_opinion: string;
}

export interface Attachments {
    auction_images: File[];
    pickup_images: File[];
    customs_template: OtherFile;
    customs: OtherFile;
    auction_cover?: OtherFile;
    akc_u_s_template?: OtherFile;
    car_fax?: OtherFile;
    payment_confirmation?: OtherFile;
    payment_additional_confirmation?: OtherFile;
    payment_confirmation_excise: OtherFile;
    attachments?: File[] | OtherFile[];
    additional_transport_insurance_attachments?: File[] | OtherFile[];
    expert_opinion_images?: OtherFile[]
}

export interface TransferData {
    title: string;
    account_number: string;
    bank: Bank | null;
    recipient_name: string;
    amount: string;
    currency: string;
}

export interface Bank {
    name: string;
    city: string;
    country: string;
    swift: string;
    number: string;
}

export interface DeliveryData {
    delivery_address_city?: string;
    delivery_address_name?: string
    delivery_address_phone?: string
    delivery_address_street?: string
    delivery_address_zip_code?: string
    autodiscover_repair?: number | boolean;
    self_pickup?: number | boolean;
    pickup_name?: string;
    pickup_plate?: string;
}

export interface Auction extends AuctionCreate, AuctionPayment, AuctionTracking, AuctionExcise, DeliveryData  {
    client_id: string;
    currency_for_car: string;
    currency_for_additional_payment: string;
    status?: Status;
    attachments?: Attachments;
    requests_document_translation?: boolean;
    requests_expert_opinion?: boolean;
}

export interface InvoiceModel {
    id?: number;
    uuid: string;
    invoice_no: string;
    created_at: string;
    updated_at: string;
    buyer_name: string;
    buyer_first_name: string;
    buyer_last_name: string;
    buyer_email: string;
    buyer_tax_no: string;
    buyer_address_country: string;
    buyer_address_city: string;
    buyer_address_street: string;
    buyer_address_zip_code: string;
    seller_name: string;
    seller_first_name: string;
    seller_last_name: string;
    seller_email: string;
    seller_address_country: string;
    seller_address_city: string;
    seller_address_street: string;
    seller_address: string;
    invoiced_at: string;
    items: InvoiceItem[];
    download_url?: string;
}

export interface InvoiceUpdate {
    buyer_name:	string;
    buyer_first_name: string;
    buyer_last_name: string;
    buyer_email: string;
    buyer_tax_no: string;
    buyer_address_country: string;
    buyer_address_city: string;
    buyer_address_street: string;
    buyer_address_zip_code: string;
    seller_name: string;
    seller_first_name: string;
    seller_last_name: string;
    seller_email: string;
    seller_address_country: string;
    seller_address_city: string;
    seller_address_street: string;
    invoiced_at: string;
    items: InvoiceItem[];
}

export interface InvoiceItem {
    uuid: string;
    created_at: string;
    updated_at: string;
    invoice_id: number;
    name: string;
    quantity: number;
    price_net: number;
    price_gross: number;
    currency: string;
    comment: string;
}

export interface StatusListItem {
    step: string;
    title: string;
    description: string;
    icon: string;
}
