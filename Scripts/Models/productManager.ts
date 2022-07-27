import { Product } from './product.js';

export class ProductManager {
  private _productArr: Product[] = [];

  public get productArr(): Product[] {
    return this._productArr;
  }

  public add(product: Product): void {
    this._productArr.push(product);
  }

  public delete(index: number): void {
    this._productArr.splice(index, 1);
  }
}
