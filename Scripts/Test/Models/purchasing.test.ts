import { Product } from '../../Models/product.js';
import { Purchasing } from '../../Models/purchasing.js';

describe('PurchasingTest', () => {
  test('propertyTest', () => {
    let purchasing: Purchasing = new Purchasing(new Product('桃'), '2022-07-20', 200, 400, 200);
    // 商品名の取得
    expect(purchasing.product.name).toBe('桃');
    // 仕入日の取得
    expect(purchasing.purchaseDate).toBe('2022-07-20');
    // 仕入価格の取得
    expect(purchasing.purchasePrice).toBe(200);
    // 販売価格の取得
    expect(purchasing.sellingPrice).toBe(400);
    // 在庫数の取得
    expect(purchasing.stock).toBe(200);
  });
});