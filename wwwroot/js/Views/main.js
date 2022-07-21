import { Global } from '../Models/global.js';
// tbodyの取得
const tbody = document.querySelector('tbody');
// 仕入処理ボタンの取得
const purchasingBtn = document.getElementById('purchasing');
// 販売処理ボタンの取得
const saleBtn = document.getElementById('sale');
// 在庫一覧ボタンの取得
const stockListBtn = document.getElementById('stockList');
// 絞込みボタンの取得
const narrowingBtn = document.getElementById('narrowing');
// 今日の販売ボタンの取得
const todaySaleBtn = document.getElementById('todaySale');
// 解除ボタンの取得
const lifttBtn = document.getElementById('lift');
// 売上合計金額表示部分の取得
const totalSales = document.getElementById('totalSales');
// 利益合計金額表示部分の取得
const totalProfit = document.getElementById('totalProfit');
// チェックボックスの取得
let checks;
Global.getSalesStatusFromLocalStorage();
// 今日の日付を取得
const date = new Date();
const today = date.getFullYear() + '-' + `${('00' + (date.getMonth() + 1)).slice(-2)}` + '-' + `${('00' + date.getDate()).slice(-2)}`;
// 売上合計金額の取得
function updateTotalSales() {
    const tdEarnings = document.querySelectorAll('td.Earnings');
    let totalSales = 0;
    tdEarnings.forEach((target) => {
        var _a;
        totalSales += Number((_a = target.textContent) === null || _a === void 0 ? void 0 : _a.slice(0, target.textContent.length - 1));
    });
    return totalSales.toLocaleString();
}
// 画面ロード時の処理
window.onload = function () {
    createSalesStatusList();
    checks = document.getElementsByName('check');
    totalSales.textContent = `売上合計金額 : ${updateTotalSales()}円`;
};
// 絞込みボタンの処理
narrowingBtn.addEventListener('click', () => {
    deleteTbodyChildren();
    Global.saleManager.salesArr.forEach((target) => {
        if (target.selected) {
            createSalesStatusLine(target);
        }
    });
});
// 今日の販売ボタンの処理
todaySaleBtn.addEventListener('click', () => {
    deleteTbodyChildren();
    Global.saleManager.salesArr.forEach((target) => {
        if (target.saleDate === today) {
            createSalesStatusLine(target);
        }
    });
});
// 解除ボタンの処理
lifttBtn.addEventListener('click', () => {
    createSalesStatusList();
    checks = document.getElementsByName('check');
});
function createSalesStatusLine(target) {
    const tr = document.createElement('tr');
    const tdCheck = document.createElement('td');
    tdCheck.classList.add('check');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = 'check';
    target.selected ? (checkBox.checked = true) : (checkBox.checked = false);
    checkBox.addEventListener('change', () => {
        checks.forEach((check, index) => {
            if (check.checked) {
                Global.saleManager.salesArr[index].selected = true;
            }
        });
    });
    tdCheck.appendChild(checkBox);
    const tdName = document.createElement('td');
    tdName.textContent = target.product.productName;
    const tdSellingPrice = document.createElement('td');
    tdSellingPrice.textContent = `${target.product.sellingPrice}円`;
    const tdPurchasePrice = document.createElement('td');
    tdPurchasePrice.textContent = `${target.product.purchasePrice}円`;
    const tdPurchaseDate = document.createElement('td');
    tdPurchaseDate.textContent = target.product.purchaseDate;
    const tdSalesDate = document.createElement('td');
    tdSalesDate.textContent = target.saleDate;
    const tdQuantity = document.createElement('td');
    tdQuantity.textContent = `${target.saleQuantity}個`;
    const tdEarnings = document.createElement('td');
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
    tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
}
function createSalesStatusList() {
    deleteTbodyChildren();
    Global.saleManager.salesArr.forEach((target) => {
        // if (!target.selected) return;
        const tr = document.createElement('tr');
        const tdCheck = document.createElement('td');
        tdCheck.classList.add('check');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.name = 'check';
        target.selected ? (checkBox.checked = true) : (checkBox.checked = false);
        checkBox.addEventListener('change', () => {
            checks.forEach((check, index) => {
                if (check.checked) {
                    Global.saleManager.salesArr[index].selected = true;
                }
                else {
                    Global.saleManager.salesArr[index].selected = false;
                }
            });
        });
        tdCheck.appendChild(checkBox);
        const tdName = document.createElement('td');
        tdName.textContent = target.product.productName;
        const tdSellingPrice = document.createElement('td');
        tdSellingPrice.textContent = `${target.product.sellingPrice}円`;
        const tdPurchasePrice = document.createElement('td');
        tdPurchasePrice.textContent = `${target.product.purchasePrice}円`;
        const tdPurchaseDate = document.createElement('td');
        tdPurchaseDate.textContent = target.product.purchaseDate;
        const tdSalesDate = document.createElement('td');
        tdSalesDate.textContent = target.saleDate;
        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = `${target.saleQuantity}個`;
        const tdEarnings = document.createElement('td');
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
        tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
    });
}
// 仕入処理ボタンの処理
purchasingBtn.addEventListener('click', () => {
    window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    window.location.href = 'Purchasing.html';
});
// 販売処理ボタンの処理
saleBtn.addEventListener('click', () => {
    window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    window.location.href = 'Sale.html';
});
// 在庫一覧ボタンの処理
stockListBtn.addEventListener('click', () => {
    window.localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    window.open('StockList.html', '_blank');
});
// tbody内の削除
function deleteTbodyChildren() {
    while (tbody === null || tbody === void 0 ? void 0 : tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}
//# sourceMappingURL=main.js.map