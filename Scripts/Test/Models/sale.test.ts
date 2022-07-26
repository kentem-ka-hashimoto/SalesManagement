import { Product } from '../../Models/product.js';
import { Sale } from '../../Models/sale.js';

describe('SaleTest', () => {
  test('propertyTest', () => {
    let sale: Sale = new Sale(new Product('桃', '2022-07-20', 200, 400, 200), '2022-07-24', 100, false, 1);
    // 商品名の取得
    expect(sale.product.productName).toBe('桃');
    // 仕入日の取得
    expect(sale.product.purchaseDate).toBe('2022-07-20');
    // 仕入価格の取得
    expect(sale.product.purchasePrice).toBe(200);
    // 販売価格の取得
    expect(sale.product.sellingPrice).toBe(400);
    // 在庫数の取得
    expect(sale.product.stock).toBe(200);
    // 販売日の取得
    expect(sale.saleDate).toBe('2022-07-24');
    // 販売数の取得
    expect(sale.saleQuantity).toBe(100);
    // チェック状態の取得
    expect(sale.isSelected).toBe(false);
    // idの取得
    expect(sale.id).toBe(1);
  });
});
