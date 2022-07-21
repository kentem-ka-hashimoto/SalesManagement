import { Product } from '../../Models/product.js';
import { StockManager } from '../../Models/stockManager.js';

describe('StockManagerTest', () => {
  test('propertyTest', () => {
    let manager = new StockManager();

    expect(manager.stockArr.length).toBe(0);
  });

  test('addTest', () => {
    let manager = new StockManager();
    let product: Product = new Product('桃', '2022-07-20', 200, 400, 200);

    // 最初何もないことを確認
    expect(manager.stockArr.length).toBe(0);

    // 1つ追加した際の確認
    manager.add(product);
    expect(manager.stockArr.length).toBe(1);
    expect(manager.stockArr[0].productName).toBe('桃');
    expect(manager.stockArr[0].purchaseDate).toBe('2022-07-20');
    expect(manager.stockArr[0].purchasePrice).toBe(200);
    expect(manager.stockArr[0].sellingPrice).toBe(400);
    expect(manager.stockArr[0].stock).toBe(200);

    // 2つ目追加した際の確認
    product = new Product('お茶', '2022-07-20', 60, 150, 600);
    manager.add(product);
    expect(manager.stockArr.length).toBe(2);
    expect(manager.stockArr[1].productName).toBe('お茶');
    expect(manager.stockArr[1].stock).toBe(600);
    expect(manager.stockArr[1].purchasePrice).toBe(60);
    expect(manager.stockArr[1].sellingPrice).toBe(150);
    expect(manager.stockArr[1].purchaseDate).toBe('2022-07-20');
  });
});
