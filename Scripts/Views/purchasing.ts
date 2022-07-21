import { Product } from '../Models/product.js';
import { Global } from '../Models/global.js';

{
  // 商品名の取得
  const productName = document.getElementById('productName') as HTMLInputElement;
  // 仕入数の取得
  const purchaseQuantity = document.getElementById('purchaseQuantity') as HTMLInputElement;
  // 仕入価格の取得
  const prodpurchasePriceuctName = document.getElementById('purchasePrice') as HTMLInputElement;
  // 販売価格の取得
  const sellingPrice = document.getElementById('sellingPrice') as HTMLInputElement;
  // 仕入日の取得
  const purchaseDate = document.getElementById('purchaseDate') as HTMLInputElement;
  // 決定ボタンの取得
  const decisionBtn = document.getElementById('decision') as HTMLButtonElement;
  // 戻るボタンの取得
  const returnBtn = document.getElementById('return') as HTMLButtonElement;

  Global.getStockFromLocalStorage();

  // 決定ボタンの処理
  decisionBtn.addEventListener('click', () => {
    const product: Product = new Product(
      productName.value,
      purchaseDate.value,
      Number(prodpurchasePriceuctName.value),
      Number(sellingPrice.value),
      Number(purchaseQuantity.value)
    );

    Global.stockManager.add(product);
    console.log(Global.stockManager.stockArr);
    window.localStorage.setItem('stock', JSON.stringify(Global.stockManager.stockArr));
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    window.location.href = 'main.html';
  });
}
