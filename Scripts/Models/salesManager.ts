import { Sales } from '../Types/salesObj.js';

export class SalesManager {
  private _salesArr: Sales[] = [];

  public get salesArr(): Sales[] {
    return this._salesArr;
  }

  public add(sale: Sales): void {
    this._salesArr.push(sale);
  }

  public removeOtherThanToday(today: string): void {
    for (let i = this._salesArr.length - 1; i >= 0; i--) {
      if (this._salesArr[i].saleDate !== today) {
        this._salesArr.splice(i, 1);
      }
    }
  }

  public removeOtherThanChecked(): void {
    for (let i = this._salesArr.length - 1; i >= 0; i--) {
      if (!this._salesArr[i].selected) {
        this._salesArr.splice(i, 1);
      }
    }
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
