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
      product: new Product('桃', 200, 200, 400, '2022-07-20'),
      seleDate: '2022-07-24',
    };

    expect(manager.salesArr.length).toBe(0);

    // 1つ追加した際の確認
    manager.add(sale);
    expect(manager.salesArr.length).toBe(1);
    expect(manager.salesArr[0].product.productName).toBe('桃');
    expect(manager.salesArr[0].product.stock).toBe(200);
    expect(manager.salesArr[0].product.purchasingPrice).toBe(200);
    expect(manager.salesArr[0].product.sellingPrice).toBe(400);
    expect(manager.salesArr[0].product.purchaseDate).toBe('2022-07-20');
    expect(manager.salesArr[0].seleDate).toBe('2022-07-24');


    // 2つ目追加した際の確認
    sale = {
      product: new Product('お茶', 600, 60, 150, '2022-07-20'),
      seleDate: '2022-07-28',
    };
    manager.add(sale);
    expect(manager.salesArr.length).toBe(2);
    expect(manager.salesArr[1].product.productName).toBe('お茶');
    expect(manager.salesArr[1].product.stock).toBe(600);
    expect(manager.salesArr[1].product.purchasingPrice).toBe(60);
    expect(manager.salesArr[1].product.sellingPrice).toBe(150);
    expect(manager.salesArr[1].product.purchaseDate).toBe('2022-07-20');
    expect(manager.salesArr[1].seleDate).toBe('2022-07-28');
  });


});
