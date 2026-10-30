export interface IOrders{
    name:string;
    user_id:number;
    product_id:number;
    total_amount:number;
    status:string;
    created_at:string;
    updated_at:string
}

export interface OrderListResponseDto {
  orders: IOrders[];
  total: number;
  page: number;
  limit:number;
  totalPages: number;
}