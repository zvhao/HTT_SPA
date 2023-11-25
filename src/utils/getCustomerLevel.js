export default function getCustomerLevel(level) {
  switch (level) {
    case 1:
      return 'đồng';
    case 2:
      return 'bạc';
    case 3:
      return 'vàng';
    case 4:
      return 'kim cương';
    default:
      return null;
  }
}
