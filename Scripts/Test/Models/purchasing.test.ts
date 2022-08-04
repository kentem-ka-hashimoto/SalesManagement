import { Product } from '../../Models/product.js';
import { Purchasing } from '../../Models/purchasing.js';

describe('PurchasingTest', () => {
  test('propertyTest', () => {
    const date: Date = new Date('2022-07-20');
    let purchasing: Purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200);
    // 商品名の取得
    expect(purchasing.product.name).toBe('桃');
    // 仕入日の取得
    expect(purchasing.purchaseDate).toEqual(date);
    // 仕入価格の取得
    expect(purchasing.purchasePrice).toBe(200);
    // 販売価格の取得
    expect(purchasing.sellingPrice).toBe(400);
    // 在庫数の取得
    expect(purchasing.stock).toBe(200);
  });

  test('propertyErrorTest', () => {
    let purchasing: Purchasing;

    // 仕入価格がマイナスの値
    expect(() => (purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), -10, 400, 200))).toThrowError('The value is abnormal');

    // 販売価格がマイナスの値
    expect(() => (purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, -10, 200))).toThrowError('The value is abnormal');

    // 仕入数が０
    expect(() => (purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 0))).toThrowError('The value is abnormal');

    // 仕入数がマイナスの値
    expect(() => (purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, -10))).toThrowError('The value is abnormal');

    // 販売価格が知れ価格よりも高い
    expect(() => (purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 400, 200, 200))).toThrowError('The value is abnormal');
  });

  test('setStockTest', () => {
    let purchasing: Purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200);

    // 在庫が100個減った
    purchasing.stock -= 100;
    expect(purchasing.stock).toBe(100);

    // 在庫がちょうど０になった
    purchasing.stock -= 100;
    expect(purchasing.stock).toBe(0);
  });
  test('setStockErrorTest', () => {
    let purchasing: Purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200);

    // マイナスの値が来た場合
    expect(() => (purchasing.stock = -1)).toThrowError('The value is abnormal');
  });

  test('convertDateToStringTest', () => {
    const date: Date = new Date('2022-07-20');
    let purchasing: Purchasing = new Purchasing(new Product('桃'), new Date('2022-07-20'), 200, 400, 200);

    expect(purchasing.convertDateToString()).toBe('2022-07-20');
  });
});
