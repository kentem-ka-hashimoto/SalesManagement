import { Product } from '../Models/product.js';
import { Purchasing } from '../Models/purchasing.js';
import { Global } from '../Models/global.js';

{
  // アラートメッセージ
  const NOT_NORMAL_VALUE: string = '値が正常ではありません。もう一度お確かめください。';
  // エラーメッセージ
  const ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

  // 商品名コンボボックスの取得
  const products = document.getElementById('products') as HTMLSelectElement;
  // 選択肢入れる変数
  let choice: NodeListOf<HTMLOptionElement>;
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
    Global.getProductManagerFromLocalStorage();
    Global.getStockFromLocalStorage();
    createcomboBox();
    // 選択肢の取得
    choice = document.querySelectorAll('option');
    updateDisabledDecisionBtn();
  };

  // ボタンの有効無効判定
  window.addEventListener('change', () => {
    updateDisabledDecisionBtn();
  });

  // 決定ボタンの処理
  decisionBtn.addEventListener('click', () => {
    const product: Product = new Product(choice[products.selectedIndex].value);
    try {
      if (Number(purchaseQuantity.value) <= 0) {
        throw new Error(ABNORMAL_VALUE_ERROR);
      }
      // new Purchasing(商品、仕入日、仕入価格、販売価格、仕入数)
      const purchasing: Purchasing = new Purchasing(
        product,
        new Date(purchaseDate.value),
        Number(purchasePrice.value),
        Number(sellingPrice.value),
        Number(purchaseQuantity.value)
      );
      Global.stockManager.add(purchasing, Global.productManager.productArr);
    } catch {
      alert(NOT_NORMAL_VALUE);
      return;
    }
    window.localStorage.setItem('stock', JSON.stringify(Global.stockManager.stockArr));
    RedirectMainPage();
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    RedirectMainPage();
  });

  // コンボボックスの作成
  function createcomboBox(): void {
    Global.productManager.productArr.forEach((target: Product) => {
      const option: HTMLOptionElement = document.createElement('option');
      option.value = target.name;
      option.textContent = target.name;
      products.appendChild(option);
    });
  }

  // 決定ボタンの有効無効
  function updateDisabledDecisionBtn(): void {
    // どこかが空欄の場合ボタンを押せない
    decisionBtn.disabled =
      products.selectedIndex === 0 ||
      purchaseQuantity.value === '' ||
      purchasePrice.value === '' ||
      sellingPrice.value === '' ||
      purchaseDate.value === '';
  }

  // メイン画面遷移
  function RedirectMainPage(): void {
    window.location.href = 'Main.html';
  }
}
