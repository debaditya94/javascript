export interface IInvestmentDetails {
    startup_id : string,
    investor_id : string;
    date : string,
    amount : number,
    equity : number,
    agreementRead ? :  boolean,

}