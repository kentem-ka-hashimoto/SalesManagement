import { Sales } from '../Types/salesObj.js';

export class SalesManager {
  private _salesArr: Sales[] = [];

  public get salesArr(): Sales[] {
    return this._salesArr;
  }

  public add(sale: Sales): void {
    this._salesArr.push(sale);
  }

  public getTotalSales(): number {
    let sum: number = 0;
    this._salesArr.forEach((target) => {
      sum += target.product.sellingPrice * target.saleQuantity;
    });
    return sum;
  }

  public getTotalProfit(): number {
    let totalCost: number = 0;
    this._salesArr.forEach((target) => {
      totalCost += target.product.purchasePrice * target.saleQuantity;
    });
    return this.getTotalSales() - totalCost;
  }
}
