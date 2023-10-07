export default function formatCurrency(amount) {
  const formattedAmount = amount.toLocaleString('vi-VN');
  return `${formattedAmount} VNĐ`;
}
