import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToString'
})
export class ObjectToStringPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value;
  }
}
