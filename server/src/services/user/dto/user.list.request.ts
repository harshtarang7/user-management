
export interface UserListRequestDto{
    page:number;
    limit?:number;
    rows?:number
    searchTerm?:string;
}