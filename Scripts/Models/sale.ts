import { Purchasing } from './purchasing.js';

export class Sale {
  constructor(private _purchasing: Purchasing, private _saleDate: Date, private _saleQuantity: number, private _id: number) {
    this._purchasing = _purchasing;
    this._saleDate = _saleDate;
    this._saleQuantity = _saleQuantity;
    this._id = _id;
  }

  public get purchasing(): Purchasing {
    return this._purchasing;
  }

  public get saleDate(): Date {
    return this._saleDate;
  }

  public get saleQuantity(): number {
    return this._saleQuantity;
  }

  public get id(): number {
    return this._id;
  }

  
  public convertDateToString(): string {
    // ●●●●-●●-●●の形にする
    return (
      this._saleDate.getFullYear() +
      '-' +
      `${('00' + (this._saleDate.getMonth() + 1)).slice(-2)}` +
      '-' +
      `${('00' + this._saleDate.getDate()).slice(-2)}`
    );
  }
}
