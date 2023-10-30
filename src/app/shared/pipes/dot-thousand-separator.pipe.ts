import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotThousandSeparator'
})
export class DotThousandSeparatorPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
