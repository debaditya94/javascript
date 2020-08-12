export interface User {
    first_name:string,
    last_name:string,
    email:string,
    mobile_number:number,
    dob:Date,
    gender:string,
    user_name:string,
    password:string,
    portfolio_key?:string,
    account_ids?:number[],
    startup_id?:string,
    investor_id?:string
}
