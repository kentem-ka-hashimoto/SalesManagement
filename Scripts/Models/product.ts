export class Product {
  private readonly ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

  constructor(
    private _productName: string,
    private _purchaseDate: string,
    private _purchasePrice: number,
    private _sellingPrice: number,
    private _stock: number
  ) {
    this._productName = _productName;
    this._purchaseDate = _purchaseDate;
    this._purchasePrice = _purchasePrice;
    this._sellingPrice = _sellingPrice;
    this._stock = _stock;

    if (this.checkValue(this._purchasePrice) || this.checkValue(this._sellingPrice) || this._sellingPrice <= this._purchasePrice) {
      throw new Error(this.ABNORMAL_VALUE_ERROR);
    }
  }

  public get productName(): string {
    return this._productName;
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

  public get purchasePrice(): number {
    return this._purchasePrice;
  }

  public get sellingPrice(): number {
    return this._sellingPrice;
  }

  public get purchaseDate(): string {
    return this._purchaseDate;
  }

  private checkValue(target: number): boolean {
    return target < 0;
  }
}
