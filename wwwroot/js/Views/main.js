"use strict";
const purchasingBtn = document.getElementById('purchasing');
const saleBtn = document.getElementById('sale');
const stockListBtn = document.getElementById('stockList');
purchasingBtn.addEventListener('click', () => {
    window.location.href = 'purchasing.html';
});
saleBtn.addEventListener('click', () => {
    window.location.href = 'sale.html';
});
stockListBtn.addEventListener('click', () => {
    window.open('stockList.html', '_blank');
});
//# sourceMappingURL=main.js.map