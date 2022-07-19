import { PurchaseDate } from '../Types/purchaseDate.js';

export class Product {
  constructor(
    private _productName: string,
    private _stock: number,
    private _purchasingPrice: number,
    private _sellingPrice: number,
    private _purchaseDate: PurchaseDate
  ) {
    this._productName = _productName;
    this._stock = _stock;
    this._purchasingPrice = _purchasingPrice;
    this._sellingPrice = _sellingPrice;
    this._purchaseDate = _purchaseDate;
  }

  public get productName(): string {
    return this._productName;
  }
}
