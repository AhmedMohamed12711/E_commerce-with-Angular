import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(product:Products[],seaechValue:string): Products[] {
    return product.filter((product)=>{
      return product.title.toUpperCase().includes(seaechValue.toUpperCase())
    });
  }

}
