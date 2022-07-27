import { Product } from '../../Models/product.js';

describe('ProductTest', () => {
  test('propertyTest', () => {
    let product: Product = new Product('桃');
    // 商品名の取得
    expect(product.name).toBe('桃');
  

    // product = new Product('お茶', '2022-07-20', 60, 150, 600);
    // // 商品名の取得
    // expect(product.name).toBe('お茶');
    // // 仕入日の取得
    // expect(product.purchaseDate).toBe('2022-07-20');
    // // 仕入価格の取得
    // expect(product.purchasePrice).toBe(60);
    // // 販売価格の取得
    // expect(product.sellingPrice).toBe(150);
    // // 在庫数の取得
    // expect(product.stock).toBe(600);
  });

  // test('propertyErrorTest', () => {
  //   let product: Product;
  //   // 仕入価格がマイナス
  //   expect(() => (product = new Product('桃', '2022-07-20', -50, 400, 400))).toThrowError('The value is abnormal');
  //   // 販売価格がマイナス
  //   expect(() => (product = new Product('桃', '2022-07-20', 50, -400, 400))).toThrowError('The value is abnormal');
  //   // 販売価格が仕入価格よりも安い
  //   expect(() => (product = new Product('桃', '2022-07-20', 400, 50, 400))).toThrowError('The value is abnormal');
  // });

  // test('setStockTest', () => {
  //   let product: Product = new Product('桃', '2022-07-20', 50, 400, 400);

  //   // 変更前の確認
  //   expect(product.stock).toBe(400);

  //   // 300に変更後
  //   product.stock = 300;
  //   expect(product.stock).toBe(300);

  //   // 1に変更
  //   product.stock = 1;
  //   expect(product.stock).toBe(1);
  // });

  // test('setStockErrorTest', () => {
  //   let product: Product = new Product('桃', '2022-07-20', 50, 400, 400);

  //   // 変更前の確認
  //   expect(product.stock).toBe(400);

  //   // 在庫0
  //   product.stock = 0;
  //   expect(product.stock).toBe(0);

  //   // 在庫-1
  //   expect(() => (product.stock = -1)).toThrowError('The value is abnormal');
  // });
});
