import { ValidationError } from 'admin-bro';
export declare const createDuplicateError: ({ keyValue: duplicateEntry, errmsg }: {
    keyValue: any;
    errmsg: any;
}, document: any) => ValidationError;
