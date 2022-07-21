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
Global.getSalesStatusFromLocalStorage();
// チェックボックスの取得
let checks;
window.onload = function () {
    createSalesStatusList();
    checks = document.getElementsByName('check');
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