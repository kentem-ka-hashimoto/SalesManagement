import { Global } from '../Models/global.js';
import { Sale } from '../Models/sale.js';
import { SalesManager } from '../Models/salesManager.js';

// tbodyの取得
const tbody: HTMLTableSectionElement | null = document.querySelector('tbody');
// 仕入処理ボタンの取得
const purchasingBtn = document.getElementById('purchasing') as HTMLButtonElement;
// 販売処理ボタンの取得
const saleBtn = document.getElementById('sale') as HTMLButtonElement;
// 在庫一覧ボタンの取得
const stockListBtn = document.getElementById('stockList') as HTMLButtonElement;
// 絞込みボタンの取得
const narrowingBtn = document.getElementById('narrowing') as HTMLButtonElement;
// 今日の販売ボタンの取得
const todaySaleBtn = document.getElementById('todaySale') as HTMLButtonElement;
// 解除ボタンの取得
const lifttBtn = document.getElementById('lift') as HTMLButtonElement;
// 売上合計金額表示部分の取得
const totalSales = document.getElementById('totalSales') as HTMLElement;
// 利益合計金額表示部分の取得
const totalProfit = document.getElementById('totalProfit') as HTMLElement;
// チェックボックスの取得
let checks: NodeListOf<HTMLInputElement>;
// mapを用意
let map: Map<string, boolean> = new Map();

// 今日の日付を取得
const date: Date = new Date();
const today: string = date.getFullYear() + '-' + `${('00' + (date.getMonth() + 1)).slice(-2)}` + '-' + `${('00' + date.getDate()).slice(-2)}`;

// 画面ロード時の処理
window.onload = function () {
  // salesマネージャー
  Global.getSalesStatusFromLocalStorage();
  const items: string | null = localStorage.getItem('map');
  if (items) {
    map = new Map(JSON.parse(items));
  }
  createSalesStatusList();
  updateTotalSalesAndTotalProfit();
  checkDisabledBtn();
  lifttBtn.disabled = true;
};

// 絞込みボタンの処理(チェック状態でないものは配列から削除する)
narrowingBtn.addEventListener('click', () => {
  for (let i = Global.saleManager.salesArr.length - 1; i >= 0; i--) {
    if (!map.get(`${Global.saleManager.salesArr[i].id}`)) {
      Global.saleManager.salesArr.splice(i, 1);
    }
  }
  displayUpdate();
});

// 今日の販売ボタンの処理(今日でないものは配列から削除する)
todaySaleBtn.addEventListener('click', () => {
  for (let i = Global.saleManager.salesArr.length - 1; i >= 0; i--) {
    if (Global.saleManager.salesArr[i].saleDate !== today) {
      Global.saleManager.salesArr.splice(i, 1);
    }
  }
  displayUpdate();
});

// 解除ボタンの処理
lifttBtn.addEventListener('click', () => {
  setCheckStatusToLocalStorage();
  Global.saleManager.clearArr();
  Global.getSalesStatusFromLocalStorage();
  createSalesStatusList();
  updateTotalSalesAndTotalProfit();
  lifttBtn.disabled = true;
});

// 仕入処理ボタンの処理
purchasingBtn.addEventListener('click', () => {
  setCheckStatusToLocalStorage();
  window.location.href = 'Purchasing.html';
});
// 販売処理ボタンの処理
saleBtn.addEventListener('click', () => {
  setCheckStatusToLocalStorage();
  window.location.href = 'Sale.html';
});
// 在庫一覧ボタンの処理
stockListBtn.addEventListener('click', () => {
  setCheckStatusToLocalStorage();
  window.open('StockList.html', '_blank');
});

// リストの作成
function createSalesStatusList(): void {
  deleteTbodyChildren();

  Global.saleManager.salesArr.forEach((target) => {
    const tr: HTMLTableRowElement = document.createElement('tr');
    const tdCheck: HTMLTableCellElement = document.createElement('td');
    tdCheck.classList.add('check');
    const checkBox: HTMLInputElement = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = 'check';
    checkBox.checked = map.get(`${target.id}`) as boolean;

    // isSelectedの更新
    checkBox.addEventListener('change', () => {
      for (let i = 0; i < checks.length; i++) {
        map.set(`${Global.saleManager.salesArr[i].id}`, checks[i].checked);
      }
      checkDisabledBtn();
    });
    tdCheck.appendChild(checkBox);

    const tdName: HTMLTableCellElement = document.createElement('td');
    tdName.textContent = target.product.productName;
    const tdSellingPrice: HTMLTableCellElement = document.createElement('td');
    tdSellingPrice.textContent = `${target.product.sellingPrice.toLocaleString()}円`;
    const tdPurchasePrice: HTMLTableCellElement = document.createElement('td');
    tdPurchasePrice.textContent = `${target.product.purchasePrice.toLocaleString()}円`;
    const tdPurchaseDate: HTMLTableCellElement = document.createElement('td');
    tdPurchaseDate.textContent = target.product.purchaseDate;
    const tdSalesDate: HTMLTableCellElement = document.createElement('td');
    tdSalesDate.textContent = target.saleDate;
    const tdQuantity: HTMLTableCellElement = document.createElement('td');
    tdQuantity.textContent = `${target.saleQuantity.toLocaleString()}個`;
    const tdEarnings: HTMLTableCellElement = document.createElement('td');
    tdEarnings.textContent = `${(target.product.sellingPrice * target.saleQuantity).toLocaleString()}円`;

    tr.appendChild(tdCheck);
    tr.appendChild(tdName);
    tr.appendChild(tdSellingPrice);
    tr.appendChild(tdPurchasePrice);
    tr.appendChild(tdPurchaseDate);
    tr.appendChild(tdSalesDate);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdEarnings);

    tbody?.appendChild(tr);
  });
  checks = document.getElementsByName('check') as NodeListOf<HTMLInputElement>;
}

// tbody内の削除
function deleteTbodyChildren(): void {
  while (tbody?.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

// 金額表示
function updateTotalSalesAndTotalProfit(): void {
  totalSales.textContent = `売上合計金額 : ${Global.saleManager.getTotalSales().toLocaleString()}円`;
  totalProfit.textContent = `利益合計金額 : ${Global.saleManager.getTotalProfit().toLocaleString()}円`;
}

// ボタンの有効無効
function checkDisabledBtn(): void {
  let checkCount: number = 0;
  checks.forEach((check) => {
    if (check.checked) checkCount++;
    narrowingBtn.disabled = checkCount === 0;
  });
}

// 絞込み、今日の販売ボタンを押した際の画面更新部分の処理
function displayUpdate(): void {
  createSalesStatusList();
  updateTotalSalesAndTotalProfit();
  lifttBtn.disabled = false;
}

// チェック状態の保存
function setCheckStatusToLocalStorage(): void {
  let items = Array.from(map.entries());
  localStorage.setItem('map', JSON.stringify(items));
}
