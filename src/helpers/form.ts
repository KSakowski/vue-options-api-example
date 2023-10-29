import Errors from "@/helpers/errors";
import { Vue } from "@/main";

export default class Form<T> {
    private readonly originalData = {} as T;
    public errors: Errors;
    [prop: string]: unknown;

    constructor(data: T) {
        this.originalData = data;

        for (const field in data) {
            this[field as string] = data[field];
        }

        this.errors = new Errors();
    }

    public data(): T {
        const data = {} as T;

        for (const property in this.originalData)
        {
            data[property] = this[property] as any;
        }

        return data as T;
    }

    public setData(data: T): Form<T>
    {
        for (const property in data)
        {
            this[property as string] = data[property];
        }

        return this;
    }

    public reset(): void {
        for (const field in this.originalData) {
            this[field as string] = (this.originalData as T)[field];
            this.errors.clear(field);
        }
    }

    public clearErrors(): void {
        this.errors.clearErrors();
    }

    public displayErrors(code: number, errors: Record<string, string[]>, message: string): void {
        switch (code) {
            case 400:
                this.errors.record(errors);
                Vue.$alert.error(Vue.$t('Nie wszystkie pola zostały wypełnione prawidłowo.'));
                break;
            default:
                Vue.$alert.error(message);
                break;
        }
    }
}
