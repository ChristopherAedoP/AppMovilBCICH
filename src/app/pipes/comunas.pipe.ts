import {  Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "comuna"
})

export class ComunasPipe implements PipeTransform {
  transform(items: any, term: any): any {
    if (term === undefined) {
      return items;
    }

    let reg = items.filter(function(item) {
      return item.CodRegion.toLowerCase().includes(term.toLowerCase());
    });

    return reg[0].comunas;

  }
}
