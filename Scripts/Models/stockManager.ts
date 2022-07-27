import { Purchasing } from './purchasing.js';

export class StockManager {
  private _stockArr: Purchasing[] = [];

  public get stockArr(): Purchasing[] {
    return this._stockArr;
  }

  public add(product: Purchasing): void {
    this._stockArr.push(product);
  }
}
