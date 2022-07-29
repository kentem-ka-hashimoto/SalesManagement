import { Product } from './product.js';
import { Sale } from './sale.js';

export class SalesManager {
  private _salesArr: Sale[] = [];

  public get salesArr(): Sale[] {
    return this._salesArr;
  }

  public add(sale: Sale): void {
    this._salesArr.push(sale);
  }

  public getTotalSales(salesArr: Sale[]): number {
    let sum: number = 0;
    salesArr.forEach((target) => {
      sum += target.purchasing.sellingPrice * target.saleQuantity;
    });
    return sum;
  }

  public getTotalProfit(salesArr: Sale[]): number {
    let totalCost: number = 0;
    salesArr.forEach((target) => {
      totalCost += target.purchasing.purchasePrice * target.saleQuantity;
    });
    return this.getTotalSales(salesArr) - totalCost;
  }

  public clearArr(salesArr: Sale[]): void {
    salesArr.length = 0;
  }

  public separateByProduct(saleArr: Sale[], products: Product[]): Sale[] {
    let sales: Sale[] = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < saleArr.length; j++) {
        if (products[i].name === saleArr[j].purchasing.product.name) {
          sales.push(saleArr[j]);
        }
      }
    }
    return sales;
  }
}
