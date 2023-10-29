export enum Roles {
    user = 'user',
    admin = 'admin'
}

export enum TokenType {
    bearer = 'bearer'
}

export enum Status {
    new= 'new',
    payment_completed = 'payment_completed',
    pickup_images_added = 'pickup_images_added',
    customs = 'customs',
    finished = 'finished'
}

export enum UserType {
    person = 'person',
    company = 'company',
}

export const BANK = { name: "", city: "", country: "", swift: "", number: "" };
