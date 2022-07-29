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

  // private separateByProduct(products: Product[]): void {
  //   let sales: Sale[] = [];
  //   for (let i = 0; i < products.length; i++) {
  //     for (let j = 0; j < this._salesArr.length; j++) {
  //       if (products[i].name === this._salesArr[j].purchasing.product.name) {
  //         sales.push(this._salesArr[j]);
  //       }
  //     }
  //   }
  // }

  private separateByProduct(saleArr: Sale[], products: Product[]): Sale[] {
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

  private sortAscendingOrder(): void {
    this._salesArr.sort((a, b) => Number(a.purchasing.purchaseDate) - Number(b.purchasing.purchaseDate));
  }

  // public sortAscendingOrder(saleArr: Sale[]): Sale[] {
  //   let sales: Sale[] = [];
  //   console.log(Number(saleArr[0].purchasing.purchaseDate));
  //   sales = [...saleArr].sort((a, b) => Number(a.purchasing.purchaseDate) - Number(b.purchasing.purchaseDate));

  //   return sales;
  // }
}
