"use strict";
const purchasingBtn = document.getElementById('purchasing');
const saleBtn = document.getElementById('sale');
const stockListBtn = document.getElementById('stockList');
purchasingBtn.addEventListener('click', () => {
    window.location.href = 'Purchasing.html';
});
saleBtn.addEventListener('click', () => {
    window.location.href = 'Sale.html';
});
stockListBtn.addEventListener('click', () => {
    window.open('StockList.html', '_blank');
});
console.log(localStorage.getItem('stock'));
//# sourceMappingURL=main.js.map