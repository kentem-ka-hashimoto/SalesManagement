// import { Sales } from '../../Types/salesObj.js';
import { SalesManager } from '../../Models/salesManager.js';
import { Product } from '../../Models/product.js';
import { Sale } from '../../Models/sale.js';

describe('SalesManagerTest', () => {
  test('propertyTest', () => {
    let manager = new SalesManager();

    expect(manager.salesArr.length).toBe(0);
  });

  test('addTest', () => {
    let manager = new SalesManager();
    let sale: Sale = new Sale(new Product('桃', '2022-07-20', 200, 400, 200), '2022-07-24', 100, 1);
    expect(manager.salesArr.length).toBe(0);

    // 1つ追加した際の確認
    manager.add(sale);
    expect(manager.salesArr.length).toBe(1);
    expect(manager.salesArr[0].product.productName).toBe('桃');
    expect(manager.salesArr[0].product.purchaseDate).toBe('2022-07-20');
    expect(manager.salesArr[0].product.purchasePrice).toBe(200);
    expect(manager.salesArr[0].product.sellingPrice).toBe(400);
    expect(manager.salesArr[0].product.stock).toBe(200);
    expect(manager.salesArr[0].saleDate).toBe('2022-07-24');
    expect(manager.salesArr[0].saleQuantity).toBe(100);
    expect(manager.salesArr[0].id).toBe(1);

    // 2つ目追加した際の確認
    sale = new Sale(new Product('お茶', '2022-07-20', 60, 150, 600), '2022-07-28', 200, 2);

    manager.add(sale);
    expect(manager.salesArr.length).toBe(2);
    expect(manager.salesArr[1].product.productName).toBe('お茶');
    expect(manager.salesArr[1].product.purchaseDate).toBe('2022-07-20');
    expect(manager.salesArr[1].product.purchasePrice).toBe(60);
    expect(manager.salesArr[1].product.sellingPrice).toBe(150);
    expect(manager.salesArr[1].product.stock).toBe(600);
    expect(manager.salesArr[1].saleDate).toBe('2022-07-28');
    expect(manager.salesArr[1].saleQuantity).toBe(200);
    expect(manager.salesArr[1].id).toBe(2);
  });

  test('getTotalSalesTest', () => {
    let manager = new SalesManager();
    // 何もない時
    expect(manager.getTotalSales()).toBe(0);

    // ひとつ追加
    let sale: Sale = new Sale(new Product('桃', '2022-07-20', 200, 400, 200), '2022-07-24', 100, 1);
    manager.add(sale);
    expect(manager.getTotalSales()).toBe(40000);

    // 2つ目の追加
    sale = new Sale(new Product('お茶', '2022-07-20', 60, 150, 600), '2022-07-28', 200, 2);
    manager.add(sale);
    expect(manager.getTotalSales()).toBe(70000);

    // 3つ目の追加
    sale = new Sale(new Product('アイス', '2022-07-20', 60, 200, 600), '2022-07-28', 600, 3);
    manager.add(sale);
    expect(manager.getTotalSales()).toBe(190000);
  });

  test('getTotalProfitTest', () => {
    let manager = new SalesManager();
    // 何もない時
    expect(manager.getTotalProfit()).toBe(0);

    // ひとつ追加
    let sale: Sale = new Sale(new Product('桃', '2022-07-20', 200, 400, 200), '2022-07-24', 100, 1);
    manager.add(sale);
    expect(manager.getTotalProfit()).toBe(20000);

    // 2つ目の追加
    sale = new Sale(new Product('お茶', '2022-07-20', 60, 150, 600), '2022-07-28', 200, 2);
    manager.add(sale);
    expect(manager.getTotalProfit()).toBe(38000);

    // 3つ目の追加
    sale = new Sale(new Product('アイス', '2022-07-20', 60, 200, 600), '2022-07-28', 600, 3);
    manager.add(sale);
    expect(manager.getTotalProfit()).toBe(122000);
  });
});
