import { Purchasing } from './purchasing.js';
import { Product } from './product.js';

export class StockManager {
  private _stockArr: Purchasing[] = [];

  public get stockArr(): Purchasing[] {
    return this._stockArr;
  }

  public add(purchase: Purchasing, products: Product[]): void {
    this._stockArr.push(purchase);
    this.sortAscendingOrder();
    this._stockArr = this.separateByProduct(products);
  }

  public checkEnoughStock(saleProductName: string, saleQuantity: number): boolean {
    let stock: number = 0;
    this._stockArr.forEach((item: Purchasing) => {
      if (item.product.name === saleProductName) {
        stock += item.stock;
      }
    });
    return saleQuantity <= stock;
  }

  public removeNothingStock(): void {
    for (let i = this._stockArr.length - 1; i >= 0; i--) {
      if (this._stockArr[i].stock === 0) {
        this._stockArr.splice(i, 1);
      }
    }
  }

  private separateByProduct(products: Product[]): Purchasing[] {
    let purchaseArr: Purchasing[] = [];
    for (let i = 0; i < products.length; i++) {
      const result = this._stockArr.filter((stock) => stock.product.name === products[i].name);
      purchaseArr = purchaseArr.concat(result);
    }

    return purchaseArr;
  }

  private sortAscendingOrder(): void {
    this._stockArr.sort((a, b) => Number(a.purchaseDate) - Number(b.purchaseDate));
  }
}
