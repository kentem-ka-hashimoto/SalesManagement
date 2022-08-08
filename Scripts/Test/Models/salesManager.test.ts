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
    let purchaseDate: Date = new Date('2022-07-20');
    let saleDate: Date = new Date('2022-07-24');
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200), new Date('2022-07-24'), 100, 1);
    expect(manager.salesArr.length).toBe(0);
    const productArr: Product[] = [new Product('桃')];

    // 1つ追加した際の確認
    manager.add(sale, productArr);
    expect(manager.salesArr.length).toBe(1);
    expect(manager.salesArr[0].purchasing.product.name).toBe('桃');
    expect(manager.salesArr[0].purchasing.purchaseDate).toEqual(purchaseDate);
    expect(manager.salesArr[0].purchasing.purchasePrice).toBe(200);
    expect(manager.salesArr[0].purchasing.sellingPrice).toBe(400);
    expect(manager.salesArr[0].purchasing.stock).toBe(200);
    expect(manager.salesArr[0].saleDate).toEqual(saleDate);
    expect(manager.salesArr[0].saleQuantity).toBe(100);
    expect(manager.salesArr[0].id).toBe(1);

    // 2つ目追加した際の確認
    saleDate = new Date('2022-07-28');
    sale = new Sale(new Purchasing(new Product('お茶'), new Date('2022-07-20'), 60, 150, 600), new Date('2022-07-28'), 200, 2);
    productArr.push(new Product('お茶'));

    manager.add(sale, productArr);
    expect(manager.salesArr.length).toBe(2);
    expect(manager.salesArr[1].purchasing.product.name).toBe('お茶');
    expect(manager.salesArr[1].purchasing.purchaseDate).toEqual(purchaseDate);
    expect(manager.salesArr[1].purchasing.purchasePrice).toBe(60);
    expect(manager.salesArr[1].purchasing.sellingPrice).toBe(150);
    expect(manager.salesArr[1].purchasing.stock).toBe(600);
    expect(manager.salesArr[1].saleDate).toEqual(saleDate);
    expect(manager.salesArr[1].saleQuantity).toBe(200);
    expect(manager.salesArr[1].id).toBe(2);

    // ３つ目追加した際の確認(１つ目と同じ名前、１つ目よりも仕入日が古い商品を追加)
    purchaseDate = new Date('2022-07-18');
    sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-18'), 300, 500, 300), new Date('2022-07-28'), 300, 3);
    manager.add(sale, productArr);
    expect(manager.salesArr.length).toBe(3);
    expect(manager.salesArr[0].purchasing.product.name).toBe('桃');
    expect(manager.salesArr[0].purchasing.purchaseDate).toEqual(purchaseDate);
    expect(manager.salesArr[0].purchasing.purchasePrice).toBe(300);
    expect(manager.salesArr[0].purchasing.sellingPrice).toBe(500);
    expect(manager.salesArr[0].purchasing.stock).toBe(300);
    expect(manager.salesArr[0].saleDate).toEqual(saleDate);
    expect(manager.salesArr[0].saleQuantity).toBe(300);
    expect(manager.salesArr[0].id).toBe(3);

    // 4つ目追加した際の確認(１つ目と同じ名前、１つ目よりも仕入日が新しい商品を追加)

    purchaseDate = new Date('2022-07-22');
    sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-22'), 400, 600, 400), new Date('2022-07-28'), 400, 4);
    manager.add(sale, productArr);
    expect(manager.salesArr.length).toBe(4);
    expect(manager.salesArr[2].purchasing.product.name).toBe('桃');
    expect(manager.salesArr[2].purchasing.purchaseDate).toEqual(purchaseDate);
    expect(manager.salesArr[2].purchasing.purchasePrice).toBe(400);
    expect(manager.salesArr[2].purchasing.sellingPrice).toBe(600);
    expect(manager.salesArr[2].purchasing.stock).toBe(400);
    expect(manager.salesArr[2].saleDate).toEqual(saleDate);
    expect(manager.salesArr[2].saleQuantity).toBe(400);
    expect(manager.salesArr[2].id).toBe(4);

    // 5つ目追加した際の確認(2つ目と同じ名前、2つ目よりも仕入日が古い商品を追加)
    purchaseDate = new Date('2022-07-18');
    sale = new Sale(new Purchasing(new Product('お茶'), new Date('2022-07-18'), 400, 600, 400), new Date('2022-07-28'), 400, 5);
    manager.add(sale, productArr);
    expect(manager.salesArr.length).toBe(5);
    expect(manager.salesArr[3].purchasing.product.name).toBe('お茶');
    expect(manager.salesArr[3].purchasing.purchaseDate).toEqual(purchaseDate);
    expect(manager.salesArr[3].purchasing.purchasePrice).toBe(400);
    expect(manager.salesArr[3].purchasing.sellingPrice).toBe(600);
    expect(manager.salesArr[3].purchasing.stock).toBe(400);
    expect(manager.salesArr[3].saleDate).toEqual(saleDate);
    expect(manager.salesArr[3].saleQuantity).toBe(400);
    expect(manager.salesArr[3].id).toBe(5);
  });

  test('getTotalSalesTest', () => {
    let manager = new SalesManager();
    // 何もない時
    expect(manager.getTotalSales(manager.salesArr)).toBe(0);

    // ひとつ追加
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200), new Date('2022-07-24'), 100, 1);
    const productArr: Product[] = [new Product('桃')];
    manager.add(sale, productArr);
    expect(manager.getTotalSales(manager.salesArr)).toBe(40000);

    // 2つ目の追加
    sale = new Sale(new Purchasing(new Product('お茶'), new Date('2022-07-20'), 60, 150, 600), new Date('2022-07-28'), 200, 2);
    productArr.push(new Product('お茶'));

    manager.add(sale, productArr);
    expect(manager.getTotalSales(manager.salesArr)).toBe(70000);

    // 3つ目の追加
    sale = new Sale(new Purchasing(new Product('アイス'), new Date('2022-07-20'), 60, 200, 600), new Date('2022-07-28'), 600, 3);
    productArr.push(new Product('アイス'));

    manager.add(sale, productArr);
    expect(manager.getTotalSales(manager.salesArr)).toBe(190000);
  });

  test('getTotalProfitTest', () => {
    let manager = new SalesManager();
    // 何もない時
    expect(manager.getTotalProfit(manager.salesArr)).toBe(0);

    // ひとつ追加
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200), new Date('2022-07-24'), 100, 1);
    const productArr: Product[] = [new Product('桃')];

    manager.add(sale, productArr);
    expect(manager.getTotalProfit(manager.salesArr)).toBe(20000);

    // 2つ目の追加
    sale = new Sale(new Purchasing(new Product('お茶'), new Date('2022-07-20'), 60, 150, 600), new Date('2022-07-28'), 200, 2);
    productArr.push(new Product('お茶'));

    manager.add(sale, productArr);
    expect(manager.getTotalProfit(manager.salesArr)).toBe(38000);

    // 3つ目の追加
    sale = new Sale(new Purchasing(new Product('アイス'), new Date('2022-07-20'), 60, 200, 600), new Date('2022-07-28'), 600, 3);
    productArr.push(new Product('アイス'));

    manager.add(sale, productArr);
    expect(manager.getTotalProfit(manager.salesArr)).toBe(122000);
  });

  test('clearArrTest', () => {
    let manager = new SalesManager();
    let sale: Sale = new Sale(new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200), new Date('2022-07-24'), 100, 1);
    expect(manager.salesArr.length).toBe(0);

    // 1つ追加されているか確認
    const productArr: Product[] = [new Product('桃')];
    manager.add(sale, productArr);
    expect(manager.salesArr.length).toBe(1);

    // 2つ目追加されているか確認
    sale = new Sale(new Purchasing(new Product('お茶'), new Date('2022-07-20'), 60, 150, 600), new Date('2022-07-28'), 200, 2);
    productArr.push(new Product('お茶'));

    manager.add(sale, productArr);
    expect(manager.salesArr.length).toBe(2);

    manager.clearArr(manager.salesArr);
    // 配列が空になっている確認
    expect(manager.salesArr.length).toBe(0);
  });
});
