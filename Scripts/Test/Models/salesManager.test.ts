import { SalesManager } from '../../Models/salesManager.js';
import { Product } from '../../Models/product.js';
import { Sale } from '../../Models/sale.js';
import { Purchasing } from '../../Models/purchasing.js';

describe('SalesManagerTest', () => {
  test('propertyTest', () => {
    let manager = new SalesManager();

    expect(manager.salesArr.length).toBe(0);
  });

  test('addTest', () => {
    let manager = new SalesManager();
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), '2022-07-20', 200, 400, 200), '2022-07-24', 100, 1);
    expect(manager.salesArr.length).toBe(0);

    // 1つ追加した際の確認
    manager.add(sale);
    expect(manager.salesArr.length).toBe(1);
    expect(manager.salesArr[0].purchasing.product.name).toBe('桃');
    expect(manager.salesArr[0].purchasing.purchaseDate).toBe('2022-07-20');
    expect(manager.salesArr[0].purchasing.purchasePrice).toBe(200);
    expect(manager.salesArr[0].purchasing.sellingPrice).toBe(400);
    expect(manager.salesArr[0].purchasing.stock).toBe(200);
    expect(manager.salesArr[0].saleDate).toBe('2022-07-24');
    expect(manager.salesArr[0].saleQuantity).toBe(100);
    expect(manager.salesArr[0].id).toBe(1);

    // 2つ目追加した際の確認
    sale = new Sale(new Purchasing(new Product('お茶'), '2022-07-20', 60, 150, 600), '2022-07-28', 200, 2);

    manager.add(sale);
    expect(manager.salesArr.length).toBe(2);
    expect(manager.salesArr[1].purchasing.product.name).toBe('お茶');
    expect(manager.salesArr[1].purchasing.purchaseDate).toBe('2022-07-20');
    expect(manager.salesArr[1].purchasing.purchasePrice).toBe(60);
    expect(manager.salesArr[1].purchasing.sellingPrice).toBe(150);
    expect(manager.salesArr[1].purchasing.stock).toBe(600);
    expect(manager.salesArr[1].saleDate).toBe('2022-07-28');
    expect(manager.salesArr[1].saleQuantity).toBe(200);
    expect(manager.salesArr[1].id).toBe(2);
  });

  test('getTotalSalesTest', () => {
    let manager = new SalesManager();
    // 何もない時
    expect(manager.getTotalSales(manager.salesArr)).toBe(0);

    // ひとつ追加
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), '2022-07-20', 200, 400, 200), '2022-07-24', 100, 1);
    manager.add(sale);
    expect(manager.getTotalSales(manager.salesArr)).toBe(40000);

    // 2つ目の追加
    sale = new Sale(new Purchasing(new Product('お茶'), '2022-07-20', 60, 150, 600), '2022-07-28', 200, 2);
    manager.add(sale);
    expect(manager.getTotalSales(manager.salesArr)).toBe(70000);

    // 3つ目の追加
    sale = new Sale(new Purchasing(new Product('アイス'), '2022-07-20', 60, 200, 600), '2022-07-28', 600, 3);
    manager.add(sale);
    expect(manager.getTotalSales(manager.salesArr)).toBe(190000);
  });

  test('getTotalProfitTest', () => {
    let manager = new SalesManager();
    // 何もない時
    expect(manager.getTotalProfit(manager.salesArr)).toBe(0);

    // ひとつ追加
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), '2022-07-20', 200, 400, 200), '2022-07-24', 100, 1);
    manager.add(sale);
    expect(manager.getTotalProfit(manager.salesArr)).toBe(20000);

    // 2つ目の追加
    sale = new Sale(new Purchasing(new Product('お茶'), '2022-07-20', 60, 150, 600), '2022-07-28', 200, 2);
    manager.add(sale);
    expect(manager.getTotalProfit(manager.salesArr)).toBe(38000);

    // 3つ目の追加
    sale = new Sale(new Purchasing(new Product('アイス'), '2022-07-20', 60, 200, 600), '2022-07-28', 600, 3);
    manager.add(sale);
    expect(manager.getTotalProfit(manager.salesArr)).toBe(122000);
  });

  test('clearArrTest', () => {
    let manager = new SalesManager();
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), '2022-07-20', 200, 400, 200), '2022-07-24', 100, 1);
    expect(manager.salesArr.length).toBe(0);

    // 1つ追加されているか確認
    manager.add(sale);
    expect(manager.salesArr.length).toBe(1);

    // 2つ目追加されているか確認
    sale = new Sale(new Purchasing(new Product('お茶'), '2022-07-20', 60, 150, 600), '2022-07-28', 200, 2);
    manager.add(sale);
    expect(manager.salesArr.length).toBe(2);

    manager.clearArr(manager.salesArr);
    // 配列が空になっている確認
    expect(manager.salesArr.length).toBe(0);
  });
});
