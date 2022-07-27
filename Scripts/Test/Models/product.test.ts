import { Product } from '../../Models/product.js';

describe('ProductTest', () => {
  test('propertyTest', () => {
    let product: Product = new Product('桃');
    // 商品名の取得
    expect(product.name).toBe('桃');

    product = new Product('お茶');
    // 商品名の取得
    expect(product.name).toBe('お茶');
  });
});
