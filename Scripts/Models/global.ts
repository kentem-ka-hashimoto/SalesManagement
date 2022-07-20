import { StockManager } from '../Models/stockManager.js';
import { SalesManager } from '../Models/salesManager.js';

export class Global {
  private static _stockManager: StockManager;
  private static _saleManager: SalesManager;

  public static get stockManager(): StockManager {
    if (!this._stockManager) {
      this._stockManager = new StockManager();
    }
    return this._stockManager;
  }

  public static get saleManager(): SalesManager {
    if (!this._saleManager) {
      this._saleManager = new SalesManager();
    }
    return this._saleManager;
  }
}
