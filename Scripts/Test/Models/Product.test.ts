import { Product } from '../../Models/product.js';

const date: Date = new Date();
// const purchaseDate: string = '' + date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);

describe('ProductTest', () => {
  test('propertyTest', () => {
    let product: Product = new Product('桃', 200, 200, 400, '2022-07-20');
    // 商品名の取得
    expect(product.productName).toBe('桃');
    // 在庫数の取得
    expect(product.stock).toBe(200);
    // 仕入価格の取得
    expect(product.purchasingPrice).toBe(200);
    // 販売価格の取得
    expect(product.sellingPrice).toBe(400);
    // 仕入日の取得
    expect(product.purchaseDate).toBe('2022-07-20');

    product = new Product('お茶', 600, 60, 150, '2022-07-20');
    // 商品名の取得
    expect(product.productName).toBe('お茶');
    // 在庫数の取得
    expect(product.stock).toBe(600);
    // 仕入価格の取得
    expect(product.purchasingPrice).toBe(60);
    // 販売価格の取得
    expect(product.sellingPrice).toBe(150);
    // 仕入日の取得
    expect(product.purchaseDate).toBe('2022-07-20');
  });
});
