export default class Errors {
    private errors: Record<string, string[]>;

    constructor() {
        this.errors = {};
    }

    public any(): boolean {
        return Object.keys(this.errors).length > 0;
    }

    public get(field: string): string {
        return this.errors && this.errors[field] ? this.errors[field][0] : '';
    }

    public first(field: string): string
    {
        return this.get(field);
    }

    public record(errors: Record<string, string[]>): void {
        this.errors = errors;
    }

    public clear(field: string): void {
        if (field) {
            delete this.errors[field];

            return;
        }

        this.errors = {};
    }

    public clearErrors(): void {
        this.errors = {};
    }
}
