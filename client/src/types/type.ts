export interface InterfaceUser {
    id?: number;
    username: string;
    email: string;
    mobile: string;
    dob: string;
    is_deleted: boolean;
    active: boolean;
    created_at: string;
    updated_at: string
}

export interface InterfaceProduct {
    id?: number;
    name: string;
    description: string;
    sku: string;
    price: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string
};