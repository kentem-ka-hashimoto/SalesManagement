import { Global } from '../Models/global.js';
import { Product } from '../Models/product.js';
import { Sales } from '../../Scripts/Types/salesObj.js';

{
  // tbodyの取得
  const tbody: HTMLTableSectionElement | null = document.querySelector('tbody');
  // 販売数の取得
  const saleQuantity = document.getElementById('saleQuantity') as HTMLInputElement;
  // 販売日の取得
  const saleDate = document.getElementById('seleDate') as HTMLInputElement;
  // 決定ボタンの取得
  const decisionBtn = document.getElementById('decision') as HTMLButtonElement;
  // 戻るボタンの取得
  const returnBtn = document.getElementById('return') as HTMLButtonElement;
  // チェックボックスの取得
  let checks: NodeListOf<HTMLInputElement>;

  // 画面ロード時の処理
  window.onload = function () {
    deleteTbodyChildren();
    createStockList();
    // チェックボックスの取得(複数選択させない)
    checks = document.getElementsByName('check') as NodeListOf<HTMLInputElement>;
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
  };

  // 決定ボタンの処理
  decisionBtn.addEventListener('click', () => {
    Global.getSalesStatusFromLocalStorage();
    // チェックのインデックス取得
    let index: number = 0;
    checks.forEach((check, checks_index) => {
      if (check.checked) {
        index = checks_index;
        return;
      }
    });

    // 在庫数の更新
    Global.stockManager.stockArr[index].stock -= Number(saleQuantity.value);
    window.localStorage.setItem('stock', JSON.stringify(Global.stockManager.stockArr));

    // ユーザー入力部分の保存
    const sale: Sales = {
      product: Global.stockManager.stockArr[index],
      saleDate: saleDate.value,
      saleQuantity: Number(saleQuantity.value),
      selected:false
    };
    Global.saleManager.add(sale);
    window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    window.location.href = 'Main.html';
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    window.location.href = 'Main.html';
  });

  // 一覧の表示
  function createStockList(): void {
    Global.getStockFromLocalStorage();

    Global.stockManager.stockArr.forEach((target: Product) => {
      const tr: HTMLTableRowElement = document.createElement('tr');
      const tdCheck: HTMLTableCellElement = document.createElement('td');
      tdCheck.classList.add('check');
      const checkBox: HTMLInputElement = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.name = 'check';
      tdCheck.appendChild(checkBox);
      const tdName: HTMLTableCellElement = document.createElement('td');
      tdName.textContent = target.productName;
      const tdStock: HTMLTableCellElement = document.createElement('td');
      tdStock.textContent = `${target.stock}個`;

      tr.appendChild(tdCheck);
      tr.appendChild(tdName);
      tr.appendChild(tdStock);
      tbody?.appendChild(tr);
    });
  }

  // tbody内の削除
  function deleteTbodyChildren(): void {
    while (tbody?.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
}