import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchStartup'
})
export class SearchStartupPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
