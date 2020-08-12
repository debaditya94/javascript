export interface Account {
    account_no:number;
    account_type:string;
    balance:number;
    portfolio_key?:string;
    transaction_ids ?:[{
        index:number
    }];
    profile_id?:string;
}