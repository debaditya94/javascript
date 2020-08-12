import { IPitchedStartup } from "./investor";

export interface ITeamMember {
    designation : string,
    name : string,
    email : string,
    phone_no : string,
    imageUrl? : string,
}

export interface IInvestment{
    investor_id ?: string,
    startup_id ? : string,
    date : Date,
    equity : number,
    amount : number,
}
export interface IStartup{
    id ?: string,
    name : string,
    location : string,
    s_description : string,
    l_description : string,
    website : string,
    primary_acc ? : string,
    logoUrl?: string,
    equity_offered? : number,
    investment_amount? : number,
    investment_sought? :number,
    valuation? : number,
    team? : ITeamMember[],
    investments? : IInvestment[],
    pitchedStartups ? : IPitchedStartup[]
}