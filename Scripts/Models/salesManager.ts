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
      sum += target.purchasing.sellingPrice * target.saleQuantity;
    });
    return sum;
  }

  public getTotalProfit(): number {
    let totalCost: number = 0;
    this._salesArr.forEach((target) => {
      totalCost += target.purchasing.purchasePrice * target.saleQuantity;
    });
    return this.getTotalSales() - totalCost;
  }

  public clearArr(): void {
    this._salesArr.length = 0;
  }
}
