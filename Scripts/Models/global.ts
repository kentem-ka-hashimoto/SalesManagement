import { StockManager } from '../Models/stockManager.js';
import { SalesManager } from '../Models/salesManager.js';
import { Product } from './product.js';
import { Sale } from './sale.js';
import { Purchasing } from './purchasing.js';
import { ProductManager } from './productManager.js';

export class Global {
  private static _stockManager: StockManager;
  private static _saleManager: SalesManager;
  private static _productManager: ProductManager;

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

  public static get productManager(): ProductManager {
    if (!this._productManager) {
      this._productManager = new ProductManager();
    }
    return this._productManager;
  }

  public static getStockFromLocalStorage(): void {
    const items: string | null = localStorage.getItem('stock');
    if (items) {
      const stock: string[] = JSON.parse(items);
      stock.forEach((target: any) => {
        const purchasing: Purchasing = new Purchasing(
          new Product(target._product._name),
          new Date(target._purchaseDate),
          target._purchasePrice,
          target._sellingPrice,
          target._stock
        );
        Global.stockManager.add(purchasing);
      });
    }
  }

  public static getSalesStatusFromLocalStorage(): void {
    const items: string | null = localStorage.getItem('sale');
    if (items) {
      const salesStatus: string[] = JSON.parse(items);
      let idCount: number = 0;
      salesStatus.forEach((target: any) => {
        idCount++;
        const saleData: Sale = new Sale(
          new Purchasing(
            new Product(target._purchasing._product._name),
            new Date(target._purchasing._purchaseDate),
            target._purchasing._purchasePrice,
            target._purchasing._sellingPrice,
            target._purchasing._stock
          ),
          new Date(target._saleDate),
          target._saleQuantity,
          idCount
        );
        Global.saleManager.add(saleData);
      });
    }
  }

  public static getProductManagerFromLocalStorage(): void {
    const items: string | null = localStorage.getItem('product');
    if (items) {
      const products: string[] = JSON.parse(items);
      products.forEach((target: any) => {
        const product: Product = new Product(target._name);
        Global.productManager.add(product);
      });
    }
  }
}
