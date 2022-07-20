import { Sales } from '../Types/salesObj.js';

export class SalesManager {
  private _salesArr: Sales[] = [];

  public get salesArr(): Sales[] {
    return this._salesArr;
  }

  add(sale: Sales): void {
    this._salesArr.push(sale);
  }

  getProductsFromDate(): Sales[]{
    return this._salesArr;
  }
}
