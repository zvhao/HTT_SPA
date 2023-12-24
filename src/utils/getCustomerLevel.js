export default function getCustomerLevel(level) {
  switch (level) {
    case 1:
      return { color: "#0000FF", lv: "đồng" };
    case 2:
      return { color: "#C0C0C0", lv: "bạc" };
    case 3:
      return { color: "#FFD700", lv: "vàng" };
    case 4:
      return { color: "#00FF00", lv: "kim cương" };
    default:
      return null;
  }
}
