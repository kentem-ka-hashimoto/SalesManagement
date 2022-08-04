import { Product } from '../../Models/product.js';
import { Sale } from '../../Models/sale.js';
import { Purchasing } from '../../Models/purchasing.js';

describe('SaleTest', () => {
  test('propertyTest', () => {
    const purchaseDate: Date = new Date('2022-07-20');
    const saleDate: Date = new Date('2022-07-24');
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200), new Date('2022-07-24'), 100, 1);
    // 商品名の取得
    expect(sale.purchasing.product.name).toBe('桃');
    // 仕入日の取得
    expect(sale.purchasing.purchaseDate).toEqual(purchaseDate);
    // 仕入価格の取得
    expect(sale.purchasing.purchasePrice).toBe(200);
    // 販売価格の取得
    expect(sale.purchasing.sellingPrice).toBe(400);
    // 在庫数の取得
    expect(sale.purchasing.stock).toBe(200);
    // 販売日の取得
    expect(sale.saleDate).toEqual(saleDate);
    // 販売数の取得
    expect(sale.saleQuantity).toBe(100);
    // idの取得
    expect(sale.id).toBe(1);
  });

  test('convertDateToStringTest', () => {
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200), new Date('2022-07-24'), 100, 1);

    expect(sale.convertDateToString()).toBe('2022-07-24');
  });
});
