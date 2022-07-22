import { Product } from './product.js';

export class StockManager {
  private _stockArr: Product[] = [];

  public get stockArr(): Product[] {
    return this._stockArr;
  }

  public add(product: Product): void {
    this._stockArr.push(product);
  }
}
