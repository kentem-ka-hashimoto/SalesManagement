import { Global } from '../Models/global.js';
import { Sale } from '../Models/sale.js';
import { Purchasing } from '../Models/purchasing.js';

{
  // アラートメッセージ
  const NO_STOCK: string = '在庫数が足りません。';
  const NOT_NORMAL_VALUE: string = '値が正常ではありません。もう一度お確かめください。';
  // エラーメッセージ
  const ABNORMAL_VALUE_ERROR: string = 'The value is abnormal';

  // tbodyの取得
  const tbody: HTMLTableSectionElement | null = document.querySelector('tbody');
  // 販売日の取得
  const saleDate = document.getElementById('seleDate') as HTMLInputElement;
  // 決定ボタンの取得
  const decisionBtn = document.getElementById('decision') as HTMLButtonElement;
  // 戻るボタンの取得
  const returnBtn = document.getElementById('return') as HTMLButtonElement;
  // チェックボックスの取得
  let checks: NodeListOf<HTMLInputElement>;
  // 販売数の取得
  let saleQuantityArr: NodeListOf<HTMLInputElement>;
  // 配列末尾のidを取得
  let idCount: number = Number(localStorage.getItem('idCount'));
  Global.getSalesStatusFromLocalStorage();

  // 画面ロード時の処理
  window.onload = function () {
    Global.getStockFromLocalStorage();
    createStockList();
    updateDisabledInput();
    updateDisabledDecisionBtn();
  };

  // ボタンの有効無効判定
  window.addEventListener('change', () => {
    updateDisabledDecisionBtn();
  });

  // 決定ボタンの処理
  decisionBtn.addEventListener('click', () => {
    for (let i = 0; i < saleQuantityArr.length; i++) {
      try {
        if (checks[i].checked && Number(saleQuantityArr[i].value) <= 0) {
          throw new Error(ABNORMAL_VALUE_ERROR);
        }
      } catch {
        alert(NOT_NORMAL_VALUE);
        return;
      }
    }

    for (let i = 0; i < checks.length; i++) {
      try {
        if (checks[i].checked) {
          if (Number(saleQuantityArr[i].value) <= 0) {
            throw new Error(ABNORMAL_VALUE_ERROR);
          }
          //在庫を減らす
          Global.stockManager.stockArr[i].stock -= Number(saleQuantityArr[i].value);
          window.localStorage.setItem('stock', JSON.stringify(Global.stockManager.stockArr));
          // new Sale(Purchasing、販売日、販売数、ID)
          idCount++;
          const sale: Sale = new Sale(Global.stockManager.stockArr[i], new Date(saleDate.value), Number(saleQuantityArr[i].value), idCount);
          Global.saleManager.add(sale);
        }
      } catch (e) {
        if (e instanceof RangeError) {
          alert(NO_STOCK);
          return;
        } else if (e instanceof Error) {
          alert(NOT_NORMAL_VALUE);
          return;
        }
      }
    }
    window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    localStorage.setItem('idCount', `${idCount}`);
    RedirectMainPage();
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    RedirectMainPage();
  });

  // 一覧の表示
  function createStockList(): void {
    Global.stockManager.stockArr.forEach((target: Purchasing) => {
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
      tdName.textContent = target.product.name;
      const tdStock: HTMLTableCellElement = document.createElement('td');
      tdStock.textContent = `${target.stock}個`;

      const tdQuantity: HTMLTableCellElement = document.createElement('td');
      tdQuantity.classList.add('saleQuantity');
      const tdTextBox: HTMLInputElement = document.createElement('input');
      tdTextBox.type = 'number';
      tdTextBox.name = 'saleQuantity';
      tdQuantity.appendChild(tdTextBox);

      tr.appendChild(tdCheck);
      tr.appendChild(tdName);
      tr.appendChild(tdStock);
      tr.appendChild(tdQuantity);
      tbody?.appendChild(tr);
    });
    checks = document.getElementsByName('check') as NodeListOf<HTMLInputElement>;
    saleQuantityArr = document.getElementsByName('saleQuantity') as NodeListOf<HTMLInputElement>;
  }

  // テキストボックス入力の有効無効
  function updateDisabledInput(): void {
    let checkCount: number = 0;
    checks.forEach((check, index) => {
      if (!check.checked) {
        saleQuantityArr[index].value = '';
      }
      saleQuantityArr[index].disabled = !check.checked;
      if (check.checked) checkCount++;
      saleDate.disabled = checkCount === 0;
    });
  }

  // 決定ボタンの有効無効
  function updateDisabledDecisionBtn(): void {
    let checkCount: number = 0;
    checks.forEach((check, index) => {
      if (check.checked && saleQuantityArr[index].value === '') checkCount++;
    });
    decisionBtn.disabled = checkCount >= 1 || saleDate.value === '';
  }

  // メイン画面遷移
  function RedirectMainPage(): void {
    window.location.href = 'Main.html';
  }
}
