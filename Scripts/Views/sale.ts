import { Global } from '../Models/global.js';
import { Sale } from '../Models/sale.js';
import { Purchasing } from '../Models/purchasing.js';

{
  // アラートメッセージ
  const NOT_NORMAL_VALUE: string = '値が正常ではありません。もう一度お確かめください。';
  // tbodyの取得
  const tbody: HTMLTableSectionElement | null = document.querySelector('tbody');
  // 販売日の取得
  const saleDate = document.getElementById('seleDate') as HTMLInputElement;
  saleDate.value = Global.convertDateToString(new Date());
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
  // 販売する商品名
  let saleProductName: string;
  // 販売する商品の個数
  let saleQuantity: number;

  // 画面ロード時の処理
  window.onload = function () {
    Global.getSalesStatusFromLocalStorage();
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
    // 在庫のチェック
    for (let i = 0; i < saleQuantityArr.length; i++) {
      saleProductName = Global.stockManager.stockArr[i].product.name;
      saleQuantity = Number(saleQuantityArr[i].value);
      if (checks[i].checked && !Global.stockManager.checkEnoughStock(saleProductName, saleQuantity)) {
        const NO_STOCK: string = `${saleProductName}の在庫が足りません。`;
        alert(NO_STOCK);
        return;
      }
    }

    // 販売処理
    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        saleProductName = Global.stockManager.stockArr[i].product.name;
        saleQuantity = Number(saleQuantityArr[i].value);
        saleProduct(saleProductName, saleQuantity);
      }
    }

    // ローカルストレージへの保存
    Global.stockManager.removeNothingStock();
    window.localStorage.setItem('stock', JSON.stringify(Global.stockManager.stockArr));
    window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    localStorage.setItem('idCount', `${idCount}`);
    RedirectMainPage();
  });

  // 戻るボタンの処理
  returnBtn.addEventListener('click', () => {
    RedirectMainPage();
  });

  // 販売処理
  function saleProduct(saleProductName: string, saleQuantity: number): void {
    const stockArr = Global.stockManager.stockArr;
    for (let i = 0; i < stockArr.length; i++) {
      const purchase = stockArr[i];
      if (purchase.product.name === saleProductName) {
        if (saleQuantity <= purchase.stock) {
          purchase.stock -= saleQuantity;
          createSaleInstance(purchase, saleQuantity);
          break;
        } else {
          saleQuantity -= purchase.stock;
          createSaleInstance(purchase, purchase.stock);
          purchase.stock = 0;
        }
      }
    }
  }

  // Saleのインスタンス作成
  function createSaleInstance(purchase: Purchasing, quantity: number): void {
    idCount++;
    const sale: Sale = new Sale(purchase, new Date(saleDate.value), quantity, idCount);
    Global.saleManager.add(sale, Global.productManager.productArr);
  }

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
        updateDisabledCheckBox();
      });

      tdCheck.appendChild(checkBox);
      const tdName: HTMLTableCellElement = document.createElement('td');
      tdName.textContent = target.product.name;
      const tdSalePrise: HTMLTableCellElement = document.createElement('td');
      tdSalePrise.textContent = `${target.sellingPrice}円`;
      const tdStock: HTMLTableCellElement = document.createElement('td');
      tdStock.textContent = `${target.stock}個`;

      const tdQuantity: HTMLTableCellElement = document.createElement('td');
      tdQuantity.classList.add('saleQuantity');
      const tdTextBox: HTMLInputElement = document.createElement('input');
      tdTextBox.type = 'number';
      tdTextBox.name = 'saleQuantity';

      // 負の値の判定
      tdTextBox.addEventListener('input', () => {
        if (Number(tdTextBox.value) <= 0) {
          alert(NOT_NORMAL_VALUE);
          tdTextBox.value = '';
        }
      });
      tdQuantity.appendChild(tdTextBox);

      tr.appendChild(tdCheck);
      tr.appendChild(tdName);
      tr.appendChild(tdSalePrise);
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

  // チェックボックスの有効無効
  function updateDisabledCheckBox(): void {
    checks.forEach((check) => {
      check.disabled = false;
    });

    checks.forEach((check, checkIndex) => {
      if (check.checked) {
        const name: string = Global.stockManager.stockArr[checkIndex].product.name;
        Global.stockManager.stockArr.forEach((item, index) => {
          if (checkIndex !== index && name === item.product.name) {
            checks[index].disabled = true;
          }
        });
      }
    });
  }

  // メイン画面遷移
  function RedirectMainPage(): void {
    window.location.href = 'Main.html';
  }
}
