import { Global } from '../Models/global.js';
import { SalesManager } from '../Models/salesManager.js';
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
checks = document.getElementsByName('check');
// 表示用のsalesマネージャー配列
let salesMgr = new SalesManager();
// 今日の日付を取得
const date = new Date();
const today = date.getFullYear() + '-' + `${('00' + (date.getMonth() + 1)).slice(-2)}` + '-' + `${('00' + date.getDate()).slice(-2)}`;
// 画面ロード時の処理
window.onload = function () {
    // salesマネージャー
    Global.getSalesStatusFromLocalStorage();
    createSalesStatusList(Global.saleManager.salesArr);
    updateTotalSalesAndTotalProfit(Global.saleManager);
    checkDisabledBtn();
    lifttBtn.disabled = true;
};
// 絞込みボタンの処理(チェック状態でないものは配列から削除する)
narrowingBtn.addEventListener('click', () => {
    if (salesMgr.salesArr.length !== 0) {
        for (let i = salesMgr.salesArr.length - 1; i >= 0; i--) {
            if (!salesMgr.salesArr[i].selected) {
                salesMgr.salesArr.splice(i, 1);
            }
        }
    }
    else {
        Global.saleManager.salesArr.forEach((target) => {
            if (target.selected) {
                salesMgr.salesArr.push(target);
            }
        });
    }
    displayUpdate();
});
// 今日の販売ボタンの処理(今日でないものは配列から削除する)
todaySaleBtn.addEventListener('click', () => {
    if (salesMgr.salesArr.length !== 0) {
        for (let i = salesMgr.salesArr.length - 1; i >= 0; i--) {
            if (salesMgr.salesArr[i].saleDate !== today) {
                salesMgr.salesArr.splice(i, 1);
            }
        }
    }
    else {
        Global.saleManager.salesArr.forEach((target) => {
            if (target.saleDate === today) {
                salesMgr.salesArr.push(target);
            }
        });
    }
    displayUpdate();
});
// 解除ボタンの処理
lifttBtn.addEventListener('click', () => {
    localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    salesMgr.salesArr.length = 0;
    createSalesStatusList(Global.saleManager.salesArr);
    updateTotalSalesAndTotalProfit(Global.saleManager);
    lifttBtn.disabled = true;
});
// 仕入処理ボタンの処理
purchasingBtn.addEventListener('click', () => {
    localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    window.location.href = 'Purchasing.html';
});
// 販売処理ボタンの処理
saleBtn.addEventListener('click', () => {
    localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    window.location.href = 'Sale.html';
});
// 在庫一覧ボタンの処理
stockListBtn.addEventListener('click', () => {
    localStorage.setItem('sale', JSON.stringify(Global.saleManager.salesArr));
    window.open('StockList.html', '_blank');
});
// リストの作成
function createSalesStatusList(salesArr) {
    deleteTbodyChildren();
    salesArr.forEach((target) => {
        const tr = document.createElement('tr');
        const tdCheck = document.createElement('td');
        tdCheck.classList.add('check');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.name = 'check';
        checkBox.checked = target.selected;
        // オブジェクトのselectedの更新
        checkBox.addEventListener('change', () => {
            checks.forEach((check) => {
                target.selected = check.checked;
            });
            checkDisabledBtn();
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
// tbody内の削除
function deleteTbodyChildren() {
    while (tbody === null || tbody === void 0 ? void 0 : tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}
// 金額表示
function updateTotalSalesAndTotalProfit(salesMgr) {
    totalSales.textContent = `売上合計金額 : ${salesMgr.getTotalSales().toLocaleString()}円`;
    totalProfit.textContent = `利益合計金額 : ${salesMgr.getTotalProfit().toLocaleString()}円`;
}
// salesManagerのチェック状態の保持の更新
function updateCheckStatus() {
    for (let i = 0; i < Global.saleManager.salesArr.length; i++) {
        for (let j = 0; j < salesMgr.salesArr.length; j++) {
            if (Global.saleManager.salesArr[i].id === salesMgr.salesArr[j].id) {
                Global.saleManager.salesArr[i].selected = salesMgr.salesArr[j].selected;
            }
        }
    }
}
// ボタンの有効無効
function checkDisabledBtn() {
    let checkCount = 0;
    checks.forEach((check) => {
        if (check.checked)
            checkCount++;
        narrowingBtn.disabled = checkCount === 0;
    });
}
// 絞込み、今日の販売ボタンを押した際の画面更新部分の処理
function displayUpdate() {
    updateCheckStatus();
    createSalesStatusList(salesMgr.salesArr);
    updateTotalSalesAndTotalProfit(salesMgr);
    lifttBtn.disabled = false;
}
//# sourceMappingURL=main.js.map