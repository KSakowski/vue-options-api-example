import { default as dayjs } from 'dayjs';
import { Filter } from "@/interfaces/pager";

interface Filters
{
    date(value: string, format: string): string;
    dateTime(value: string, format: string): string;
    removeFalsy(obj: {[key: string]: any}): {[key: string]: any};
    fileSize(size: number): string;
    toFormData(form: {[key: string]: any}): FormData;
    isImage(fileName: string): boolean;
    formatAttachmentsIds(data: FormData, ids:string[], key: string): FormData;
    normalizeFileName(fileName: string): string;
}

export const filters: Filters = {
    date(value: string, format = 'YYYY-MM-DD' ): string {
        return value ? dayjs(value).format(format) : '';
    },
    dateTime(value: string, format = 'YYYY-MM-DD HH:mm' ): string {
        return dayjs(value).format(format);
    },
    removeFalsy(obj: Filter): Filter {
        const filtered: Filter = {};
        Object.keys(obj).forEach(key => {
            if (!obj[key])
                return;

            filtered[key] = obj[key];
        });
        return filtered;
    },
    fileSize(size: number): string {
        const i = Math.floor( Math.log(size) / Math.log(1024) );
        return Number(( size / Math.pow(1024, i) ).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },
    toFormData(form: {[key: string]: any}): FormData {
        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        return formData;
    },
    isImage(fileName: string): boolean {
        return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);
    },
    formatAttachmentsIds(data: FormData, ids:string[], key: string): FormData {
        ids.length ?
            ids.map( (fileUuid: string) => data.append(key, fileUuid)) :
            data.append(key, '');

        return data;
    },
    normalizeFileName(fileName: string): string {
        return fileName ? fileName.replace(/[/\\?%*:|"<>_]/g, '') : fileName;
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $filters: Filters;
    }
}
