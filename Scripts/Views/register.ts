import { Global } from '../Models/global.js';
import { Product } from '../Models/product.js';

{
  // アラートメッセージ
  const ALREADY_REGISTERED: string = 'この商品はすでに登録されています。';
  // tbodyの取得
  const tbody: HTMLTableSectionElement | null = document.querySelector('tbody');
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

  // 画面ロード時の処理
  window.onload = function () {
    Global.getProductManagerFromLocalStorage();
    createProductList();
    checks.forEach((check) => {
      check.addEventListener('change', () => {
        if (check.checked) {
          checks.forEach((check) => {
            check.checked = false;
          });
          check.checked = true;
        }
      });
    });
    updateDisabledDeletBtn();
  };

  // 追加ボタンの処理
  addBtn.addEventListener('click', () => {
    const product: Product = new Product(productName.value);
    try {
      Global.productManager.add(product);
      localStorage.setItem('product', JSON.stringify(Global.productManager.productArr));
      location.reload();
    } catch {
      alert(ALREADY_REGISTERED);
    }
  });

  // 削除ボタンの処理
  deleteBtn.addEventListener('click', () => {
    checks.forEach((target, index) => {
      if (target.checked) {
        Global.productManager.delete(index);
      }
    });
    localStorage.setItem('product', JSON.stringify(Global.productManager.productArr));
    location.reload();
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    RedirectMainPage();
  });

  // 登録商品一覧の作成
  function createProductList(): void {
    Global.productManager.productArr.forEach((target: Product) => {
      const tr: HTMLTableRowElement = document.createElement('tr');
      const tdCheck: HTMLTableCellElement = document.createElement('td');
      tdCheck.classList.add('check');
      const checkBox: HTMLInputElement = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.name = 'check';

      // 入力部分の有効無効判定
      checkBox.addEventListener('change', () => {
        updateDisabledDeletBtn();
      });

      tdCheck.appendChild(checkBox);
      const tdName: HTMLTableCellElement = document.createElement('td');
      tdName.textContent = target.name;

      tr.appendChild(tdCheck);
      tbody?.appendChild(tr);
      tr.appendChild(tdName);
    });
    checks = document.getElementsByName('check') as NodeListOf<HTMLInputElement>;
  }

  // 削除ボタンの有効無効
  function updateDisabledDeletBtn(): void {
    let checkCount: number = 0;
    checks.forEach((check) => {
      if (check.checked) checkCount++;
      deleteBtn.disabled = checkCount === 0;
    });
  }

  // メイン画面遷移
  function RedirectMainPage(): void {
    window.location.href = 'Main.html';
  }
}
