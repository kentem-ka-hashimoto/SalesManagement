import { Sales } from '../Types/salesObj.js';
import { Sale } from './sale.js';

export class SalesManager {
  private _salesArr: Sale[] = [];

  public get salesArr(): Sale[] {
    return this._salesArr;
  }

  public add(sale: Sale): void {
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
