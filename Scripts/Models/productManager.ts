import { Product } from './product.js';

export class ProductManager {
  private readonly ALREADY_REGISTERED: string = 'This product is already registered';
  private _productArr: Product[] = [];

  public get productArr(): Product[] {
    return this._productArr;
  }

  public add(product: Product): void {
    this._productArr.forEach((target: Product) => {
      if (target.name === product.name) {
        throw new Error(this.ALREADY_REGISTERED);
      }
    });
    this._productArr.push(product);
  }

  public delete(index: number): void {
    this._productArr.splice(index, 1);
  }
}
