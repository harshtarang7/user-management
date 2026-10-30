
export interface IProducts{
    name:string;
    description:string;
    sku:string;
    price:number;
    is_deleted:boolean;
    created_at:string;
    updated_at:string
}

export interface ProductListResponseDto {
  products: IProducts[];
  total: number;
  page: number;
  limit:number;
  totalPages: number;
}
