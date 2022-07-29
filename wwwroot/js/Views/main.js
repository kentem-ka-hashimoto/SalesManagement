import { Global } from '../Models/global.js';
// tbodyの取得
const tbody = document.querySelector('tbody');
// 仕入処理ボタンの取得
const purchasingBtn = document.getElementById('purchasing');
// 販売処理ボタンの取得
const saleBtn = document.getElementById('sale');
// 在庫一覧ボタンの取得
const stockListBtn = document.getElementById('stockList');
// 在庫一覧ボタンの取得
const registerBtn = document.getElementById('register');
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
// mapを用意
let map = new Map();
// 表示用
let salesArr = [];
// 今日の日付を取得(販売日の入力部分がtype=dateのため文字列の状態に)
const date = new Date();
const today = date.getFullYear() + '-' + `${('00' + (date.getMonth() + 1)).slice(-2)}` + '-' + `${('00' + date.getDate()).slice(-2)}`;
// 画面ロード時の処理
window.onload = function () {
    Global.getSalesStatusFromLocalStorage();
    // Global.getProductManagerFromLocalStorage();
    // salesArr = Global.saleManager.sortAscendingOrder(Global.saleManager.salesArr);
    // salesArr = Global.saleManager.separateByProduct(salesArr, Global.productManager.productArr);
    salesArr = Global.saleManager.salesArr.concat();
    const items = localStorage.getItem('map');
    if (items) {
        map = new Map(JSON.parse(items));
    }
    createSalesStatusList();
    updateTotalSalesAndTotalProfit();
    checkDisabledBtn();
    lifttBtn.disabled = true;
};
// 絞込みボタンの処理
narrowingBtn.addEventListener('click', () => {
    salesArr = salesArr.filter((sale) => map.get(`${sale.id}`));
    // salesArr = Global.saleManager.sortAscendingOrder(salesArr);
    // salesArr = Global.saleManager.separateByProduct(salesArr, Global.productManager.productArr);
    displayUpdate();
});
// 今日の販売ボタンの処理
todaySaleBtn.addEventListener('click', () => {
    salesArr = salesArr.filter((sale) => sale.convertDateToString() === today);
    // salesArr = Global.saleManager.sortAscendingOrder(salesArr);
    // salesArr = Global.saleManager.separateByProduct(salesArr, Global.productManager.productArr);
    displayUpdate();
});
// 解除ボタンの処理
lifttBtn.addEventListener('click', () => {
    setCheckStatusToLocalStorage();
    Global.saleManager.clearArr(salesArr);
    // salesArr = Global.saleManager.sortAscendingOrder(Global.saleManager.salesArr);
    // salesArr = Global.saleManager.separateByProduct(salesArr, Global.productManager.productArr);
    salesArr = Global.saleManager.salesArr.concat();
    createSalesStatusList();
    updateTotalSalesAndTotalProfit();
    lifttBtn.disabled = true;
});
// 仕入処理ボタンの処理
purchasingBtn.addEventListener('click', () => {
    transitionPage('Purchasing.html');
});
// 販売処理ボタンの処理
saleBtn.addEventListener('click', () => {
    transitionPage('Sale.html');
});
// 在庫一覧ボタンの処理
stockListBtn.addEventListener('click', () => {
    setCheckStatusToLocalStorage();
    window.open('StockList.html', '_blank');
});
// 商品登録ボタンの処理
registerBtn.addEventListener('click', () => {
    transitionPage('register.html');
});
// リストの作成
function createSalesStatusList() {
    deleteTbodyChildren();
    salesArr.forEach((item) => {
        const tr = document.createElement('tr');
        const tdCheck = document.createElement('td');
        tdCheck.classList.add('check');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.name = 'check';
        const target = map.get(`${item.id}`);
        checkBox.checked = target === undefined ? false : target;
        // チェック状態の更新
        checkBox.addEventListener('change', () => {
            //表示されているi番目の要素のidを見て、チェック状態を上書きする
            checks.forEach((check, index) => {
                map.set(`${salesArr[index].id}`, check.checked);
            });
            checkDisabledBtn();
        });
        tdCheck.appendChild(checkBox);
        const tdName = document.createElement('td');
        tdName.textContent = item.purchasing.product.name;
        const tdSellingPrice = document.createElement('td');
        tdSellingPrice.textContent = `${item.purchasing.sellingPrice.toLocaleString()}円`;
        const tdPurchasePrice = document.createElement('td');
        tdPurchasePrice.textContent = `${item.purchasing.purchasePrice.toLocaleString()}円`;
        const tdPurchaseDate = document.createElement('td');
        tdPurchaseDate.textContent = item.purchasing.convertDateToString();
        const tdSalesDate = document.createElement('td');
        tdSalesDate.textContent = item.convertDateToString();
        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = `${item.saleQuantity.toLocaleString()}個`;
        const tdEarnings = document.createElement('td');
        tdEarnings.textContent = `${(item.purchasing.sellingPrice * item.saleQuantity).toLocaleString()}円`;
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
    // 表示されたSales配列と同じlengthになる
    checks = document.getElementsByName('check');
}
// tbody内の削除
function deleteTbodyChildren() {
    while (tbody === null || tbody === void 0 ? void 0 : tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}
// 金額表示
function updateTotalSalesAndTotalProfit() {
    totalSales.textContent = `売上合計金額 : ${Global.saleManager.getTotalSales(salesArr).toLocaleString()}円`;
    totalProfit.textContent = `利益合計金額 : ${Global.saleManager.getTotalProfit(salesArr).toLocaleString()}円`;
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
    createSalesStatusList();
    updateTotalSalesAndTotalProfit();
    lifttBtn.disabled = false;
}
// チェック状態の保存
function setCheckStatusToLocalStorage() {
    let items = Array.from(map.entries());
    localStorage.setItem('map', JSON.stringify(items));
}
// ページ遷移
function transitionPage(link) {
    setCheckStatusToLocalStorage();
    window.location.href = link;
}
//# sourceMappingURL=main.js.map