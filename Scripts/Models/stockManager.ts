import { Purchasing } from './purchasing.js';
import { Product } from './product.js';

export class StockManager {
  private _stockArr: Purchasing[] = [];

  public get stockArr(): Purchasing[] {
    return this._stockArr;
  }

  public add(product: Purchasing): void {
    this._stockArr.push(product);
  }

  public separateByProduct(products: Product[]): Purchasing[] {
    let purchaseArr: Purchasing[] = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < this._stockArr.length; j++) {
        if (products[i].name === this._stockArr[j].product.name) {
          purchaseArr.push(this._stockArr[j]);
        }
      }
    }
    return purchaseArr;
  }
}
