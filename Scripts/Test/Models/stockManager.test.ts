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
    const productArr: Product[] = [new Product('桃')];

    // 最初何もないことを確認
    expect(manager.stockArr.length).toBe(0);

    // 1つ追加した際の確認
    manager.add(purchasing, productArr);
    expect(manager.stockArr.length).toBe(1);
    expect(manager.stockArr[0].product.name).toBe('桃');
    expect(manager.stockArr[0].purchaseDate).toEqual(date);
    expect(manager.stockArr[0].purchasePrice).toBe(200);
    expect(manager.stockArr[0].sellingPrice).toBe(400);
    expect(manager.stockArr[0].stock).toBe(200);

    // 2つ目追加した際の確認
    date = new Date('2022-07-20');
    purchasing = new Purchasing(new Product('お茶'), new Date('2022-07-20'), 60, 150, 600);
    productArr.push(new Product('お茶'));

    manager.add(purchasing, productArr);
    expect(manager.stockArr.length).toBe(2);
    expect(manager.stockArr[1].product.name).toBe('お茶');
    expect(manager.stockArr[1].stock).toBe(600);
    expect(manager.stockArr[1].purchasePrice).toBe(60);
    expect(manager.stockArr[1].sellingPrice).toBe(150);
    expect(manager.stockArr[1].purchaseDate).toEqual(date);

    // ３つ目追加した際の確認(１つ目と同じ名前、１つ目よりも仕入日が古い商品を追加)
    date = new Date('2022-07-18');
    purchasing = new Purchasing(new Product('桃'), new Date('2022-07-18'), 300, 500, 300);
    manager.add(purchasing, productArr);
    expect(manager.stockArr.length).toBe(3);
    expect(manager.stockArr[0].product.name).toBe('桃');
    expect(manager.stockArr[0].purchaseDate).toEqual(date);
    expect(manager.stockArr[0].purchasePrice).toBe(300);
    expect(manager.stockArr[0].sellingPrice).toBe(500);
    expect(manager.stockArr[0].stock).toBe(300);
  });

  test('reduceStockTest', () => {
    let manager = new StockManager();
    let date: Date = new Date('2022-07-20');
    let purchasing: Purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200);
    const productArr: Product[] = [new Product('桃')];

    // 2022-07-20入荷の桃の在庫２００個
    manager.add(purchasing, productArr);
    expect(manager.stockArr[0].purchaseDate).toEqual(date);
    expect(manager.stockArr[0].stock).toBe(200);

    // 2022-07-21入荷の桃の在庫3００個
    date = new Date('2022-07-21');
    purchasing = new Purchasing(new Product('桃'), new Date('2022-07-21'), 300, 500, 300);
    manager.add(purchasing, productArr);
    expect(manager.stockArr[1].purchaseDate).toEqual(date);
    expect(manager.stockArr[1].stock).toBe(300);

    // 桃の在庫を300個減らす(仕入日古いほうから)
    manager.reduceStock('桃', 300);
    expect(manager.stockArr[0].stock).toBe(0);
    expect(manager.stockArr[1].stock).toBe(200);
  });

  test('reduceStockErrorTest', () => {
    let manager = new StockManager();
    let date: Date = new Date('2022-07-20');
    let purchasing: Purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200);
    const productArr: Product[] = [new Product('桃')];

    // 2022-07-20入荷の桃の在庫２００個
    manager.add(purchasing, productArr);
    expect(manager.stockArr[0].purchaseDate).toEqual(date);
    expect(manager.stockArr[0].stock).toBe(200);

    // 2022-07-21入荷の桃の在庫3００個
    date = new Date('2022-07-21');
    purchasing = new Purchasing(new Product('桃'), new Date('2022-07-21'), 300, 500, 300);
    manager.add(purchasing, productArr);
    expect(manager.stockArr[1].purchaseDate).toEqual(date);
    expect(manager.stockArr[1].stock).toBe(300);

    // 桃の在庫を700個減らす(在庫が不足している)
    expect(() => manager.reduceStock('桃', 700)).toThrowError('The value is abnormal');
  });
});
