export interface FileThumbnail {
    id?: string;
    name?: string;
    src: string;
    size: number;
}

export interface OtherFile {
    name: string;
    file_name: string;
    uuid: string;
    preview_url: string;
    original_url: string;
    order: string;
    custom_properties: unknown[];
    extension: string;
    size: number;
}
