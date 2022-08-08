import { Product } from './product.js';
import { Sale } from './sale.js';

export class SalesManager {
  private _salesArr: Sale[] = [];

  public get salesArr(): Sale[] {
    return this._salesArr;
  }

  public add(sale: Sale, products: Product[]): void {
    this._salesArr.push(sale);
    this.sortAscendingOrder();
    this._salesArr = this.separateByProduct(this._salesArr, products);
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

  private separateByProduct(saleArr: Sale[], products: Product[]): Sale[] {
    let sales: Sale[] = [];
    for (let i = 0; i < products.length; i++) {
      const result = this._salesArr.filter((sale) => sale.purchasing.product.name === products[i].name);
      sales = sales.concat(result);
    }

    return sales;
  }

  private sortAscendingOrder(): void {
    this._salesArr.sort((a, b) => Number(a.purchasing.purchaseDate) - Number(b.purchasing.purchaseDate));
  }
}
