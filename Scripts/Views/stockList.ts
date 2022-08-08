import { Global } from '../Models/global.js';
import { Purchasing } from '../Models/purchasing.js';
import { Sale } from '../Models/sale.js';

// tbodyの取得
const tbody: HTMLTableSectionElement | null = document.querySelector('tbody');
// 閉じるボタンの取得
const closeBtn = document.getElementById('close') as HTMLButtonElement;

// 画面ロード時の処理
window.onload = function () {
  Global.getProductManagerFromLocalStorage();
  Global.getStockFromLocalStorage();
  createStockList();
};

// ローカルストレージに変化があった場合の処理
window.addEventListener('storage', (event) => {
  if (event.storageArea != localStorage) return;
  if (event.key === 'stock') {
    location.reload();
  }
});

// 閉じるボタンの処理
closeBtn.addEventListener('click', () => {
  window.close();
});

// 在庫一覧の作成
function createStockList(): void {
  Global.stockManager.stockArr.forEach((target: Purchasing) => {
    const tr: HTMLTableRowElement = document.createElement('tr');
    const tdName: HTMLTableCellElement = document.createElement('td');
    tdName.textContent = target.product.name;
    const tdPurchaseDate: HTMLTableCellElement = document.createElement('td');
    tdPurchaseDate.textContent = target.convertDateToString();
    const tdPurchasePrice: HTMLTableCellElement = document.createElement('td');
    tdPurchasePrice.textContent = `${target.purchasePrice}円`;
    const tdSellingPrice: HTMLTableCellElement = document.createElement('td');
    tdSellingPrice.textContent = `${target.sellingPrice}円`;
    const tdStock: HTMLTableCellElement = document.createElement('td');
    tdStock.textContent = `${target.stock}個`;

    tr.appendChild(tdName);
    tr.appendChild(tdPurchaseDate);
    tr.appendChild(tdPurchasePrice);
    tr.appendChild(tdSellingPrice);
    tr.appendChild(tdStock);

    tbody?.appendChild(tr);
  });
}
