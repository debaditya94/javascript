import { IInvestment } from './startup';

export interface IInvestorExperience{
    companyName : string,
    designation : string, 
}

export interface IEducation{
    name : string,
    course : string,
}

export interface IPitchedStartup{
    date : string,
    msg : string,
    startup_key : string,
}

export interface Iinvestor{
    name : string,
    about : string,
    investments ?: IInvestment[],
    experience ? : IInvestorExperience[],
    education ? : IEducation[],
    achievements ? : string,
    profilePic ? : string;
    profile_key ? : string; 
    primary_acc ? : string,
    following ? : string[],
    followers ? : string[],
    pitchedStartups ? : IPitchedStartup[]
}