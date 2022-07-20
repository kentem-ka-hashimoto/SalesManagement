const purchasingBtn = document.getElementById('purchasing') as HTMLButtonElement;
const saleBtn = document.getElementById('sale') as HTMLButtonElement;
const stockListBtn = document.getElementById('stockList') as HTMLButtonElement;

purchasingBtn.addEventListener('click', () => {
  window.location.href = 'purchasing.html';
});

saleBtn.addEventListener('click', () => {
  window.location.href = 'sale.html';
});

stockListBtn.addEventListener('click', () => {
  window.open('stockList.html', '_blank');
});
