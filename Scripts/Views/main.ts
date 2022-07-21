const purchasingBtn = document.getElementById('purchasing') as HTMLButtonElement;
const saleBtn = document.getElementById('sale') as HTMLButtonElement;
const stockListBtn = document.getElementById('stockList') as HTMLButtonElement;

purchasingBtn.addEventListener('click', () => {
  window.location.href = 'Purchasing.html';
});

saleBtn.addEventListener('click', () => {
  window.location.href = 'Sale.html';
});

stockListBtn.addEventListener('click', () => {
  window.open('StockList.html', '_blank');
});


