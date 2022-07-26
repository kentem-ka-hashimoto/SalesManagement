import { Product } from './product.js';

export class Sale {
  constructor(
    private _product: Product,
    private _saleDate: string,
    private _saleQuantity: number,
    private _isSelected: boolean,
    private _id: number
  ) {
    this._product = _product;
    this._saleDate = _saleDate;
    this._saleQuantity = _saleQuantity;
    this._isSelected = _isSelected;
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

  public get isSelected(): boolean {
    return this._isSelected;
  }

  public set isSelected(value: boolean) {
    this._isSelected = value;
  }

  public get id(): number {
    return this._id;
  }
}
