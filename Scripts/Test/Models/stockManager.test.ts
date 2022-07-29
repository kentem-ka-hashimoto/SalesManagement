import { Product } from '../../Models/product.js';
import { StockManager } from '../../Models/stockManager.js';
import { Purchasing } from '../../Models/purchasing.js';

describe('StockManagerTest', () => {
  test('propertyTest', () => {
    let manager = new StockManager();

    expect(manager.stockArr.length).toBe(0);
  });

  test('addTest', () => {
    let manager = new StockManager();
    let date: Date = new Date('2022-07-20');
    let purchasing: Purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200);

    // 最初何もないことを確認
    expect(manager.stockArr.length).toBe(0);

    // 1つ追加した際の確認
    manager.add(purchasing);
    expect(manager.stockArr.length).toBe(1);
    expect(manager.stockArr[0].product.name).toBe('桃');
    expect(manager.stockArr[0].purchaseDate).toEqual(date);
    expect(manager.stockArr[0].purchasePrice).toBe(200);
    expect(manager.stockArr[0].sellingPrice).toBe(400);
    expect(manager.stockArr[0].stock).toBe(200);

    // 2つ目追加した際の確認
    date = new Date('2022-07-20');
    purchasing = new Purchasing(new Product('お茶'), new Date('2022-07-20'), 60, 150, 600);
    manager.add(purchasing);
    expect(manager.stockArr.length).toBe(2);
    expect(manager.stockArr[1].product.name).toBe('お茶');
    expect(manager.stockArr[1].stock).toBe(600);
    expect(manager.stockArr[1].purchasePrice).toBe(60);
    expect(manager.stockArr[1].sellingPrice).toBe(150);
    expect(manager.stockArr[1].purchaseDate).toEqual(date);
  });
});
