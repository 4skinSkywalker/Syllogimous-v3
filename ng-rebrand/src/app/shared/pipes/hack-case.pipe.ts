import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hackCase'
})
export class HackCasePipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {

    console.log(args);

    const leet: { [key: string]: number } = {
      'a': 4,
      'e': 3,
      'l': 1,
      't': 7,
      'z': 2,
      'o': 0
    };

    if (typeof value !== 'string')
      return "(not a string)";

    const chars = value.split('');

    let outStr = '';

    for (let i = 0; i < chars.length; i++) {

      const char = chars[i];

      if (leet[char] !== undefined) {
        outStr += leet[char];
      }
      else {
        outStr += char;
      }
    }

    return outStr;
  }

}
