

export class Product {
  constructor(
    private _productName: string,
    private _stock: number,
    private _purchasingPrice: number,
    private _sellingPrice: number,
    private _purchaseDate: string
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

  public get stock(): number {
    return this._stock;
  }

  public set stock(value: number) {
    this._stock = value;
  }

  public get purchasingPrice(): number {
    return this._purchasingPrice;
  }

  public get sellingPrice(): number {
    return this._sellingPrice;
  }

  public get purchaseDate(): string {
    return this._purchaseDate;
  }
}
