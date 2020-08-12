export interface ITeamMember{
    designation : string,
    name : string,
    imageUrl? : string,
}

export interface IInvestment{
    investor_id : string,
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
    logoUrl?: string,
    equity_offered? : number,
    inverstment_amount? : number,
    investment_sought? :number,
    valuation? : number,
    team? : ITeamMember[],
    investments? : IInvestment[];
}