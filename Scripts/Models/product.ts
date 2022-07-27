export class Product {
  private readonly ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

  constructor(private _name: string) {
    this._name = _name;
  }
  public get name(): string {
    return this._name;
  }
}
