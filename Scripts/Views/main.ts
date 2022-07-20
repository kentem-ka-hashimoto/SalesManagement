const purchasingBtn = document.getElementById('purchasing') as HTMLButtonElement;
const saleBtn = document.getElementById('sale') as HTMLButtonElement;


purchasingBtn.addEventListener('click', () => {
  window.location.href = 'purchasing.html';
});

saleBtn.addEventListener('click', () => {
  window.location.href = 'sale.html';
});
