import { Product } from '../../Models/product.js';
import { ProductManager } from '../../Models/productManager.js';

describe('ProductManager', () => {
  test('propertyTest', () => {
    let manager = new ProductManager();

    expect(manager.productArr.length).toBe(0);
  });

  test('addTest', () => {
    let manager = new ProductManager();
    let product: Product = new Product('桃');

    // 最初何もないことを確認
    expect(manager.productArr.length).toBe(0);

    // 1つ追加した際の確認
    manager.add(product);
    expect(manager.productArr.length).toBe(1);
    expect(manager.productArr[0].name).toBe('桃');

    // 2つ目追加した際の確認
    product = new Product('お茶');
    manager.add(product);
    expect(manager.productArr.length).toBe(2);
    expect(manager.productArr[1].name).toBe('お茶');
  });

  test('addErrorTest', () => {
    let manager = new ProductManager();
    let product: Product = new Product('桃');

    // 桃を追加した際の確認
    manager.add(product);
    expect(manager.productArr[0].name).toBe('桃');

    // 同じ商品名は追加できない確認
    expect(() => manager.add(product)).toThrowError('This product is already registered');
  });

  test('deleteTest', () => {
    let manager = new ProductManager();
    let product: Product = new Product('桃');
    manager.add(product);
    product = new Product('お茶');
    manager.add(product);
    product = new Product('アイス');
    manager.add(product);

    // 3つ追加されていることの確認
    expect(manager.productArr.length).toBe(3);

    // 2つ目削除
    manager.delete(1);
    expect(manager.productArr.length).toBe(2);

    // 指定したインデックスが削除されているか値で確認
    expect(manager.productArr[0].name).toBe('桃');
    expect(manager.productArr[1].name).toBe('アイス');
  });
});
