export default function getCustomerLevel(level) {
  switch (level) {
    case 1:
      return 'đồng';
    case 2:
      return 'bạc';
    case 3:
      return 'vàng';
    default:
      return null;
  }
}
