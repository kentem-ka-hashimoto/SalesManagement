import { StockManager } from '../Models/stockManager.js';
import { SalesManager } from '../Models/salesManager.js';
import { Product } from './product.js';
import { Sales } from '../Types/salesObj.js';

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

  public static getStockFromLocalStorage(): void {
    const items: string | null = localStorage.getItem('stock');
    if (items) {
      const stock: string[] = JSON.parse(items);
      stock.forEach((target: any) => {
        const product: Product = new Product(target._productName, target._purchaseDate, target._purchasePrice, target._sellingPrice, target._stock);
        Global.stockManager.add(product);
      });
    }
  }

  public static getSalesStatusFromLocalStorage(): void {
    const items: string | null = localStorage.getItem('sale');
    if (items) {
      const salesStatus: string[] = JSON.parse(items);
      salesStatus.forEach((target: any) => {
        const saledata: Sales = {
          product: new Product(
            target.product._productName,
            target.product._purchaseDate,
            target.product._purchasePrice,
            target.product._sellingPrice,
            target.product._stock
          ),
          saleDate: target.saleDate,
          saleQuantity: target.saleQuantity,
          selected: target.selected,
        };
        Global.saleManager.add(saledata);
      });
    }
  }
}
