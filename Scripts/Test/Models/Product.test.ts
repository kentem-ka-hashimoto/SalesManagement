import { Product } from '../../Models/product.js';
import { PurchaseDate } from '../../Types/purchaseDate.js';

describe('ProductTest', () => {
  test('propertyTest', () => {
    let date: Date = new Date();
    // let purchaseDate: purchaseDate = {
    //   year: date.getFullYear(),
    //   month: date.getMonth(),
    //   date:date.getDate()
    // }
    let product: Product = new Product('桃', 200, 200, 400, {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });

    expect(product.productName).toBe('桃')
  });
});
