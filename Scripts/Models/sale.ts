import { Product } from './product.js';

export class Sale {
  constructor(private _product: Product, private _saleDate: string, private _saleQuantity: number, private _isSelected: boolean, private _id: number) {
    this._product = _product;
    this._saleDate = _saleDate;
    this._saleQuantity = _saleQuantity;
    this._isSelected = _isSelected;
    this._id = _id;
  }

  get product(): Product {
    return this._product;
  }

  get saleDate(): string {
    return this._saleDate;
  }

  get saleQuantity(): number {
    return this._saleQuantity;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  get id(): number {
    return this._id;
  }
}
