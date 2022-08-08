export class Product {
  constructor(private _name: string) {
    this._name = _name;
  }
  
  public get name(): string {
    return this._name;
  }
}
