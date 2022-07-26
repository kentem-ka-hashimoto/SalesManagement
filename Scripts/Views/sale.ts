import { Global } from '../Models/global.js';
import { Product } from '../Models/product.js';
import { Sale } from '../Models/sale.js';

{
  // アラートメッセージ
  const NO_STOCK: string = '在庫数が足りません。';
  const NOT_NORMAL_VALUE: string = '値が正常ではありません。もう一度お確かめください。';
  // エラーメッセージ
  const ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

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
  // 配列末尾のidを取得
  let idCount: number = Number(localStorage.getItem('idCount'));

  // 画面ロード時の処理
  window.onload = function () {
    Global.getStockFromLocalStorage();
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
    updateDisabledInput();
    updateDisabledDecisionBtn();
  };

  // ボタンの有効無効判定
  window.addEventListener('change', () => {
    updateDisabledDecisionBtn();
  });

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
    try {
      if (Number(saleQuantity.value) <= 0) {
        throw new Error(ABNORMAL_VALUE_ERROR);
      }
      Global.stockManager.stockArr[index].stock -= Number(saleQuantity.value);
      window.localStorage.setItem('stock', JSON.stringify(Global.stockManager.stockArr));
      // ユーザー入力部分の保存
      idCount++;
      const sale: Sale = new Sale(Global.stockManager.stockArr[index], saleDate.value, Number(saleQuantity.value), false, idCount);
      Global.saleManager.add(sale);
    } catch (e) {
      if (e instanceof RangeError) {
        alert(NO_STOCK);
      } else if (e instanceof Error) {
        alert(NOT_NORMAL_VALUE);
      }
      return;
    }
    window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    localStorage.setItem('idCount', `${idCount}`);
    window.location.href = 'Main.html';
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    window.location.href = 'Main.html';
  });

  // 一覧の表示
  function createStockList(): void {
    Global.stockManager.stockArr.forEach((target: Product) => {
      const tr: HTMLTableRowElement = document.createElement('tr');
      const tdCheck: HTMLTableCellElement = document.createElement('td');
      tdCheck.classList.add('check');
      const checkBox: HTMLInputElement = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.name = 'check';
      // 入力部分の有効無効判定
      checkBox.addEventListener('change', () => {
        updateDisabledInput();
      });

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

  // テキストボックス入力の有効無効
  function updateDisabledInput(): void {
    let checkCount: number = 0;
    checks.forEach((check) => {
      if (check.checked) checkCount++;
      saleQuantity.disabled = checkCount === 0;
      saleDate.disabled = checkCount === 0;
    });
  }

  // 決定ボタンの有効無効
  function updateDisabledDecisionBtn(): void {
    decisionBtn.disabled = saleQuantity.value === '' || saleDate.value === '';
  }
}
