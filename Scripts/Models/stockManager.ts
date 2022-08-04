import { Purchasing } from './purchasing.js';
import { Product } from './product.js';

export class StockManager {
  private readonly ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';
  private _stockArr: Purchasing[] = [];

  public get stockArr(): Purchasing[] {
    return this._stockArr;
  }

  public add(purchase: Purchasing, products: Product[]): void {
    this._stockArr.push(purchase);
    this.sortAscendingOrder();
    this._stockArr = this.separateByProduct(this._stockArr, products);
  }

  public reduceStock(saleProductName: string, saleQuantity: number): void {
    // 在庫があるかチェック
    let stock: number = 0;
    this._stockArr.forEach((item: Purchasing) => {
      if (item.product.name === saleProductName) {
        stock += item.stock;
      }
    });
    if (stock < saleQuantity) {
      throw new RangeError(this.ABNORMAL_VALUE_ERROR);
    }

    // 在庫を減らす
    for (let i = 0; i < this._stockArr.length; i++) {
      if (this._stockArr[i].product.name === saleProductName) {
        if (this._stockArr[i].stock >= saleQuantity) {
          this._stockArr[i].stock -= saleQuantity;
          break;
        } else if (this._stockArr[i].stock < saleQuantity) {
          saleQuantity -= this._stockArr[i].stock;
          this._stockArr[i].stock = 0;
        }
      }
    }
  }

  private separateByProduct(purchases: Purchasing[], products: Product[]): Purchasing[] {
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

  private sortAscendingOrder(): void {
    this._stockArr.sort((a, b) => Number(a.purchaseDate) - Number(b.purchaseDate));
  }
}
