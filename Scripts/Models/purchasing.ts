import { Product } from './product.js';

export class Purchasing {
  private readonly ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

  constructor(
    private _product: Product,
    private _purchaseDate: string,
    private _purchasePrice: number,
    private _sellingPrice: number,
    private _stock: number
  ) {
    this._purchaseDate = _purchaseDate;
    this._purchasePrice = _purchasePrice;
    this._sellingPrice = _sellingPrice;
    this._stock = _stock;
  }

  public get product(): Product {
    return this._product;
  }

  public get purchaseDate(): string {
    return this._purchaseDate;
  }

  public get purchasePrice(): number {
    return this._purchasePrice;
  }

  public get sellingPrice(): number {
    return this._sellingPrice;
  }

  public get stock(): number {
    return this._stock;
  }

  public set stock(value: number) {
    if (this.checkValue(value)) {
      throw new RangeError(this.ABNORMAL_VALUE_ERROR);
    }
    this._stock = value;
  }

  private checkValue(target: number): boolean {
    return target < 0;
  }
}
