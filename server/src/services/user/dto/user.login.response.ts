export interface Iuser{
    username:string;
    email:string;
    mobile:string;
    dob:string;
    is_deleted:boolean;
    active:boolean;
    created_at:string;
    updated_at:string
}

export interface UserLoginResponseDto{
    user:Iuser;
    otp:number;
}