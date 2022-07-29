import { Purchasing } from './purchasing.js';
import { Product } from './product.js';
import { SalesManager } from './salesManager.js';

export class StockManager {
  private _stockArr: Purchasing[] = [];

  public get stockArr(): Purchasing[] {
    return this._stockArr;
  }

  public add(product: Purchasing): void {
    this._stockArr.push(product);
  }

  public separateByProduct(purchases: Purchasing[], products: Product[]): Purchasing[] {
    let purchaseArr: Purchasing[] = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < purchases.length; j++) {
        if (products[i].name === purchases[j].product.name) {
          purchaseArr.push(purchases[j]);
        }
      }
    }
    return purchaseArr;
  }

  public sortAscendingOrder(products: Product[]): Purchasing[] {
    let purchases: Purchasing[] = [];
    purchases = [...this._stockArr].sort((a, b) => Number(a.purchaseDate) - Number(b.purchaseDate));

    purchases = this.separateByProduct(purchases, products);
    return purchases;
  }
}
