import { Global } from '../Models/global.js';
import { Product } from '../Models/product.js';
import { Sales } from '../../Scripts/Types/salesObj.js';
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

Global.getSalesStatusFromLocalStorage();

// 今日の日付を取得
const date: Date = new Date();
const today: string = date.getFullYear() + '-' + `${('00' + (date.getMonth() + 1)).slice(-2)}` + '-' + `${('00' + date.getDate()).slice(-2)}`;

// 画面ロード時の処理
window.onload = function () {
  createSalesStatusList();
  checks = document.getElementsByName('check') as NodeListOf<HTMLInputElement>;
  updateTotalSalesAndTotalProfit();
};

// 絞込みボタンの処理
narrowingBtn.addEventListener('click', () => {
  deleteTbodyChildren();
  Global.saleManager.removeOtherThanChecked();
  createSalesStatusList();
  updateTotalSalesAndTotalProfit();
});

// 今日の販売ボタンの処理
todaySaleBtn.addEventListener('click', () => {
  deleteTbodyChildren();
  Global.saleManager.removeOtherThanToday(today);
  createSalesStatusList();
  updateTotalSalesAndTotalProfit();
});

// 解除ボタンの処理
lifttBtn.addEventListener('click', () => {
  location.reload();
});

// 仕入処理ボタンの処理
purchasingBtn.addEventListener('click', () => {
  // window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
  window.location.href = 'Purchasing.html';
});
// 販売処理ボタンの処理
saleBtn.addEventListener('click', () => {
  // window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
  window.location.href = 'Sale.html';
});
// 在庫一覧ボタンの処理
stockListBtn.addEventListener('click', () => {
  // window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
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
    target.selected ? (checkBox.checked = true) : (checkBox.checked = false);

    checkBox.addEventListener('change', () => {
      checks.forEach((check, index) => {
        if (check.checked) {
          Global.saleManager.salesArr[index].selected = true;
        } else {
          Global.saleManager.salesArr[index].selected = false;
        }
      });
    });
    tdCheck.appendChild(checkBox);

    const tdName: HTMLTableCellElement = document.createElement('td');
    tdName.textContent = target.product.productName;
    const tdSellingPrice: HTMLTableCellElement = document.createElement('td');
    tdSellingPrice.textContent = `${target.product.sellingPrice}円`;
    const tdPurchasePrice: HTMLTableCellElement = document.createElement('td');
    tdPurchasePrice.textContent = `${target.product.purchasePrice}円`;
    tdPurchasePrice.classList.add('purchasePrice');
    const tdPurchaseDate: HTMLTableCellElement = document.createElement('td');
    tdPurchaseDate.textContent = target.product.purchaseDate;
    const tdSalesDate: HTMLTableCellElement = document.createElement('td');
    tdSalesDate.textContent = target.saleDate;
    const tdQuantity: HTMLTableCellElement = document.createElement('td');
    tdQuantity.textContent = `${target.saleQuantity}個`;
    tdQuantity.classList.add('quantity');
    const tdEarnings: HTMLTableCellElement = document.createElement('td');
    tdEarnings.textContent = `${target.product.sellingPrice * target.saleQuantity}円`;
    tdEarnings.classList.add('Earnings');

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
