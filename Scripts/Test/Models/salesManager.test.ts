import { Sales } from '../../Types/salesObj.js';
import { SalesManager } from '../../Models/salesManager.js';
import { Product } from '../../Models/product.js';

describe('SalesManagerTest', () => {
  test('propertyTest', () => {
    let manager = new SalesManager();

    expect(manager.salesArr.length).toBe(0);
  });

  test('addTest', () => {
    let manager = new SalesManager();
    let sale: Sales = {
      product: new Product('桃', '2022-07-20', 200, 400, 200),
      saleDate: '2022-07-24',
      saleQuantity: 100,
    };

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

    // 2つ目追加した際の確認
    sale = {
      product: new Product('お茶', '2022-07-20', 60, 150, 600),
      saleDate: '2022-07-28',
      saleQuantity: 200,
    };
    manager.add(sale);
    expect(manager.salesArr.length).toBe(2);
    expect(manager.salesArr[1].product.productName).toBe('お茶');
    expect(manager.salesArr[1].product.purchaseDate).toBe('2022-07-20');
    expect(manager.salesArr[1].product.purchasePrice).toBe(60);
    expect(manager.salesArr[1].product.sellingPrice).toBe(150);
    expect(manager.salesArr[1].product.stock).toBe(600);
    expect(manager.salesArr[1].saleDate).toBe('2022-07-28');
    expect(manager.salesArr[1].saleQuantity).toBe(200);
  });
});
