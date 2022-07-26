import { Product } from './product.js';

export class Sale {
  constructor(
    private _product: Product,
    private _saleDate: string,
    private _saleQuantity: number,
    private _id: number
  ) {
    this._product = _product;
    this._saleDate = _saleDate;
    this._saleQuantity = _saleQuantity;
    this._id = _id;
  }

  public get product(): Product {
    return this._product;
  }

  public get saleDate(): string {
    return this._saleDate;
  }

  public get saleQuantity(): number {
    return this._saleQuantity;
  }

  public get id(): number {
    return this._id;
  }
}
