import { Global } from '../Models/global.js';
import { Product } from '../Models/product.js';

{
  // チェックボックスの取得
  let checks: NodeListOf<HTMLInputElement>;
  // 登録商品名の取得
  const productName = document.getElementById('productName') as HTMLInputElement;
  // 追加ボタンの取得
  const addBtn = document.getElementById('add') as HTMLButtonElement;
  // 削除ボタンの取得
  const deleteBtn = document.getElementById('delete') as HTMLButtonElement;
  // 戻るボタンの取得
  const returnBtn = document.getElementById('return') as HTMLButtonElement;

  Global.getProductManagerFromLocalStorage();

  // 追加ボタンの処理
  addBtn.addEventListener('click', () => {
    const product: Product = new Product(productName.value);
    Global.productManager.add(product);
    localStorage.setItem('product', JSON.stringify(Global.productManager.productArr));
    location.reload();
  });
  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    RedirectMainPage();
  });

  // 一覧の表示
  function createStockList(): void {}

  // メイン画面遷移
  function RedirectMainPage(): void {
    window.location.href = 'Main.html';
  }
}
