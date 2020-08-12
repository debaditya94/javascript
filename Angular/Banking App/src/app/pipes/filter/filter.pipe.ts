import { Savings } from './../../models/savings';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(input: Savings[], status:string): any{
    if(!input || !status){
      return input;
    }
    return input.filter(function(data){
      if(data["financialGoal"].toString().toLowerCase().indexOf(status.toLowerCase())===0)
        return data;
    })
  }
}
