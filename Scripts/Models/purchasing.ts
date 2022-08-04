import { Product } from './product.js';

export class Purchasing {
  private readonly ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

  constructor(
    private _product: Product,
    private _purchaseDate: Date,
    private _purchasePrice: number,
    private _sellingPrice: number,
    private _stock: number
  ) {
    this._product = _product;
    this._purchaseDate = _purchaseDate;
    this._purchasePrice = _purchasePrice;
    this._sellingPrice = _sellingPrice;
    this._stock = _stock;

    if (
      this.checkValue(this._purchasePrice) ||
      this.checkValue(this._sellingPrice) ||
      this._sellingPrice <= this._purchasePrice ||
      this._stock <= 0
    ) {
      throw new Error(this.ABNORMAL_VALUE_ERROR);
    }
  }

  public get product(): Product {
    return this._product;
  }

  public get purchaseDate(): Date {
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
      throw new Error(this.ABNORMAL_VALUE_ERROR);
    }
    this._stock = value;
  }

  private checkValue(target: number): boolean {
    return target < 0;
  }

  public convertDateToString(): string {
    // ●●●●-●●-●●の形にする
    return (
      this._purchaseDate.getFullYear() +
      '-' +
      `${('00' + (this._purchaseDate.getMonth() + 1)).slice(-2)}` +
      '-' +
      `${('00' + this._purchaseDate.getDate()).slice(-2)}`
    );
  }
}
