export interface IDigichequeTransaction {
    senderID:string,
    senderAccount:number,
    recieverID:string,
    recieverAccount:number,
    amount:number,
    status:string,
    dateTime:string,
    transactionPassword:string
}
