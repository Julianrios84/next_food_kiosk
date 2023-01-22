export const formatterMoney = (quantity) => {
  return quantity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};