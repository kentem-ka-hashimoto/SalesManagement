import { Product } from '../Models/product.js';
import { Global } from '../Models/global.js';

{
  // アラートメッセージ
  const NOT_NORMAL_VALUE: string = '値が正常ではありません。もう一度お確かめください。';
  // エラーメッセージ
  const ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

  // 商品名の取得
  const productName = document.getElementById('productName') as HTMLInputElement;
  // 仕入数の取得
  const purchaseQuantity = document.getElementById('purchaseQuantity') as HTMLInputElement;
  // 仕入価格の取得
  const purchasePrice = document.getElementById('purchasePrice') as HTMLInputElement;
  // 販売価格の取得
  const sellingPrice = document.getElementById('sellingPrice') as HTMLInputElement;
  // 仕入日の取得
  const purchaseDate = document.getElementById('purchaseDate') as HTMLInputElement;
  // 決定ボタンの取得
  const decisionBtn = document.getElementById('decision') as HTMLButtonElement;
  // 戻るボタンの取得
  const returnBtn = document.getElementById('return') as HTMLButtonElement;

  // 画面ロード時の処理
  window.onload = function () {
    Global.getStockFromLocalStorage();
    updateDisabledDecisionBtn();
  };

  // ボタンの有効無効判定
  window.addEventListener('change', () => {
    updateDisabledDecisionBtn();
  });

  // 決定ボタンの処理
  decisionBtn.addEventListener('click', () => {
    try {
      if (Number(purchaseQuantity.value) <= 0) {
        throw new Error(ABNORMAL_VALUE_ERROR);
      }
      const product: Product = new Product(
        productName.value,
        purchaseDate.value,
        Number(purchasePrice.value),
        Number(sellingPrice.value),
        Number(purchaseQuantity.value)
      );
      Global.stockManager.add(product);
    } catch {
      alert(NOT_NORMAL_VALUE);
      return;
    }
    window.localStorage.setItem('stock', JSON.stringify(Global.stockManager.stockArr));
    window.location.href = 'Main.html';
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    window.location.href = 'Main.html';
  });

  // 決定ボタンの有効無効
  function updateDisabledDecisionBtn(): void {
    decisionBtn.disabled =
      productName.value === '' ||
      purchaseQuantity.value === '' ||
      purchasePrice.value === '' ||
      sellingPrice.value === '' ||
      purchaseDate.value === '';
  }
}
